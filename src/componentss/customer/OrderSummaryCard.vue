
<script setup>
defineProps({
  order: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="rounded-xl border border-[#eadfd3] bg-white p-5">
    <h3 class="font-[Georgia,serif] text-lg font-bold text-[#3b2416]">
      Ringkasan Pesanan
    </h3>

    <div class="mt-5 space-y-3 text-xs">
      <div class="flex justify-between gap-3">
        <span class="text-[#82766c]">Nomor Pesanan</span>
        <span class="font-semibold text-[#3b2416]">{{ order.id }}</span>
      </div>
      <div class="flex justify-between gap-3">
        <span class="text-[#82766c]">Tanggal</span>
        <span class="text-[#3b2416]">{{ order.date }}</span>
      </div>
      <div class="flex justify-between gap-3">
        <span class="text-[#82766c]">Subtotal Produk</span>
        <span class="text-[#3b2416]">{{ order.subtotal }}</span>
      </div>
      <div class="flex justify-between gap-3">
        <span class="text-[#82766c]">Ongkos Kirim</span>
        <span class="text-[#3b2416]">{{ order.shipping }}</span>
      </div>
      <div class="border-t border-[#eadfd3] pt-4">
        <div class="flex justify-between gap-3">
          <span class="font-bold text-[#3b2416]">Total Pembayaran</span>
          <span class="font-bold text-[#795238]">{{ order.total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
