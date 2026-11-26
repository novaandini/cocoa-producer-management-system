<script setup>
defineProps({ eyebrow: String, title: { type: String, required: true }, description: String })
</script>

<template>
  <div class="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
    <div class="max-w-2xl">
      <p v-if="eyebrow" class="mb-2 text-xs font-bold tracking-widest text-[#627447] uppercase">{{ eyebrow }}</p>
      <h2 class="text-2xl leading-tight font-extrabold tracking-tight text-[#3b2416] sm:text-3xl">{{ title }}</h2>
      <p v-if="description" class="mt-2 text-sm leading-relaxed text-[#756356]">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>
