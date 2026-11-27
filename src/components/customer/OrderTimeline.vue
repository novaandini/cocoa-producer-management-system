<script setup>
defineProps({
  steps: {
    type: Array,
    default: () => [
      { title: 'Pesanan dibuat', date: '-', completed: true },
      { title: 'Pembayaran dikonfirmasi', date: '-', completed: false },
      { title: 'Pesanan diproses', date: '-', completed: false },
      { title: 'Pesanan dikirim', date: '-', completed: false },
      { title: 'Pesanan selesai', date: '-', completed: false }
    ]
  }
})
</script>

<template>
  <div class="rounded-2xl border border-[#eadfd3] bg-white p-5">
    <h3 class="mb-5 text-lg font-bold text-[#3b2416]">Proses Pesanan</h3>

    <div v-for="(step, index) in steps" :key="index" class="relative flex gap-4 pb-6 last:pb-0">
      <div class="flex flex-col items-center">
        <span
          class="z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
          :class="step.completed ? 'bg-[#795238] text-white' : 'bg-[#eee7e0] text-[#82766c]'"
        >
          {{ step.completed ? '✓' : index + 1 }}
        </span>
        <span v-if="index !== steps.length - 1" class="absolute mt-7 h-full w-px bg-[#eadfd3]"></span>
      </div>

      <div>
        <p class="text-sm font-semibold text-[#3b2416]">{{ step.title }}</p>
        <p class="mt-1 text-xs text-[#82766c]">{{ step.date || 'Menunggu proses' }}</p>
      </div>
    </div>
  </div>
</template>
