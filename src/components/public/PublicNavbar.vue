<script setup>
import { computed } from 'vue'
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
        <a href="/login" class="px-2 py-2.5 text-xs font-semibold text-[#3b2416] hover:underline hover:underline-offset-4 sm:px-3 sm:text-sm">Masuk</a>
        <a href="/register" class="border-l border-[#e6d9cb] py-2.5 pl-3 text-xs font-semibold text-[#3b2416] hover:underline hover:underline-offset-4 sm:pl-4 sm:text-sm">Daftar</a> 
      </div>
    </nav>
  </header>
</template>
