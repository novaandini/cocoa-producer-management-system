<script setup>
defineProps({
  type: { type: String, default: 'all' },
  grade: { type: String, default: 'all' },
  typeCounts: { type: Object, required: true },
  gradeCounts: { type: Object, required: true },
})
const emit = defineEmits(['update:type', 'update:grade', 'reset'])
const types = [
  { value: 'all', label: 'Semua produk' },
  { value: 'fermentasi', label: 'Fermentasi' },
  { value: 'non-fermentasi', label: 'Non-Fermentasi' },
]
const grades = [
  { value: 'all', label: 'Semua grade' },
  { value: 'A', label: 'Grade A' },
  { value: 'B', label: 'Grade B' },
  { value: 'C', label: 'Grade C' },
]
</script>

<template>
  <aside class="min-w-0" aria-label="Filter katalog">
    <div class="flex items-center justify-between gap-3 border-b border-[#e6d9cb] pb-4">
      <h2 class="flex items-center gap-2 text-base font-bold text-[#3b2416]">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" class="size-5"><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="8" cy="7" r="2" fill="#fbf8f3"/><circle cx="15" cy="12" r="2" fill="#fbf8f3"/><circle cx="10" cy="17" r="2" fill="#fbf8f3"/></svg>
        Filter produk
      </h2>
      <button type="button" class="cursor-pointer text-xs font-semibold text-[#715645] underline underline-offset-4 hover:text-[#3b2416] focus-visible:outline-2 focus-visible:outline-offset-4" @click="emit('reset')">Reset</button>
    </div>
    <div class="grid grid-cols-1 gap-6 pt-5 min-[480px]:grid-cols-2 lg:grid-cols-1">
      <fieldset class="min-w-0">
        <legend class="mb-3 text-sm font-bold text-[#3b2416]">Jenis pengolahan</legend>
        <label v-for="option in types" :key="option.value" class="flex cursor-pointer items-center gap-3 py-2 text-sm text-[#715645] hover:text-[#3b2416]" :class="type === option.value ? 'font-semibold text-[#3b2416]' : ''">
          <input type="radio" name="catalog-type" :value="option.value" :checked="type === option.value" @change="emit('update:type', option.value)" class="size-4 shrink-0 accent-[#627447]" />
          <span class="flex-1">{{ option.label }}</span>
          <span class="text-xs tabular-nums text-[#756356]">{{ typeCounts[option.value] ?? 0 }}</span>
        </label>
      </fieldset>
      <fieldset class="min-w-0 border-t border-[#e6d9cb] pt-4 min-[480px]:border-t-0 min-[480px]:pt-0 lg:border-t lg:pt-5">
        <legend class="sr-only">Filter kualitas</legend>
        <p aria-hidden="true" class="mb-3 text-sm font-bold text-[#3b2416]">Kualitas biji kakao</p>
        <label v-for="option in grades" :key="option.value" class="flex cursor-pointer items-center gap-3 py-2 text-sm text-[#715645] hover:text-[#3b2416]" :class="grade === option.value ? 'font-semibold text-[#3b2416]' : ''">
          <input type="radio" name="catalog-grade" :value="option.value" :checked="grade === option.value" @change="emit('update:grade', option.value)" class="size-4 shrink-0 accent-[#627447]" />
          <span class="flex-1">{{ option.label }}</span>
          <span class="text-xs tabular-nums text-[#756356]">{{ gradeCounts[option.value] ?? 0 }}</span>
        </label>
      </fieldset>
    </div>
    <div class="mt-6 hidden border-t border-[#e6d9cb] pt-5 lg:block">
      <p class="text-xs font-semibold tracking-widest text-[#627447] uppercase">Dari Jembrana</p>
      <p class="mt-2 text-sm leading-relaxed text-[#756356]">Kenali grade, jenis pengolahan, dan ketersediaan biji sebelum menentukan pilihan</p>
    </div>
  </aside>
</template>
