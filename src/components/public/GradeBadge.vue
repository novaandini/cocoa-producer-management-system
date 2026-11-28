<script setup>
defineProps({ grade: { type: String, required: true } })
</script>

<template>
  <span class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold" :class="grade === 'A' ? 'bg-[#e8eedc] text-[#3b2416]' : grade === 'B' ? 'bg-[#f2dec1] text-[#593617]' : 'bg-[#eee7df] text-[#665448]'">Grade {{ grade }}</span>
</template>
