
<script setup>
defineProps({
  steps: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="space-y-5">
    <div v-for="(step, index) in steps" :key="index" class="flex gap-3">
      <div class="flex flex-col items-center">
        <div
          class="flex h-7 w-7 items-center justify-center rounded-full text-xs"
          :class="step.done ? 'bg-[#795238] text-white' : 'bg-[#f0e8df] text-[#a99a8d]'"
        >
          {{ step.done ? '✓' : index + 1 }}
        </div>
        <div
          v-if="index !== steps.length - 1"
          class="mt-1 min-h-7 w-px"
          :class="step.done ? 'bg-[#795238]' : 'bg-[#eadfd3]'"
        ></div>
      </div>

      <div class="pb-2">
        <p class="text-sm font-semibold text-[#3b2416]">{{ step.title }}</p>
        <p class="mt-1 text-xs text-[#82766c]">{{ step.description }}</p>
        <p v-if="step.date" class="mt-1 text-[10px] text-[#a16b43]">{{ step.date }}</p>
      </div>
    </div>
  </div>
</template>
