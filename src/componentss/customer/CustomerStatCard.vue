
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '▤'
  }
})
</script>

<template>
  <div class="rounded-xl border border-[#eadfd3] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs font-medium text-[#82766c]">
          {{ title }}
        </p>

        <h3 class="mt-3 font-[Georgia,serif] text-3xl font-bold text-[#3b2416]">
          {{ value }}
        </h3>
      </div>

      <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f4ede4] text-xl text-[#795238]">
        {{ icon }}
      </div>
    </div>

    <p v-if="description" class="mt-4 border-t border-[#f0e8df] pt-3 text-[11px] text-[#a16b43]">
      {{ description }}
    </p>
  </div>
</template>
