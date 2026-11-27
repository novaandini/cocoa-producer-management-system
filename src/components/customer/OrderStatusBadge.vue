<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, default: 'Menunggu Pembayaran' }
})

const statusClass = computed(() => {
  const value = props.status.toLowerCase()

  if (value.includes('menunggu')) return 'bg-amber-100 text-amber-700'
  if (value.includes('proses')) return 'bg-blue-100 text-blue-700'
  if (value.includes('kirim')) return 'bg-purple-100 text-purple-700'
  if (value.includes('selesai')) return 'bg-green-100 text-green-700'
  if (value.includes('batal')) return 'bg-red-100 text-red-700'

  return 'bg-gray-100 text-gray-700'
})
</script>

<template>
  <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold" :class="statusClass">
    {{ status }}
  </span>
</template>
