<script setup>
import { ref, watch } from 'vue'
import PasswordField from '../../components/public/PasswordField.vue'

// Tetap nonaktif secara default sampai kontrak API disetujui kelompok.
const BACKEND_ENABLED = import.meta.env.VITE_REGISTER_ENABLED === 'true'
const REGISTER_API_URL = import.meta.env.VITE_REGISTER_API_URL || 'http://127.0.0.1:8000/api/auth/register'
const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL || ''

const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const address = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isCompany = ref(false)
const companyName = ref('')
const npwp = ref('')
const publishCompany = ref(false)
const message = ref('')
const messageType = ref('')
const isSubmitting = ref(false)

watch(isCompany, enabled => {
  if (!enabled) {
    companyName.value = ''
    npwp.value = ''
    publishCompany.value = false
  }
})
watch(companyName, value => {
  if (!value.trim()) publishCompany.value = false
})

function showMessage(text, type = '') {
  message.value = text
  messageType.value = type
}

function registerWithGoogle() {
  if (isSubmitting.value) return
  if (!GOOGLE_AUTH_URL) {
    showMessage('Daftar dengan Google belum tersedia. Silakan gunakan formulir pendaftaran.', 'info')
    return
  }
  // Backend wajib menangani OAuth dan kelengkapan profil pembeli baru.
  window.location.assign(GOOGLE_AUTH_URL)
}

async function submitRegister() {
  if (isSubmitting.value) return
  showMessage('')
  if (!fullName.value.trim() || !email.value.trim() || !phoneNumber.value.trim() || !address.value.trim()) {
    showMessage('Lengkapi seluruh data akun yang wajib diisi.', 'error')
    return
  }
  if (newPassword.value.length < 8) {
    showMessage('Kata sandi minimal 8 karakter.', 'error')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    showMessage('Konfirmasi kata sandi tidak sama.', 'error')
    return
  }

  // Lima field lama dipertahankan. Field tambahan di bawah merupakan usulan
  // kontrak API dan perlu disepakati bersama pengembang backend.
  const payload = {
    name: fullName.value.trim(),
    email: email.value.trim(),
    phone_number: phoneNumber.value.trim(),
    password: newPassword.value,
    password_confirmation: confirmPassword.value,
    address: address.value.trim(),
    is_company: isCompany.value,
    company_name: isCompany.value ? companyName.value.trim() || null : null,
    npwp: isCompany.value ? npwp.value.trim() || null : null,
    publish_company_name: Boolean(isCompany.value && companyName.value.trim() && publishCompany.value),
  }

  if (!BACKEND_ENABLED) {
    showMessage('Formulir sudah valid. Pendaftaran akun belum diaktifkan karena backend Laravel belum terhubung.', 'info')
    return
  }

  isSubmitting.value = true
  showMessage('Mendaftarkan akun...', 'info')
  try {
    const response = await fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await response.json().catch(() => null)
    if (!response.ok || !data || data.success === false) {
      const validationErrors = data?.errors ? Object.values(data.errors).flat().join(' ') : ''
      throw new Error(validationErrors || data?.message || 'Pendaftaran gagal. Periksa respons API.')
    }
    // Hanya redirect setelah API menyatakan berhasil. Keranjang tidak dihapus.
    window.location.href = '/login?registered=1'
  } catch (error) {
    showMessage(error.message || 'Terjadi kesalahan saat mendaftar.', 'error')
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
    <main class="mx-auto grid max-w-7xl items-start gap-12 px-6 pt-4 pb-12 sm:px-10 lg:grid-cols-[1.2fr_0.85fr] lg:gap-16 lg:px-14 lg:pt-8 lg:pb-16">
      <section aria-labelledby="register-title" class="mx-auto w-full max-w-xl lg:mx-0 lg:ml-4">
        <h1 id="register-title" class="text-[clamp(2.65rem,5vw,4.5rem)] leading-[0.99] font-black tracking-[-0.055em] text-[#3b2416]">
          Buat akun <span class="block font-serif font-normal italic tracking-[-0.045em] text-[#95613e]">baru</span>
        </h1>
        <p class="mt-4 mb-7 text-sm leading-relaxed text-[#715645]">Lengkapi data untuk membuat akun Anda</p>

        <form id="signupForm" class="space-y-6" @submit.prevent="submitRegister">
          <fieldset class="grid min-w-0 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <legend class="mb-4 w-full border-b border-[#e6d9cb] pb-3 text-sm font-bold">Informasi akun</legend>
            <div class="min-w-0 sm:col-span-2">
              <label for="fullName" class="mb-2 block text-sm font-semibold">Nama Lengkap</label>
              <input id="fullName" name="fullName" v-model.trim="fullName" type="text" autocomplete="name" placeholder="Masukkan nama lengkap" required class="w-full rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#968477] focus:border-[#95613e] focus:ring-2 focus:ring-[#95613e]/15" />
            </div>
            <div class="min-w-0 ">
              <label for="email" class="mb-2 block text-sm font-semibold">Email</label>
              <input id="email" name="email" v-model.trim="email" type="email" autocomplete="email" placeholder="nama@email.com" required class="w-full rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#968477] focus:border-[#95613e] focus:ring-2 focus:ring-[#95613e]/15" />
            </div>
            <div class="min-w-0 ">
              <label for="phone_number" class="mb-2 block text-sm font-semibold">Nomor Telepon / WhatsApp</label>
              <input id="phone_number" name="phone_number" v-model.trim="phoneNumber" type="tel" autocomplete="tel" placeholder="08xxxxxxxxxx" required class="w-full rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#968477] focus:border-[#95613e] focus:ring-2 focus:ring-[#95613e]/15" />
            </div>
            <PasswordField id="newPassword" v-model="newPassword" label="Kata Sandi" placeholder="Minimal 8 karakter" />
            <PasswordField id="confirmPassword" v-model="confirmPassword" label="Konfirmasi Kata Sandi" placeholder="Ulangi kata sandi" />
            <div class="sm:col-span-2">
              <label for="address" class="mb-2 block text-sm font-semibold">Alamat Lengkap</label>
              <textarea id="address" v-model.trim="address" name="address" autocomplete="street-address" rows="3" required placeholder="Jalan, desa / kelurahan, kecamatan, kota, kode pos" class="w-full rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#968477] focus:border-[#95613e] focus:ring-2 focus:ring-[#95613e]/15 resize-y"></textarea>
            </div>
          </fieldset>

          <fieldset class="min-w-0 border-t border-[#e6d9cb] pt-4">
            <legend class="pr-3 text-sm font-bold">Informasi perusahaan (opsional)</legend>
            <label class="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#715645]">
              <input v-model="isCompany" type="checkbox" name="is_company" class="mt-0.5 size-4 shrink-0 cursor-pointer accent-[#627447]" />
              Saya mendaftar atas nama perusahaan / badan usaha
            </label>
            <div v-if="isCompany" class="mt-4 grid gap-4 border-l-2 border-[#627447] pl-4 sm:grid-cols-2">
              <div>
                <label for="companyName" class="mb-2 block text-sm font-semibold">Nama Perusahaan / Usaha</label>
                <input id="companyName" v-model.trim="companyName" name="company_name" autocomplete="organization" placeholder="Opsional" class="w-full rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#968477] focus:border-[#95613e] focus:ring-2 focus:ring-[#95613e]/15" />
              </div>
              <div>
                <label for="npwp" class="mb-2 block text-sm font-semibold">Nomor NPWP</label>
                <input id="npwp" v-model.trim="npwp" name="npwp" inputmode="numeric" placeholder="Opsional" class="w-full rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#968477] focus:border-[#95613e] focus:ring-2 focus:ring-[#95613e]/15" />
              </div>
              <label class="flex items-start gap-3 text-xs leading-relaxed text-[#715645] sm:col-span-2" :class="companyName.trim() ? 'cursor-pointer' : 'opacity-60'">
                <input v-model="publishCompany" type="checkbox" name="publish_company_name" :disabled="!companyName.trim()" class="mt-0.5 size-4 shrink-0 accent-[#627447] disabled:cursor-not-allowed" />
                Saya mengizinkan nama perusahaan ditampilkan pada daftar mitra pembeli di halaman beranda
              </label>
            </div>
          </fieldset>

          <button type="submit" :disabled="isSubmitting" class="w-full cursor-pointer rounded-xl bg-[#3b2416] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#75482c] disabled:cursor-not-allowed disabled:opacity-60">{{ isSubmitting ? 'Mendaftarkan akun...' : 'Daftar Sekarang' }}</button>
        </form>
        <div class="my-5 flex items-center gap-4 text-xs text-[#756356]">
          <span class="h-px flex-1 bg-[#e6d9cb]" aria-hidden="true"></span> atau <span class="h-px flex-1 bg-[#e6d9cb]" aria-hidden="true"></span>
        </div>
        <button type="button" :disabled="isSubmitting" class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm font-semibold transition hover:border-[#95613e] hover:bg-[#f7f1e8] disabled:cursor-not-allowed disabled:opacity-60" @click="registerWithGoogle">
          <svg viewBox="0 0 48 48" class="size-5" aria-hidden="true">
            <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15z"/>
            <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.5l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44z"/>
            <path fill="#FBBC05" d="M12.6 27.9a12 12 0 0 1 0-7.8v-5.2H5.8a20 20 0 0 0 0 18.2z"/>
            <path fill="#EA4335" d="M24 11.7c3 0 5.7 1 7.8 3l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.8 14.9l6.8 5.2A12 12 0 0 1 24 11.7z"/>
          </svg>
          Daftar dengan Google
        </button>
        <p v-if="message" id="signupMessage" role="status" aria-live="polite" class="mt-4 border-l-2 px-3 py-2 text-sm leading-relaxed" :class="messageType === 'error' ? 'border-red-700 bg-red-50 text-red-800' : messageType === 'success' ? 'border-[#627447] bg-[#e8eedc] text-[#43552c]' : 'border-[#95613e] bg-[#f1e7d8] text-[#715645]'">{{ message }}</p>
        <p class="mt-6 text-center text-sm text-[#715645]">Sudah punya akun? <a href="/login" class="font-bold text-[#3b2416] underline-offset-4 hover:underline">Masuk</a></p>
      </section>
      <aside class="relative hidden min-w-0 self-start lg:sticky lg:top-8 lg:block" aria-label="Foto buah kakao">
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
