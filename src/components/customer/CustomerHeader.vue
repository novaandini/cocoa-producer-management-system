<script setup>
import { computed } from 'vue'

const customerName = computed(() => {
  return localStorage.getItem('customerName') || 'Pelanggan'
})
</script>

<template>
  <header class="flex flex-wrap items-center justify-between gap-4 border-b border-[#eadfd3] bg-white px-5 py-4 md:px-8">
    <div>
      <p class="text-sm text-[#82766c]">Selamat datang kembali,</p>
      <h2 class="text-lg font-bold text-[#3b2416]">{{ customerName }}</h2>
    </div>

    <div class="flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2e7dc] font-bold text-[#795238]">
        {{ customerName.charAt(0).toUpperCase() }}
      </div>
      <span class="text-sm font-medium text-[#3b2416]">{{ customerName }}</span>
    </div>
  </header>
</template>
