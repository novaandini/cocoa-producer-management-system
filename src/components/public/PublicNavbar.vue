<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useCart } from '../../composables/useCart.js'

const { cartCount } = useCart()

const props = defineProps({
  aboutHref: { type: String, default: '/about' },
})
const path = window.location.pathname.replace(/\/$/, '') || '/'
const menu = computed(() => [
  { label: 'Beranda', href: '/', active: path === '/' },
  { label: 'Katalog Produk', href: '/products', active: ['/products', '/detail-product'].includes(path) },
  { label: 'Lacak Pesanan', href: '/traceability', active: path === '/traceability' },
  { label: 'Tentang Kami', href: props.aboutHref, active: path === '/about' },
])

// Mengikuti format sesi yang sudah digunakan LoginView.vue.
const auth = ref(null)
const profileOpen = ref(false)
const profileRoot = ref(null)
const profileButton = ref(null)
const photoFailed = ref(false)
const signingOut = ref(false)
const dashboardMessage = ref('')
const CUSTOMER_DASHBOARD_URL = import.meta.env.VITE_CUSTOMER_DASHBOARD_URL || ''
const LOGOUT_API_URL = import.meta.env.VITE_LOGOUT_API_URL || ''

function readAuth() {
  try {
    const token = localStorage.getItem('auth_token')
    const user = JSON.parse(localStorage.getItem('auth_user') || 'null')
    const role = localStorage.getItem('userRole')
    auth.value = token && user && typeof user === 'object' && ['CUSTOMER', 'ADMIN'].includes(role)
      ? { token, user, role } : null
  } catch {
    auth.value = null
  }
  photoFailed.value = false
  profileOpen.value = false
  dashboardMessage.value = ''
}

const profilePhoto = computed(() => {
  const value = auth.value?.user?.avatar_url || auth.value?.user?.profile_photo_url || auth.value?.user?.photo_url || ''
  if (typeof value !== 'string' || !value) return ''
  try {
    const url = new URL(value, window.location.origin)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : ''
  } catch { return '' }
})
const dashboardHref = computed(() => auth.value?.role === 'ADMIN' ? '/admin/dashboard' : CUSTOMER_DASHBOARD_URL)

function closeProfile(event) {
  if (profileRoot.value && !profileRoot.value.contains(event.target)) {
    profileOpen.value = false
    dashboardMessage.value = ''
  }
}
function onEscape(event) {
  if (event.key === 'Escape' && profileOpen.value) {
    profileOpen.value = false
    dashboardMessage.value = ''
    profileButton.value?.focus()
  }
}
function toggleProfile() {
  profileOpen.value = !profileOpen.value
  dashboardMessage.value = ''
}
function dashboardUnavailable() {
  dashboardMessage.value = 'Dashboard pelanggan belum terhubung. Silakan kembali setelah integrasi selesai.'
}
async function logout() {
  if (signingOut.value) return
  signingOut.value = true
  let serverLogoutFailed = false
  // Hanya panggil endpoint logout apabila kontrak backend sudah tersedia.
  if (LOGOUT_API_URL && auth.value?.token) {
    try {
      const response = await fetch(LOGOUT_API_URL, {
        method: 'POST',
        headers: { Accept: 'application/json', Authorization: `Bearer ${auth.value.token}` },
        signal: AbortSignal.timeout(5000),
      })
      if (!response.ok) serverLogoutFailed = true
    } catch { serverLogoutFailed = true }
  }
  for (const key of ['auth_token', 'auth_user', 'userRole']) localStorage.removeItem(key)
  sessionStorage.removeItem('redirectAfterLogin')
  // Keranjang dan email Ingat Saya dipertahankan.
  auth.value = null
  if (serverLogoutFailed) window.alert('Sesi lokal telah dihapus, tetapi logout di server belum berhasil.')
  window.location.replace('/')
}

onMounted(() => {
  readAuth()
  window.addEventListener('storage', readAuth)
  window.addEventListener('pageshow', readAuth)
  document.addEventListener('click', closeProfile)
  document.addEventListener('keydown', onEscape)
})
onUnmounted(() => {
  window.removeEventListener('storage', readAuth)
  window.removeEventListener('pageshow', readAuth)
  document.removeEventListener('click', closeProfile)
  document.removeEventListener('keydown', onEscape)
})

</script>

<template>
  <header class="sticky top-0 z-40 border-b border-[#e7dbce] bg-white/95 backdrop-blur">
    <nav aria-label="Navigasi utama" class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-5 px-4 py-3 sm:px-8 lg:flex-nowrap lg:px-10">
      <a href="/" aria-label="KAKAO – Beranda" class="shrink-0">
        <img src="/kakao-home/logo-kakao.png" alt="KAKAO" class="h-12 w-20 object-contain sm:h-14 sm:w-24" />
      </a>
      <div class="order-3 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-[#e7dbce] pt-3 text-xs font-semibold sm:gap-x-6 sm:text-sm lg:order-0 lg:w-auto lg:border-0 lg:pt-0">
        <a v-for="item in menu" :key="item.href" :href="item.href" :aria-current="item.active ? 'page' : undefined" class="whitespace-nowrap transition hover:text-[#3b2416]" :class="item.active ? 'text-[#3b2416]' : 'text-[#715645]'">{{ item.label }}</a>
      </div>
      <div class="flex items-center gap-2 sm:gap-4">
        <a href="/cart" :aria-label="`Keranjang, ${cartCount} item`" title="Keranjang belanja" :aria-current="path === '/cart' ? 'page' : undefined" class="relative mr-1 flex size-10 items-center justify-center rounded-full border border-[#e3d5c6] text-[#3b2416] transition hover:bg-[#e8eedc]">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="size-5"><path d="M3 3h2l2.5 12.5h12L22 6H6"/><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/></svg>
          <span class="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#627447] text-[10px] font-bold text-white">{{ cartCount }}</span>
        </a>
        <template v-if="!auth">
          <a href="/login" class="px-2 py-2.5 text-xs font-semibold text-[#3b2416] hover:underline hover:underline-offset-4 sm:px-3 sm:text-sm">Masuk</a>
          <a href="/register" class="border-l border-[#e6d9cb] py-2.5 pl-3 text-xs font-semibold text-[#3b2416] hover:underline hover:underline-offset-4 sm:pl-4 sm:text-sm">Daftar</a>
        </template>
        <div v-else ref="profileRoot" class="relative shrink-0">
          <button ref="profileButton" type="button" aria-label="Menu profil" :aria-expanded="profileOpen" aria-controls="kakao-profile-dropdown" class="flex cursor-pointer items-center gap-1.5 rounded-full text-[#3b2416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#95613e]" @click="toggleProfile">
            <span class="flex size-10 items-center justify-center overflow-hidden rounded-full border border-[#e3d5c6] bg-[#f1e7d8] transition hover:bg-[#e8eedc]">
              <img v-if="profilePhoto && !photoFailed" :src="profilePhoto" alt="" referrerpolicy="no-referrer" class="size-full object-cover" @error="photoFailed = true" />
              <svg v-else aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="size-5"><circle cx="12" cy="8" r="3.5"/><path d="M5 20v-2a7 7 0 0 1 14 0v2"/></svg>
            </span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="size-3.5 transition-transform" :class="profileOpen ? 'rotate-180' : ''"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div v-if="profileOpen" id="kakao-profile-dropdown" class="absolute top-full right-0 z-50 mt-3 w-48 overflow-hidden rounded-xl border border-[#e7dbce] bg-white p-1.5 text-sm shadow-lg">
            <a v-if="dashboardHref" :href="dashboardHref" class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-semibold text-[#3b2416] transition hover:bg-[#fbf8f3]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="size-4 shrink-0"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              Dashboard
            </a>
            <button v-else type="button" class="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left font-semibold text-[#3b2416] transition hover:bg-[#fbf8f3]" @click="dashboardUnavailable">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="size-4 shrink-0"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              Dashboard
            </button>
            <p v-if="dashboardMessage" role="status" class="px-3 pb-2 text-xs leading-relaxed text-[#715645]">{{ dashboardMessage }}</p>
            <div class="mx-2 my-1 border-t border-[#e7dbce]"></div>
            <button type="button" :disabled="signingOut" class="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left font-semibold text-[#a34535] transition hover:bg-[#f9eeea] disabled:cursor-wait disabled:opacity-60" @click="logout">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><path d="M10 17l5-5-5-5m5 5H3m10-8h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/></svg>
              {{ signingOut ? 'Keluar...' : 'Log Out' }}
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
