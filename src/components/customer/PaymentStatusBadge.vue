<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, default: 'Pending' }
})

const statusClass = computed(() => {
  const value = props.status.toLowerCase()

  if (value.includes('paid') || value.includes('berhasil') || value.includes('dibayar')) {
    return 'bg-green-100 text-green-700'
  }

  if (value.includes('pending') || value.includes('menunggu')) {
    return 'bg-amber-100 text-amber-700'
  }

  if (value.includes('refund') || value.includes('pengembalian')) {
    return 'bg-blue-100 text-blue-700'
  }

  if (value.includes('expired') || value.includes('gagal') || value.includes('failed')) {
    return 'bg-red-100 text-red-700'
  }

  return 'bg-gray-100 text-gray-700'
})
</script>

<template>
  <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold" :class="statusClass">
    {{ status }}
  </span>
</template>
