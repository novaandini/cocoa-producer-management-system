<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

// Demo frontend: gunakan key yang sama dengan AdminCustomersView.vue.
const STORAGE_KEY = 'kakao_demo_accounts'
const params = new URLSearchParams(window.location.search)
const accountId = params.get('id')
const isEditMode = computed(() => Boolean(accountId))
const title = computed(() => isEditMode.value ? 'Edit Akun' : 'Tambah Akun')

const form = reactive({
  username: '',
  name: '',
  email: '',
  phone_number: ''
})
const initialForm = ref(null)
const existingAccount = ref(null)
const message = ref('')
const error = ref('')
const saving = ref(false)

function getAccounts() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) return []
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error('Format data akun simulasi tidak sesuai.')
  return parsed
}

onMounted(() => {
  if (!isEditMode.value) return
  try {
    const account = getAccounts().find(a => String(a.id) === accountId)
    if (!account) {
      error.value = 'Akun yang ingin diedit tidak ditemukan. Kembali ke daftar akun.'
      return
    }
    existingAccount.value = account
    form.username = account.username ?? ''
    form.name = account.name ?? ''
    form.email = account.email ?? ''
    form.phone_number = account.phone_number ?? ''
    initialForm.value = { ...form }
  } catch (_) {
    error.value = 'Gagal membaca data akun dari penyimpanan browser.'
  }
})

function resetForm() {
  const original = initialForm.value ?? {
    username: '', name: '', email: '', phone_number: ''
  }
  Object.assign(form, original)
  message.value = ''
  if (!isEditMode.value || existingAccount.value) error.value = ''
}

function nextAccountId(accounts) {
  // Menghindari ID duplikat, termasuk ketika data demo pernah dihapus.
  const max = accounts.reduce((acc, account) => {
    const match = /^A(\d+)$/.exec(String(account.id ?? ''))
    return match ? Math.max(acc, Number(match[1])) : acc
  }, 0)
  return `A${String(max + 1).padStart(3, '0')}`
}

function saveAccount() {
  if (saving.value) return
  error.value = ''
  message.value = ''

  const username = form.username.trim()
  const name = form.name.trim()
  const email = form.email.trim().toLowerCase()
  const phone_number = form.phone_number.trim()
  if (!username || !name || !email || !phone_number) {
    error.value = 'Semua kolom harus diisi.'
    return
  }
  if (isEditMode.value && !existingAccount.value) {
    error.value = 'Akun yang ingin diedit tidak ditemukan.'
    return
  }

  saving.value = true
  try {
    const accounts = getAccounts()
    const duplicated = accounts.find(account =>
      String(account.id) !== accountId && (
        String(account.username ?? '').toLowerCase() === username.toLowerCase() ||
        String(account.email ?? '').toLowerCase() === email
      )
    )
    if (duplicated) throw new Error('Username atau email sudah digunakan oleh akun lain.')

    if (isEditMode.value) {
      const index = accounts.findIndex(a => String(a.id) === accountId)
      if (index === -1) throw new Error('Akun tidak ditemukan. Mungkin sudah dihapus.')
      accounts[index] = { ...accounts[index], username, name, email, phone_number }
    } else {
      accounts.push({
        id: nextAccountId(accounts), username, name, email, phone_number,
        status: 'active'
      })
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
    // Tetap di frontend; daftar akan membaca data yang sama dari browser.
    window.location.href = '/admin/customers'
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Data gagal disimpan.'
  } finally {
    saving.value = false
  }
}

function belumTersedia(nama) {
  window.alert(`Halaman Admin ${nama} belum dipindahkan ke Vue.js.`)
}
</script>

<template>
  <div class="admin-customer-form-page">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <a href="/">KAKAO</a>
        <p>SISTEM INFORMASI<br />PRODUSEN KAKAO</p>
      </div>
      <nav class="sidebar-menu" aria-label="Navigasi Admin">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/customers" class="active" aria-current="page">Pelanggan</a>
        <a href="/admin/products">Produk</a>
        <a href="/admin/orders">Pesanan</a>
        <a href="/admin/payments">Pembayaran</a>
        <a href="/admin/shipping">Pengiriman</a>
      </nav>
    </aside>

    <header class="topbar">
      <div>
        <p class="topbar-label">ADMIN AREA</p>
        <h1>{{ isEditMode ? 'Edit Akun' : 'Form' }}</h1>
      </div>
      <div class="admin-info">
        <strong>Admin KAKAO</strong>
        <span>Administrator</span>
      </div>
    </header>

    <main class="main-content">
      <section class="form-card">
        <div class="page-heading">
          <div>
            <h2>{{ title }}</h2>
            <div class="breadcrumb"><span>Admin</span><span>›</span><strong>Akun</strong></div>
          </div>
          <a href="/admin/customers" class="back-link">← Kembali ke Daftar</a>
        </div>

        <p class="demo-note">Mode demo frontend: perubahan hanya tersimpan di browser ini, bukan di Laravel.</p>
        <p v-if="error" class="form-message error" role="alert">{{ error }}</p>
        <p v-if="message" class="form-message success" role="status">{{ message }}</p>

        <form id="customerForm" class="form" @submit.prevent="saveAccount" @reset.prevent="resetForm">
          <div class="input-text">
            <label for="username">Username</label>
            <input id="username" v-model.trim="form.username" type="text" name="username" autocomplete="off" required />
          </div>
          <div class="input-text">
            <label for="name">Nama Lengkap</label>
            <input id="name" v-model.trim="form.name" type="text" name="name" autocomplete="name" required />
          </div>
          <div class="input-text">
            <label for="email">Email</label>
            <input id="email" v-model.trim="form.email" type="email" name="email" autocomplete="email" required />
          </div>
          <div class="input-text">
            <label for="phone_number">Nomor Telepon</label>
            <input id="phone_number" v-model.trim="form.phone_number" type="tel" name="phone_number" autocomplete="tel" required />
          </div>
          <div class="form-buttons">
            <button type="submit" :disabled="saving || (isEditMode && !existingAccount)">
              {{ saving ? 'Menyimpan...' : 'Submit' }}
            </button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </section>
    </main>

    <footer class="footer">
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>
  </div>
</template>

<style scoped src="./AdminCustomerFormView.css"></style>
