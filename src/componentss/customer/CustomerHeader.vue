
<script setup>
import { computed } from 'vue'

const customerName = computed(() => {
  return localStorage.getItem('customerName') || 'Pelanggan'
})
</script>

<template>
  <header class="flex flex-col gap-4 border-b border-[#eadfd3] bg-[#fffdf9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
    <div>
      <p class="text-[10px] font-semibold uppercase tracking-[2px] text-[#a16b43]">
        Customer Panel
      </p>
      <h1 class="mt-1 font-[Georgia,serif] text-xl font-bold text-[#3b2416]">
        Selamat Datang, {{ customerName }}
      </h1>
      <p class="mt-1 text-xs text-[#82766c]">
        Kelola pesanan dan informasi akun KAKAO kamu di sini.
      </p>
    </div>

    <div class="flex items-center gap-3">
      <a
        href="/"
        class="rounded-lg border border-[#eadfd3] px-4 py-2.5 text-xs font-semibold text-[#795238] transition hover:bg-[#f4ede4]"
      >
        ← Beranda
      </a>

      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0e3d5] font-[Georgia,serif] text-sm font-bold text-[#795238]">
        {{ customerName.charAt(0).toUpperCase() }}
      </div>
    </div>
  </header>
</template>
