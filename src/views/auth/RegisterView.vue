<script setup>
import { ref } from 'vue'

// Saat migrasi frontend, API sengaja dinonaktifkan.
// Ubah menjadi true setelah backend Laravel siap digunakan.
const BACKEND_ENABLED = false
const REGISTER_API_URL = 'http://127.0.0.1:8000/api/auth/register'

const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const messageType = ref('')
const isSubmitting = ref(false)

function showMessage(text, type = '') {
  message.value = text
  messageType.value = type
}

async function submitRegister() {
  if (isSubmitting.value) return

  if (newPassword.value !== confirmPassword.value) {
    showMessage('Konfirmasi password tidak sama.', 'error')
    return
  }

  const payload = {
    name: fullName.value.trim(),
    email: email.value.trim(),
    phone_number: phoneNumber.value.trim(),
    password: newPassword.value,
    password_confirmation: confirmPassword.value
  }

  // Mode frontend: tampilkan hasil validasi tanpa membuat akun palsu.
  if (!BACKEND_ENABLED) {
    showMessage(
      'Formulir sudah valid. Pendaftaran akun belum diaktifkan karena backend Laravel belum terhubung.',
      'info'
    )
    return
  }

  isSubmitting.value = true
  showMessage('Mendaftarkan akun...')

  try {
    const response = await fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const validationErrors = data.errors
        ? Object.values(data.errors).flat().join(' ')
        : ''
      throw new Error(validationErrors || data.message || 'Pendaftaran gagal.')
    }

    // Setelah akun benar-benar dibuat, pengguna login melalui halaman Vue.
    // Jangan menyimpan token di sini jika alurnya mengharuskan login ulang.
    window.location.href = '/login?registered=1'
  } catch (error) {
    showMessage(error.message || 'Terjadi kesalahan saat mendaftar.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <!-- BAGIAN KIRI -->
    <section class="login-left">
      <div class="login-brand">
        <a href="/">KAKAO</a>
        <p>
          SISTEM INFORMASI<br />
          PRODUSEN KAKAO
        </p>
      </div>

      <div class="login-info">
        <p class="section-label">SISTEM INFORMASI PRODUSEN KAKAO</p>
        <h1>
          Kelola kakao
          <span>lebih terstruktur.</span>
        </h1>
        <p>
          Platform untuk melakukan pemesanan,
          memantau pesanan, dan mengelola
          operasional produsen kakao.
        </p>
      </div>
    </section>

    <!-- BAGIAN KANAN -->
    <section class="login-right">
      <div class="login-box">
        <div id="signupView">
          <div class="login-heading">
            <p class="section-label">BERGABUNG BERSAMA KAKAO</p>
            <h2>Buat Akun</h2>
            <p>Daftarkan akun pelanggan kamu.</p>
          </div>

          <form id="signupForm" @submit.prevent="submitRegister">
            <div class="form-group">
              <label for="fullName">Nama lengkap</label>
              <input
                id="fullName"
                v-model="fullName"
                type="text"
                name="fullName"
                placeholder="Masukkan nama lengkap"
                autocomplete="name"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                placeholder="nama@email.com"
                autocomplete="email"
                required
              />
            </div>

            <div class="form-group">
              <label for="phoneNumber">Nomor telepon</label>
              <input
                id="phoneNumber"
                v-model="phoneNumber"
                type="tel"
                name="phone_number"
                placeholder="081234567899"
                autocomplete="tel"
                required
              />
            </div>

            <div class="form-group">
              <label for="newPassword">Password</label>
              <input
                id="newPassword"
                v-model="newPassword"
                type="password"
                name="newPassword"
                placeholder="Buat password (min. 8 karakter)"
                autocomplete="new-password"
                minlength="8"
                required
              />
            </div>

            <div class="form-group">
              <label for="confirmPassword">Konfirmasi password</label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Ulangi password"
                autocomplete="new-password"
                minlength="8"
                required
              />
            </div>

            <button type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Mendaftarkan akun...' : 'Daftar' }}
            </button>

            <p
              id="signupMessage"
              class="form-message"
              :class="messageType"
              role="status"
              aria-live="polite"
            >{{ message }}</p>
          </form>

          <div class="signup-link">
            <p>
              Sudah punya akun?
              <a id="showLogin" href="/login">Login</a>
            </p>
          </div>
        </div>

        <div class="back-home">
          <a href="/">← Kembali ke halaman utama</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped src="./RegisterView.css"></style>
