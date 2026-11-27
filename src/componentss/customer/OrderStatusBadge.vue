
<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'Menunggu Pembayaran'
  }
})

const statusClass = computed(() => {
  const status = props.status.toLowerCase()

  if (status.includes('menunggu')) {
    return 'bg-amber-100 text-amber-700'
  }

  if (status.includes('diproses')) {
    return 'bg-blue-100 text-blue-700'
  }

  if (status.includes('dikirim')) {
    return 'bg-purple-100 text-purple-700'
  }

  if (status.includes('selesai')) {
    return 'bg-green-100 text-green-700'
  }

  if (status.includes('batal')) {
    return 'bg-red-100 text-red-700'
  }

  return 'bg-gray-100 text-gray-700'
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
    :class="statusClass"
  >
    {{ status }}
  </span>
</template>
