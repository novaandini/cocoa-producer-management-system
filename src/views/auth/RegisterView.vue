
<script setup>
import { ref } from 'vue'

// API registrasi diaktifkan setelah backend Laravel siap.
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

      throw new Error(
        validationErrors || data.message || 'Pendaftaran gagal.'
      )
    }

    window.location.href = '/login?registered=1'
  } catch (error) {
    showMessage(
      error.message || 'Terjadi kesalahan saat mendaftar.',
      'error'
    )
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

        <div id="signupView">
          <div class="login-heading mb-8">
            <p class="section-label text-xs font-semibold tracking-[0.15em] text-[#a16038]">
              BERGABUNG BERSAMA KAKAO
            </p>

            <h2 class="mt-3 text-3xl font-semibold text-[#332116]">
              Buat Akun
            </h2>

            <p class="mt-2 text-sm text-[#8b7766]">
              Daftarkan akun pelanggan kamu.
            </p>
          </div>

          <form
            id="signupForm"
            class="space-y-5"
            @submit.prevent="submitRegister"
          >
            <div class="form-group">
              <label
                for="fullName"
                class="mb-2 block text-sm font-medium text-[#332116]"
              >
                Nama lengkap
              </label>

              <input
                id="fullName"
                v-model="fullName"
                type="text"
                name="fullName"
                placeholder="Masukkan nama lengkap"
                autocomplete="name"
                required
                class="w-full rounded-lg border border-[#eadfd5] bg-white px-4 py-3 text-sm text-[#332116] outline-none transition focus:border-[#a16038] focus:ring-2 focus:ring-[#a16038]/20"
              />
            </div>

            <div class="form-group">
              <label
                for="email"
                class="mb-2 block text-sm font-medium text-[#332116]"
              >
                Email
              </label>

              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                placeholder="nama@email.com"
                autocomplete="email"
                required
                class="w-full rounded-lg border border-[#eadfd5] bg-white px-4 py-3 text-sm text-[#332116] outline-none transition focus:border-[#a16038] focus:ring-2 focus:ring-[#a16038]/20"
              />
            </div>

            <div class="form-group">
              <label
                for="phoneNumber"
                class="mb-2 block text-sm font-medium text-[#332116]"
              >
                Nomor telepon
              </label>

              <input
                id="phoneNumber"
                v-model="phoneNumber"
                type="tel"
                name="phone_number"
                placeholder="081234567899"
                autocomplete="tel"
                required
                class="w-full rounded-lg border border-[#eadfd5] bg-white px-4 py-3 text-sm text-[#332116] outline-none transition focus:border-[#a16038] focus:ring-2 focus:ring-[#a16038]/20"
              />
            </div>

            <div class="form-group">
              <label
                for="newPassword"
                class="mb-2 block text-sm font-medium text-[#332116]"
              >
                Password
              </label>

              <input
                id="newPassword"
                v-model="newPassword"
                type="password"
                name="newPassword"
                placeholder="Buat password (min. 8 karakter)"
                autocomplete="new-password"
                minlength="8"
                required
                class="w-full rounded-lg border border-[#eadfd5] bg-white px-4 py-3 text-sm text-[#332116] outline-none transition focus:border-[#a16038] focus:ring-2 focus:ring-[#a16038]/20"
              />
            </div>

            <div class="form-group">
              <label
                for="confirmPassword"
                class="mb-2 block text-sm font-medium text-[#332116]"
              >
                Konfirmasi password
              </label>

              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Ulangi password"
                autocomplete="new-password"
                minlength="8"
                required
                class="w-full rounded-lg border border-[#eadfd5] bg-white px-4 py-3 text-sm text-[#332116] outline-none transition focus:border-[#a16038] focus:ring-2 focus:ring-[#a16038]/20"
              />
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full rounded-lg bg-[#a16038] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4f2e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ isSubmitting ? 'Mendaftarkan akun...' : 'Daftar' }}
            </button>

            <p
              id="signupMessage"
              v-if="message"
              class="form-message text-sm leading-relaxed"
              :class="{
                'text-red-600': messageType === 'error',
                'text-green-700': messageType === 'success',
                'text-[#8b7766]': messageType === 'info'
              }"
              role="status"
              aria-live="polite"
            >
              {{ message }}
            </p>
          </form>

          <div class="signup-link mt-6 text-center">
            <p class="text-sm text-[#8b7766]">
              Sudah punya akun?
              <a
                id="showLogin"
                href="/login"
                class="font-semibold text-[#a16038] hover:underline"
              >
                Login
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
