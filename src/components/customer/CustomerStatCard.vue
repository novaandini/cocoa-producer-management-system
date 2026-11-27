<script setup>
defineProps({
  title: { type: String, default: 'Statistik' },
  value: { type: [String, Number], default: 0 },
  description: { type: String, default: '' },
  icon: { type: String, default: '▦' }
})
</script>

<template>
  <div class="rounded-2xl border border-[#eadfd3] bg-white p-5 shadow-sm">
    <div class="flex items-center justify-between">
      <p class="text-sm text-[#82766c]">{{ title }}</p>
      <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5ece3] text-xl text-[#795238]">
        {{ icon }}
      </span>
    </div>
    <p class="mt-4 text-3xl font-bold text-[#3b2416]">{{ value }}</p>
    <p v-if="description" class="mt-1 text-xs text-[#82766c]">{{ description }}</p>
  </div>
</template>
