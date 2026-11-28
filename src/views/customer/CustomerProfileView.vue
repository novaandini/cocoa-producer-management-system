
<script setup>
import { reactive, ref } from 'vue'
import CustomerSidebar from '../../components/customer/CustomerSidebar.vue'
import CustomerHeader from '../../components/customer/CustomerHeader.vue'

// Mengambil data profil yang sebelumnya sudah tersimpan
const profile = reactive({
  name: localStorage.getItem('customerName') || '',
  email: localStorage.getItem('customerEmail') || '',
  phone: localStorage.getItem('customerPhone') || '',
  company: localStorage.getItem('customerCompany') || '',
  npwp: localStorage.getItem('customerNpwp') || '',
  address: localStorage.getItem('customerAddress') || '',
  publishCompany: localStorage.getItem('publishCompany') === 'true'
})

const password = reactive({
  old: '',
  new: '',
  confirm: ''
})

const message = ref('')

// Menyimpan seluruh informasi profil
function saveProfile() {
  localStorage.setItem('customerName', profile.name)
  localStorage.setItem('customerEmail', profile.email)
  localStorage.setItem('customerPhone', profile.phone)
  localStorage.setItem('customerCompany', profile.company)
  localStorage.setItem('customerNpwp', profile.npwp)
  localStorage.setItem('customerAddress', profile.address)
  localStorage.setItem('publishCompany', String(profile.publishCompany))

  message.value = 'Informasi profil berhasil disimpan. Data dapat digunakan pada halaman Checkout.'
}

// Validasi form perubahan password
function changePassword() {
  if (!password.old || !password.new || !password.confirm) {
    message.value = 'Lengkapi seluruh kolom password terlebih dahulu.'
    return
  }

  if (password.new !== password.confirm) {
    message.value = 'Konfirmasi password baru tidak cocok.'
    return
  }

  message.value = 'Form perubahan password sudah divalidasi. Penyimpanan password memerlukan backend.'

  password.old = ''
  password.new = ''
  password.confirm = ''
}
</script>

<template>
  <div class="min-h-screen bg-[#fffdf9] md:flex">
    <CustomerSidebar active-menu="profile" />

    <main class="min-w-0 flex-1">
      <CustomerHeader />

      <div class="space-y-6 p-5 sm:p-8">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[2px] text-[#a16b43]">
            Pengaturan Akun
          </p>

          <h2 class="mt-2 font-[Georgia,serif] text-2xl font-bold text-[#3b2416]">
            Profil Akun
          </h2>

          <p class="mt-2 text-xs text-[#82766c]">
            Kelola informasi pribadi dan perusahaan kamu.
          </p>
        </div>

        <!-- FORM INFORMASI PROFIL -->
        <form
          @submit.prevent="saveProfile"
          class="space-y-5 rounded-xl border border-[#eadfd3] bg-white p-5 sm:p-7"
        >
          <div>
            <h3 class="font-[Georgia,serif] text-lg font-bold text-[#3b2416]">
              Informasi Penanggung Jawab
            </h3>

            <p class="mt-1 text-xs text-[#82766c]">
              Informasi kontak yang digunakan untuk pesanan.
            </p>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <label class="text-xs font-semibold text-[#3b2416]">
              Nama Lengkap

              <input
                v-model="profile.name"
                required
                class="mt-2 w-full rounded-lg border border-[#eadfd3] px-4 py-3 font-normal outline-none focus:border-[#98633e]"
                placeholder="Masukkan nama lengkap"
              />
            </label>

            <label class="text-xs font-semibold text-[#3b2416]">
              Email

              <input
                v-model="profile.email"
                type="email"
                required
                class="mt-2 w-full rounded-lg border border-[#eadfd3] px-4 py-3 font-normal outline-none focus:border-[#98633e]"
                placeholder="nama@email.com"
              />
            </label>

            <label class="text-xs font-semibold text-[#3b2416]">
              Nomor Telepon

              <input
                v-model="profile.phone"
                type="tel"
                class="mt-2 w-full rounded-lg border border-[#eadfd3] px-4 py-3 font-normal outline-none focus:border-[#98633e]"
                placeholder="08xxxxxxxxxx"
              />
            </label>

            <label class="text-xs font-semibold text-[#3b2416]">
              Nama Perusahaan (Opsional)

              <input
                v-model="profile.company"
                class="mt-2 w-full rounded-lg border border-[#eadfd3] px-4 py-3 font-normal outline-none focus:border-[#98633e]"
                placeholder="Nama perusahaan"
              />
            </label>

            <label class="text-xs font-semibold text-[#3b2416] sm:col-span-2">
              NPWP (Opsional)

              <input
                v-model="profile.npwp"
                class="mt-2 w-full rounded-lg border border-[#eadfd3] px-4 py-3 font-normal outline-none focus:border-[#98633e]"
                placeholder="Nomor NPWP"
              />
            </label>

            <label class="text-xs font-semibold text-[#3b2416] sm:col-span-2">
              Alamat

              <textarea
                v-model="profile.address"
                rows="3"
                class="mt-2 w-full rounded-lg border border-[#eadfd3] px-4 py-3 font-normal outline-none focus:border-[#98633e]"
                placeholder="Masukkan alamat lengkap"
              ></textarea>
            </label>
          </div>

          <label class="flex items-start gap-3 text-xs text-[#6e5c50]">
            <input
              v-model="profile.publishCompany"
              type="checkbox"
              :disabled="!profile.company.trim()"
              class="mt-0.5 accent-[#795238]"
            />

            Saya menyetujui nama perusahaan ditampilkan kepada publik.
          </label>

          <button
            type="submit"
            class="rounded-lg bg-[#795238] px-6 py-3 text-xs font-bold text-white hover:bg-[#3b2416]"
          >
            Simpan Profil
          </button>
        </form>

        <!-- FORM UBAH PASSWORD -->
        <form
          @submit.prevent="changePassword"
          class="space-y-5 rounded-xl border border-[#eadfd3] bg-white p-5 sm:p-7"
        >
          <div>
            <h3 class="font-[Georgia,serif] text-lg font-bold text-[#3b2416]">
              Ubah Password
            </h3>

            <p class="mt-1 text-xs text-[#82766c]">
              Gunakan password baru yang kuat dan mudah kamu ingat.
            </p>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <label class="text-xs font-semibold text-[#3b2416] sm:col-span-2">
              Password Lama

              <input
                v-model="password.old"
                type="password"
                class="mt-2 w-full rounded-lg border border-[#eadfd3] px-4 py-3 font-normal outline-none focus:border-[#98633e]"
              />
            </label>

            <label class="text-xs font-semibold text-[#3b2416]">
              Password Baru

              <input
                v-model="password.new"
                type="password"
                class="mt-2 w-full rounded-lg border border-[#eadfd3] px-4 py-3 font-normal outline-none focus:border-[#98633e]"
              />
            </label>

            <label class="text-xs font-semibold text-[#3b2416]">
              Konfirmasi Password

              <input
                v-model="password.confirm"
                type="password"
                class="mt-2 w-full rounded-lg border border-[#eadfd3] px-4 py-3 font-normal outline-none focus:border-[#98633e]"
              />
            </label>
          </div>

          <button
            type="submit"
            class="rounded-lg border border-[#795238] px-6 py-3 text-xs font-bold text-[#795238] hover:bg-[#f4ede4]"
          >
            Ubah Password
          </button>
        </form>

        <!-- PESAN NOTIFIKASI -->
        <p
          v-if="message"
          class="rounded-lg bg-[#f4ede4] p-4 text-xs text-[#795238]"
        >
          {{ message }}
        </p>
      </div>
    </main>
  </div>
</template>
