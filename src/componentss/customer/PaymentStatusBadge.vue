
<script setup>
defineProps({
  status: { type: String, default: 'Pending' }
})

const styles = {
  'Paid': 'bg-green-50 text-green-700',
  'Pending': 'bg-amber-50 text-amber-700',
  'Expired': 'bg-red-50 text-red-700',
  'Failed': 'bg-red-50 text-red-700',
  'Refund': 'bg-blue-50 text-blue-700'
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
