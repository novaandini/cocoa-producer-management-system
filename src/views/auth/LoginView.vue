
<script setup>
import { onMounted, ref } from 'vue'

const LOGIN_API_URL =
  import.meta.env.VITE_LOGIN_API_URL ||
  'http://127.0.0.1:8000/api/auth/login'

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

function getUserRole(user, responseData) {
  const rawRole = user?.role ?? user?.user_role ?? responseData?.role

  const roleValue =
    typeof rawRole === 'object' && rawRole !== null
      ? rawRole.name ?? rawRole.slug ?? rawRole.code
      : rawRole

  const normalizedRole = String(roleValue ?? '').trim().toUpperCase()

  if (normalizedRole === 'CUSTOMER' || normalizedRole === 'PELANGGAN') {
    return 'CUSTOMER'
  }

  if (normalizedRole === 'ADMIN' || normalizedRole === 'ADMINISTRATOR') {
    return 'ADMIN'
  }

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
        Accept: 'application/json'
      },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value
      })
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      message.value =
        data.message || 'Email atau password salah. Silakan coba lagi.'
      messageType.value = 'error'
      return
    }

    const token = data.token ?? data.access_token ?? data.data?.token
    const user = data.user ?? data.data?.user
    const role = getUserRole(user, data)

    if (!token || !user) {
      message.value =
        'Login berhasil, tetapi data token atau user tidak lengkap dari API.'
      messageType.value = 'error'
      return
    }

    if (!role) {
      message.value =
        'Login berhasil, tetapi role akun belum dikenali. Periksa field user.role pada respons API Laravel.'
      messageType.value = 'error'
      return
    }

    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))
    localStorage.setItem('userRole', role)

    if (remember.value) {
      localStorage.setItem('kakao_remember_email', email.value.trim())
    } else {
      localStorage.removeItem('kakao_remember_email')
    }

    if (role === 'CUSTOMER') {
      const requestedPage = sessionStorage.getItem('redirectAfterLogin')
      sessionStorage.removeItem('redirectAfterLogin')

      window.location.href =
        requestedPage === 'checkout' ? '/checkout' : '/'

      return
    }

    sessionStorage.removeItem('redirectAfterLogin')
    window.location.href = '/admin/dashboard/index.html'
  } catch (error) {
    console.error('Error during login:', error)

    message.value =
      'Tidak dapat terhubung ke server login. Pastikan API Laravel berjalan dan CORS diizinkan.'

    messageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen flex flex-col lg:flex-row bg-[#fffdf9] text-[#332116]">

    <!-- BAGIAN KIRI -->
    <section
      class="login-left flex flex-col justify-between w-full lg:w-1/2 bg-[#332116] text-white p-8 sm:p-12 lg:p-16"
    >
      <div class="login-brand">
        <a
          href="/"
          class="text-3xl font-bold tracking-widest text-[#d5a274]"
        >
          KAKAO
        </a>

        <p class="mt-2 text-xs leading-relaxed tracking-wider text-[#e8d8c9]">
          SISTEM INFORMASI<br />
          PRODUSEN KAKAO
        </p>
      </div>

      <div class="login-info my-16 lg:my-0 max-w-lg">
        <p class="section-label text-xs font-semibold tracking-[0.2em] text-[#d5a274]">
          SISTEM INFORMASI PRODUSEN KAKAO
        </p>

        <h1 class="mt-5 text-4xl sm:text-5xl font-semibold leading-tight">
          Kelola kakao
          <span class="block text-[#d5a274]">
            lebih terstruktur.
          </span>
        </h1>

        <p class="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-[#e8d8c9]">
          Platform untuk melakukan pemesanan,
          memantau pesanan, dan mengelola
          operasional produsen kakao.
        </p>
      </div>

      <div class="hidden lg:block"></div>
    </section>

    <!-- BAGIAN KANAN -->
    <section
      class="login-right flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-10 lg:p-16"
    >
      <div class="login-box w-full max-w-md">

        <div id="loginView">
          <div class="login-heading mb-8">
            <p class="section-label text-xs font-semibold tracking-[0.15em] text-[#a16038]">
              SELAMAT DATANG
            </p>

            <h2 class="mt-3 text-3xl font-semibold text-[#332116]">
              Login
            </h2>

            <p class="mt-2 text-sm text-[#8b7766]">
              Masukkan akun untuk melanjutkan.
            </p>
          </div>

          <form
            id="loginForm"
            class="space-y-5"
            @submit.prevent="submitLogin"
          >
            <div class="form-group">
              <label
                for="email"
                class="mb-2 block text-sm font-medium text-[#332116]"
              >
                Email
              </label>

              <input
                id="email"
                v-model.trim="email"
                type="email"
                name="email"
                placeholder="Masukkan email"
                autocomplete="email"
                required
                class="w-full rounded-lg border border-[#eadfd5] bg-white px-4 py-3 text-sm text-[#332116] outline-none transition focus:border-[#a16038] focus:ring-2 focus:ring-[#a16038]/20"
              />
            </div>

            <div class="form-group">
              <label
                for="password"
                class="mb-2 block text-sm font-medium text-[#332116]"
              >
                Password
              </label>

              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                placeholder="Masukkan password"
                autocomplete="current-password"
                required
                class="w-full rounded-lg border border-[#eadfd5] bg-white px-4 py-3 text-sm text-[#332116] outline-none transition focus:border-[#a16038] focus:ring-2 focus:ring-[#a16038]/20"
              />
            </div>

            <div class="form-option flex flex-wrap items-center justify-between gap-3 text-sm">
              <label class="remember-option flex items-center gap-2 text-[#8b7766]">
                <input
                  v-model="remember"
                  type="checkbox"
                  name="remember"
                  class="h-4 w-4 accent-[#a16038]"
                />
                Ingat saya
              </label>

              <a
                href="#"
                id="forgotPassword"
                class="text-[#a16038] hover:underline"
                @click.prevent="forgotPassword"
              >
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full rounded-lg bg-[#a16038] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4f2e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ isSubmitting ? 'Sedang masuk...' : 'Masuk' }}
            </button>

            <p
              v-if="message"
              id="message"
              class="form-message text-sm leading-relaxed"
              :class="{
                'text-red-600': messageType === 'error',
                'text-green-700': messageType === 'success',
                'text-[#8b7766]': messageType === ''
              }"
              role="status"
              aria-live="polite"
            >
              {{ message }}
            </p>
          </form>

          <div class="signup-link mt-6 text-center">
            <p class="text-sm text-[#8b7766]">
              Belum punya akun?
              <a
                href="/register"
                class="font-semibold text-[#a16038] hover:underline"
              >
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>

        <div class="back-home mt-8 text-center">
          <a
            href="/"
            class="text-sm text-[#8b7766] transition hover:text-[#a16038]"
          >
            ← Kembali ke halaman utama
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
