
<script setup>
defineProps({
  status: { type: String, default: 'Menunggu Pembayaran' }
})

const styles = {
  'Menunggu Pembayaran': 'bg-amber-50 text-amber-700',
  'Diproses': 'bg-blue-50 text-blue-700',
  'Dikirim': 'bg-violet-50 text-violet-700',
  'Selesai': 'bg-green-50 text-green-700',
  'Dibatalkan': 'bg-red-50 text-red-700'
}
</script>

<template>
  <span
    class="inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold"
    :class="styles[status] || 'bg-gray-100 text-gray-600'"
  >
    {{ status }}
  </span>
</template>
