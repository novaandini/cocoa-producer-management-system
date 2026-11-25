
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

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

  if (!Array.isArray(parsed)) {
    throw new Error('Format data akun simulasi tidak sesuai.')
  }

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
    username: '',
    name: '',
    email: '',
    phone_number: ''
  }

  Object.assign(form, original)
  message.value = ''

  if (!isEditMode.value || existingAccount.value) {
    error.value = ''
  }
}

function nextAccountId(accounts) {
  const max = accounts.reduce((acc, account) => {
    const match = /^A(\d+)$/.exec(String(account.id ?? ''))

    return match
      ? Math.max(acc, Number(match[1]))
      : acc
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

    if (duplicated) {
      throw new Error('Username atau email sudah digunakan oleh akun lain.')
    }

    if (isEditMode.value) {
      const index = accounts.findIndex(a => String(a.id) === accountId)

      if (index === -1) {
        throw new Error('Akun tidak ditemukan. Mungkin sudah dihapus.')
      }

      accounts[index] = {
        ...accounts[index],
        username,
        name,
        email,
        phone_number
      }
    } else {
      accounts.push({
        id: nextAccountId(accounts),
        username,
        name,
        email,
        phone_number,
        status: 'active'
      })
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))

    window.location.href = '/admin/customers'
  } catch (err) {
    error.value = err instanceof Error
      ? err.message
      : 'Data gagal disimpan.'
  } finally {
    saving.value = false
  }
}

function belumTersedia(nama) {
  window.alert(`Halaman Admin ${nama} belum dipindahkan ke Vue.js.`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">

    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#174C35] text-white">
      <div class="border-b border-white/10 px-6 py-6">
        <a href="/" class="text-2xl font-bold tracking-wide">
          KAKAO
        </a>

        <p class="mt-2 text-xs leading-5 tracking-wider text-white/70">
          SISTEM INFORMASI<br />
          PRODUSEN KAKAO
        </p>
      </div>

      <nav class="flex-1 space-y-1 px-4 py-6" aria-label="Navigasi Admin">
        <a
          href="/admin/dashboard"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Dashboard
        </a>

        <a
          href="/admin/customers"
          class="block rounded-lg bg-white/15 px-4 py-3 text-sm font-semibold text-white"
          aria-current="page"
        >
          Pelanggan
        </a>

        <a
          href="/admin/products"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Produk
        </a>

        <a
          href="/admin/orders"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Pesanan
        </a>

        <a
          href="/admin/payments"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Pembayaran
        </a>

        <a
          href="/admin/shipping"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Pengiriman
        </a>
      </nav>

      <div class="border-t border-white/10 px-6 py-4 text-xs text-white/50">
        © 2026 KAKAO
      </div>
    </aside>

    <!-- Topbar -->
    <header class="ml-64 flex min-h-[88px] items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        <p class="text-xs font-semibold tracking-widest text-gray-400">
          ADMIN AREA
        </p>

        <h1 class="mt-1 text-xl font-bold text-gray-800">
          {{ isEditMode ? 'Edit Akun' : 'Form' }}
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#174C35] text-sm font-bold text-white">
          A
        </div>

        <div>
          <p class="text-sm font-semibold text-gray-800">
            Admin KAKAO
          </p>

          <p class="text-xs text-gray-500">
            Administrator
          </p>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="ml-64 px-8 py-8">
      <section class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

        <!-- Form heading -->
        <div class="flex flex-col justify-between gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h2 class="text-lg font-bold text-gray-800">
              {{ title }}
            </h2>

            <div class="mt-2 flex items-center gap-2 text-sm text-gray-400">
              <span>Admin</span>
              <span>›</span>
              <span class="font-medium text-[#174C35]">Akun</span>
            </div>
          </div>

          <a
            href="/admin/customers"
            class="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[#174C35]"
          >
            ← Kembali ke Daftar
          </a>
        </div>

        <div class="p-6">

          <!-- Demo information -->
          <div class="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <p class="text-sm leading-6 text-amber-800">
              Mode demo frontend: perubahan hanya tersimpan di browser ini, bukan di Laravel.
            </p>
          </div>

          <!-- Error message -->
          <div
            v-if="error"
            class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            role="alert"
          >
            {{ error }}
          </div>

          <!-- Success message -->
          <div
            v-if="message"
            class="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700"
            role="status"
          >
            {{ message }}
          </div>

          <!-- Form -->
          <form
            id="customerForm"
            class="space-y-6"
            @submit.prevent="saveAccount"
            @reset.prevent="resetForm"
          >

            <!-- Username -->
            <div>
              <label
                for="username"
                class="mb-2 block text-sm font-semibold text-gray-700"
              >
                Username
                <span class="text-red-500">*</span>
              </label>

              <input
                id="username"
                v-model.trim="form.username"
                type="text"
                name="username"
                autocomplete="off"
                required
                placeholder="Masukkan username"
                class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#174C35] focus:ring-2 focus:ring-[#174C35]/10"
              />
            </div>

            <!-- Nama lengkap -->
            <div>
              <label
                for="name"
                class="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nama Lengkap
                <span class="text-red-500">*</span>
              </label>

              <input
                id="name"
                v-model.trim="form.name"
                type="text"
                name="name"
                autocomplete="name"
                required
                placeholder="Masukkan nama lengkap"
                class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#174C35] focus:ring-2 focus:ring-[#174C35]/10"
              />
            </div>

            <!-- Email -->
            <div>
              <label
                for="email"
                class="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email
                <span class="text-red-500">*</span>
              </label>

              <input
                id="email"
                v-model.trim="form.email"
                type="email"
                name="email"
                autocomplete="email"
                required
                placeholder="contoh@email.com"
                class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#174C35] focus:ring-2 focus:ring-[#174C35]/10"
              />
            </div>

            <!-- Nomor telepon -->
            <div>
              <label
                for="phone_number"
                class="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nomor Telepon
                <span class="text-red-500">*</span>
              </label>

              <input
                id="phone_number"
                v-model.trim="form.phone_number"
                type="tel"
                name="phone_number"
                autocomplete="tel"
                required
                placeholder="Masukkan nomor telepon"
                class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#174C35] focus:ring-2 focus:ring-[#174C35]/10"
              />
            </div>

            <!-- Buttons -->
            <div class="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="reset"
                class="inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Reset
              </button>

              <button
                type="submit"
                :disabled="saving || (isEditMode && !existingAccount)"
                class="inline-flex items-center justify-center rounded-lg bg-[#174C35] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#103b29] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {{ saving ? 'Menyimpan...' : 'Submit' }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="ml-64 flex flex-col gap-2 border-t border-gray-200 bg-white px-8 py-5 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>
  </div>
</template>
