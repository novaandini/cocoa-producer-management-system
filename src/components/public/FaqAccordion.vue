<script setup>
import { ref } from 'vue'

defineProps({ items: { type: Array, required: true } })
const active = ref(null)
function toggle(index) {
  active.value = active.value === index ? null : index
}
</script>

<template>
  <div class="border-t border-[#d8c7b5]">
    <div v-for="(item, index) in items" :key="item.question" class="border-b border-[#d8c7b5]">
      <h3>
        <button :id="`about-faq-question-${index}`" type="button" :aria-expanded="active === index" :aria-controls="`about-faq-answer-${index}`" @click="toggle(index)" class="group flex w-full cursor-pointer items-center gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#627447] sm:gap-5 sm:py-6">
          <span class="shrink-0 text-xs font-semibold text-[#95613e] tabular-nums">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="flex-1 text-sm font-semibold leading-relaxed text-[#3b2416] transition group-hover:text-[#95613e] sm:text-base">{{ item.question }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" class="size-5 shrink-0 text-[#627447]"><path d="M5 12h14"/><path v-if="active !== index" d="M12 5v14"/></svg>
        </button>
      </h3>
      <div v-show="active === index" :id="`about-faq-answer-${index}`" :aria-labelledby="`about-faq-question-${index}`" role="region" class="pb-6 pl-9 pr-8 text-sm leading-relaxed text-[#715645] sm:pl-10">
        <p>{{ item.answer }}</p>
        <a v-if="item.href" :href="item.href" class="mt-3 inline-flex items-center gap-2 font-semibold text-[#3b2416] underline decoration-[#a8b882] underline-offset-4 hover:decoration-[#3b2416]">{{ item.linkLabel }} <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </div>
</template>
