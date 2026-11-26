<script setup>
import { onMounted, ref } from 'vue'

const LOGIN_API_URL = import.meta.env.VITE_LOGIN_API_URL || 'http://127.0.0.1:8000/api/auth/login'
// Diisi setelah backend menyediakan endpoint yang memulai OAuth Google.
const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL || ''

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
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
    message.value = 'Silakan masuk dengan akun Anda.'
    messageType.value = 'success'
  }
})

function forgotPassword() {
  message.value = 'Fitur lupa kata sandi belum tersedia.'
  messageType.value = 'info'
}

function loginWithGoogle() {
  if (isSubmitting.value) return
  if (!GOOGLE_AUTH_URL) {
    message.value = 'Masuk dengan Google belum tersedia. Silakan masuk menggunakan email dan kata sandi.'
    messageType.value = 'info'
    return
  }
  // Backend bertanggung jawab atas state OAuth, callback, sesi dan verifikasi akun.
  window.location.assign(GOOGLE_AUTH_URL)
}

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
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email: email.value.trim(), password: password.value }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      message.value = data.message || 'Email atau kata sandi salah. Silakan coba lagi.'
      messageType.value = 'error'
      return
    }

    const token = data.token ?? data.access_token ?? data.data?.token
    const user = data.user ?? data.data?.user
    const role = getUserRole(user, data)
    if (!token || !user) {
      message.value = 'Login berhasil, tetapi data token atau user tidak lengkap dari API.'
      messageType.value = 'error'
      return
    }
    if (!role) {
      message.value = 'Role akun belum dikenali. Periksa respons API Laravel.'
      messageType.value = 'error'
      return
    }

    // Format penyimpanan lama dipertahankan; otorisasi wajib diverifikasi backend.
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))
    localStorage.setItem('userRole', role)
    // Ingat Saya hanya menyimpan email, tidak menyimpan kata sandi.
    if (remember.value) localStorage.setItem('kakao_remember_email', email.value.trim())
    else localStorage.removeItem('kakao_remember_email')

    const requestedPage = sessionStorage.getItem('redirectAfterLogin')
    sessionStorage.removeItem('redirectAfterLogin')
    if (role === 'CUSTOMER') {
      const destinations = { checkout: '/checkout', cart: '/cart' }
      window.location.href = Object.hasOwn(destinations, requestedPage) ? destinations[requestedPage] : '/'
      return
    }
    // Sesuai route Vue yang sudah tersedia di App.vue.
    window.location.href = '/admin/dashboard'
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
  <div class="min-h-screen bg-[#fbf8f3] font-sans text-[#3b2416] antialiased">
    <header class="mx-auto flex max-w-7xl items-center justify-end px-6 py-5 sm:px-10 lg:px-14">
      <a href="/" class="group inline-flex items-center gap-2 text-xs font-semibold text-[#715645] transition hover:text-[#3b2416] hover:underline hover:underline-offset-4">
        <span aria-hidden="true" class="transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">←</span>
        Kembali ke Beranda
      </a>
    </header>

    <main class="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-4 pb-12 sm:px-10 md:grid-cols-[1fr_0.95fr] lg:gap-24 lg:px-14 lg:pt-8 lg:pb-16">
      <section aria-labelledby="login-title" class="mx-auto w-full max-w-105 md:mx-0 lg:ml-10">
        <h1 id="login-title" class="text-[clamp(2.65rem,5vw,4.5rem)] leading-[0.99] font-black tracking-[-0.055em] text-[#3b2416]">
          Selamat <span class="block font-serif font-normal italic tracking-[-0.045em] text-[#95613e]">datang</span>
        </h1>
        <p class="mt-4 mb-7 text-sm leading-relaxed text-[#715645]">Masukkan akun untuk melanjutkan</p>

        <form id="loginForm" class="space-y-5" @submit.prevent="submitLogin">
          <div>
            <label for="email" class="mb-2 block text-sm font-semibold">Email</label>
            <input id="email" v-model.trim="email" name="email" type="email" autocomplete="email" placeholder="Masukkan email" required class="w-full rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#968477] focus:border-[#95613e] focus:ring-2 focus:ring-[#95613e]/15" />
          </div>
          <div>
            <label for="password" class="mb-2 block text-sm font-semibold">Kata Sandi</label>
            <div class="relative">
              <input id="password" v-model="password" name="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" placeholder="Masukkan kata sandi" required class="w-full rounded-xl border border-[#decebf] bg-white px-4 py-3.5 pr-14 text-sm outline-none transition placeholder:text-[#968477] focus:border-[#95613e] focus:ring-2 focus:ring-[#95613e]/15" />
              <button type="button" :aria-label="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'" :aria-pressed="showPassword" class="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center rounded-r-xl text-[#715645] transition hover:text-[#3b2416] focus-visible:outline-2 focus-visible:outline-[#95613e]" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true"><path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.5 5.3A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17.4 17.4 0 0 1-3 3.7M6.5 6.5C3.6 8.6 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.5 4.5-1.2"/></svg>
              </button>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 text-sm">
            <label class="inline-flex cursor-pointer items-center gap-2 text-[#715645]">
              <input v-model="remember" name="remember" type="checkbox" class="size-4 cursor-pointer accent-[#627447]" /> Ingat Saya
            </label>
            <button type="button" class="cursor-pointer font-semibold text-[#95613e] hover:underline hover:underline-offset-4" @click="forgotPassword">Lupa Kata Sandi?</button>
          </div>

          <button type="submit" :disabled="isSubmitting" class="w-full cursor-pointer rounded-xl bg-[#3b2416] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#75482c] disabled:cursor-not-allowed disabled:opacity-60">{{ isSubmitting ? 'Sedang masuk...' : 'Masuk' }}</button>
        </form>

        <div class="my-5 flex items-center gap-4 text-xs text-[#756356]">
          <span class="h-px flex-1 bg-[#e6d9cb]" aria-hidden="true"></span> atau <span class="h-px flex-1 bg-[#e6d9cb]" aria-hidden="true"></span>
        </div>
        <button type="button" :disabled="isSubmitting" class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm font-semibold transition hover:border-[#95613e] hover:bg-[#f7f1e8] disabled:cursor-not-allowed disabled:opacity-60" @click="loginWithGoogle">
          <svg viewBox="0 0 48 48" class="size-5" aria-hidden="true">
            <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15z"/>
            <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.5l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44z"/>
            <path fill="#FBBC05" d="M12.6 27.9a12 12 0 0 1 0-7.8v-5.2H5.8a20 20 0 0 0 0 18.2z"/>
            <path fill="#EA4335" d="M24 11.7c3 0 5.7 1 7.8 3l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.8 14.9l6.8 5.2A12 12 0 0 1 24 11.7z"/>
          </svg>
          Masuk dengan Google
        </button>
        <p v-if="message" id="message" role="status" aria-live="polite" class="mt-4 border-l-2 px-3 py-2 text-sm leading-relaxed" :class="messageType === 'error' ? 'border-red-700 bg-red-50 text-red-800' : messageType === 'success' ? 'border-[#627447] bg-[#e8eedc] text-[#43552c]' : 'border-[#95613e] bg-[#f1e7d8] text-[#715645]'">{{ message }}</p>
        <p class="mt-6 text-center text-sm text-[#715645]">Belum punya akun? <a href="/register" class="font-bold text-[#3b2416] underline-offset-4 hover:underline">Daftar sekarang</a></p>
      </section>

      <aside class="relative hidden min-w-0 md:block" aria-label="Foto buah kakao">
        <div class="relative mx-auto max-w-115 pl-5">
          <div class="absolute top-5 -left-2 h-full w-[93%] rounded-t-[48%] rounded-br-[40%] bg-[#e8eedc]" aria-hidden="true"></div>
          <figure class="relative">
            <div class="aspect-[4/5] overflow-hidden rounded-t-[48%] rounded-br-[40%] rounded-bl-2xl bg-[#e6d9cb]">
              <img src="/kakao-home/login-kakao-matang.jpg" alt="Buah kakao matang berwarna merah, jingga, dan kuning di pohon" class="h-full w-full object-cover" />
            </div>
          </figure>
        </div>
      </aside>
    </main>
  </div>
</template>
