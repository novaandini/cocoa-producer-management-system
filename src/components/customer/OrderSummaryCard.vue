<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  subtotal: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
})

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(Number(value) || 0)
}

const calculatedTotal = computed(() => {
  return props.total || props.subtotal + props.shipping
})
</script>

<template>
  <div class="rounded-2xl border border-[#eadfd3] bg-white p-5">
    <h3 class="mb-4 text-lg font-bold text-[#3b2416]">Ringkasan Pesanan</h3>

    <div v-if="items.length" class="space-y-4">
      <div
        v-for="(item, index) in items"
        :key="item.id || index"
        class="flex items-start justify-between gap-4 border-b border-[#f0e8e0] pb-3"
      >
        <div>
          <p class="font-semibold text-[#3b2416]">
            {{ item.name || item.productName || 'Produk Kakao' }}
          </p>
          <p class="mt-1 text-sm text-[#82766c]">
            {{ item.grade ? 'Grade ' + item.grade : '' }}
            {{ item.quantity ? ' · ' + item.quantity + ' kg' : '' }}
          </p>
        </div>

        <p class="whitespace-nowrap text-sm font-semibold text-[#3b2416]">
          {{ formatRupiah(item.subtotal ?? ((item.price || 0) * (item.quantity || 0))) }}
        </p>
      </div>
    </div>

    <p v-else class="py-3 text-sm text-[#82766c]">Belum ada produk dalam pesanan.</p>

    <div class="mt-4 space-y-3 text-sm">
      <div class="flex justify-between">
        <span class="text-[#82766c]">Subtotal</span>
        <span class="font-medium text-[#3b2416]">{{ formatRupiah(subtotal) }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-[#82766c]">Ongkos Kirim</span>
        <span class="font-medium text-[#3b2416]">{{ formatRupiah(shipping) }}</span>
      </div>

      <div class="flex justify-between border-t border-[#eadfd3] pt-3">
        <span class="font-bold text-[#3b2416]">Total Pembayaran</span>
        <span class="text-lg font-bold text-[#795238]">{{ formatRupiah(calculatedTotal) }}</span>
      </div>
    </div>
  </div>
</template>
