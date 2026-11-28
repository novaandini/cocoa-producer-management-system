<script setup>
import { onMounted, ref } from 'vue'

// API Login Laravel yang sama seperti pada script.js sebelumnya.
// Jika alamat server berubah, atur VITE_LOGIN_API_URL di file .env project Vue.
const LOGIN_API_URL = import.meta.env.VITE_LOGIN_API_URL || 'http://127.0.0.1:8000/api/auth/login'

const email = ref('')
const password = ref('')
const remember = ref(false)
const isSubmitting = ref(false)
const message = ref('')
const messageType = ref('')

onMounted(() => {
  const savedEmail = localStorage.getItem('kakao_remember_email')
  if (savedEmail) {
    email.value = savedEmail
    remember.value = true
  }

  if (new URLSearchParams(window.location.search).get('registered') === '1') {
    message.value = 'Silakan login dengan akun kamu.'
    messageType.value = 'success'
  }
})

function forgotPassword() {
  message.value = 'Fitur lupa password belum tersedia.'
  messageType.value = ''
}

// Mendukung format role berupa string atau objek, misalnya "CUSTOMER"
// maupun { name: "customer" }. Nama field disesuaikan dengan API asli.
function getUserRole(user, responseData) {
  const rawRole = user?.role ?? user?.user_role ?? responseData?.role
  const roleValue = typeof rawRole === 'object' && rawRole !== null
    ? (rawRole.name ?? rawRole.slug ?? rawRole.code)
    : rawRole

  const normalizedRole = String(roleValue ?? '').trim().toUpperCase()
  if (normalizedRole === 'CUSTOMER' || normalizedRole === 'PELANGGAN') return 'CUSTOMER'
  if (normalizedRole === 'ADMIN' || normalizedRole === 'ADMINISTRATOR') return 'ADMIN'
  return ''
}

async function submitLogin() {
  if (isSubmitting.value) return

  isSubmitting.value = true
  message.value = ''
  messageType.value = ''

  try {
    const response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value
      })
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      message.value = data.message || 'Email atau password salah. Silakan coba lagi.'
      messageType.value = 'error'
      return
    }

    // Format yang dipakai kode Login lama: { token, user }.
    // Dua alternatif di bawah mendukung sebagian struktur API Laravel lainnya.
    const token = data.token ?? data.access_token ?? data.data?.token
    const user = data.user ?? data.data?.user
    const role = getUserRole(user, data)

    if (!token || !user) {
      message.value = 'Login berhasil, tetapi data token atau user tidak lengkap dari API.'
      messageType.value = 'error'
      return
    }

    if (!role) {
      message.value = 'Login berhasil, tetapi role akun belum dikenali. Periksa field user.role pada respons API Laravel.'
      messageType.value = 'error'
      return
    }

    // Pertahankan format auth_token/auth_user agar kompatibel dengan kode lama.
    // userRole dipakai untuk alur halaman Vue (bukan pengamanan backend).
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))
    localStorage.setItem('userRole', role)

    // Fitur "Ingat saya" saat ini hanya mengingat alamat email,
    // bukan password. Pengaturan masa berlaku sesi ada di backend.
    if (remember.value) {
      localStorage.setItem('kakao_remember_email', email.value.trim())
    } else {
      localStorage.removeItem('kakao_remember_email')
    }

    if (role === 'CUSTOMER') {
      const requestedPage = sessionStorage.getItem('redirectAfterLogin')
      sessionStorage.removeItem('redirectAfterLogin')
      window.location.href = requestedPage === 'checkout' ? '/checkout' : '/'
      return
    }

    // Admin tetap menuju dashboard HTML lama sampai dashboard dikonversi.
    sessionStorage.removeItem('redirectAfterLogin')
    window.location.href = '/admin/dashboard/index.html'
  } catch (error) {
    console.error('Error during login:', error)
    message.value = 'Tidak dapat terhubung ke server login. Pastikan API Laravel berjalan dan CORS diizinkan.'
    messageType.value = 'error'
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
        <p>SISTEM INFORMASI<br>PRODUSEN KAKAO</p>
      </div>

      <div class="login-info">
        <p class="section-label">SISTEM INFORMASI PRODUSEN KAKAO</p>
        <h1>Kelola kakao <span>lebih terstruktur.</span></h1>
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
        <div id="loginView">
          <div class="login-heading">
            <p class="section-label">SELAMAT DATANG</p>
            <h2>Login</h2>
            <p>Masukkan akun untuk melanjutkan.</p>
          </div>

          <form id="loginForm" @submit.prevent="submitLogin">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model.trim="email"
                type="email"
                name="email"
                placeholder="Masukkan email"
                autocomplete="email"
                required
              >
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                placeholder="Masukkan password"
                autocomplete="current-password"
                required
              >
            </div>

            <div class="form-option">
              <label class="remember-option">
                <input v-model="remember" type="checkbox" name="remember">
                Ingat saya
              </label>
              <a href="#" id="forgotPassword" @click.prevent="forgotPassword">Lupa password?</a>
            </div>

            <button type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sedang masuk...' : 'Masuk' }}
            </button>

            <p
              v-if="message"
              id="message"
              class="form-message"
              :class="messageType"
              role="status"
              aria-live="polite"
            >{{ message }}</p>
          </form>

          <div class="signup-link">
            <p>
              Belum punya akun?
              <!-- Register belum dikonversi ke Vue: sementara HTML lama. -->
              <a href="/register">Daftar sekarang</a>
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

<style scoped src="./LoginView.css"></style>
