<script setup>
import GradeBadge from './GradeBadge.vue'
import { formatRupiah } from '../../data/publicProducts.js'

defineProps({
  product: { type: Object, required: true },
  detailLabel: { type: String, default: 'Lihat Detail' },
  photoOnly: { type: Boolean, default: false },
})
</script>

<template>
  <article class="h-full">
    <component
      :is="photoOnly ? 'div' : 'a'"
      :href="photoOnly ? undefined : `/detail-product?product=${encodeURIComponent(product.id)}`"
      :aria-label="photoOnly ? undefined : `${detailLabel} ${product.name}`"
      class="flex h-full flex-col rounded-2xl"
      :class="photoOnly ? '' : 'group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b2416]'"
    >
      <component
        :is="photoOnly ? 'a' : 'div'"
        :href="photoOnly ? `/detail-product?product=${encodeURIComponent(product.id)}` : undefined"
        :aria-label="photoOnly ? `${detailLabel} ${product.name}` : undefined"
        class="relative block aspect-4/3 overflow-hidden rounded-2xl bg-[#f1e7d8]"
        :class="photoOnly ? 'group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b2416]' : ''"
      >
        <img :src="product.image" :alt="product.name" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />
        <div class="absolute top-3 left-3"><GradeBadge :grade="product.grade" /></div>
      </component>
      <div class="flex flex-1 flex-col pt-4 pb-3">
        <div class="flex flex-wrap items-center justify-between gap-2 text-xs"><span class="font-semibold text-[#627447]">{{ product.type }}</span><span class="text-[#756356]">{{ product.code }}</span></div>
        <h3 class="mt-2 text-lg font-bold tracking-tight text-[#38271c]" :class="photoOnly ? '' : 'group-hover:underline group-hover:underline-offset-4'">{{ product.name }}</h3>
        <div class="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p class="text-xl font-bold tracking-tight text-[#3b2416]">{{ formatRupiah(product.price) }} <span class="text-xs font-normal text-[#756356]">/ kg</span></p>
          <span class="text-xs font-semibold" :class="product.stock > 0 ? 'text-[#715645]' : 'rounded-full bg-red-50 px-2 py-1 text-red-700'">{{ product.stock > 0 ? `${product.stock} kg tersedia` : 'Stok Habis' }}</span>
        </div>
        <div v-if="!photoOnly" class="mt-auto flex items-center justify-between gap-2 border-b border-[#e6d9cb] pt-4 pb-2 text-sm font-semibold text-[#3b2416]">
          <span>{{ detailLabel }}</span>
          <span class="inline-block text-lg leading-none transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
        </div>
      </div>
    </component>
  </article>
</template>
