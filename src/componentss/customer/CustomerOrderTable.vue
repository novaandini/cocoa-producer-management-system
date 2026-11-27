
<script setup>
import OrderStatusBadge from './OrderStatusBadge.vue'
import PaymentStatusBadge from './PaymentStatusBadge.vue'

defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-175 text-left">
      <thead>
        <tr class="border-b border-[#eadfd3] bg-[#faf6f1] text-[10px] uppercase tracking-wider text-[#82766c]">
          <th class="px-4 py-4">Nomor Pesanan</th>
          <th class="px-4 py-4">Tanggal</th>
          <th class="px-4 py-4">Produk</th>
          <th class="px-4 py-4">Total</th>
          <th class="px-4 py-4">Status</th>
          <th class="px-4 py-4">Pembayaran</th>
          <th class="px-4 py-4">Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in orders" :key="order.id" class="border-b border-[#f0e8df] text-xs">
          <td class="px-4 py-4 font-bold text-[#795238]">{{ order.id }}</td>
          <td class="px-4 py-4 text-[#82766c]">{{ order.date }}</td>
          <td class="px-4 py-4 text-[#3b2416]">{{ order.product }}</td>
          <td class="px-4 py-4 font-semibold text-[#3b2416]">{{ order.total }}</td>
          <td class="px-4 py-4"><OrderStatusBadge :status="order.status" /></td>
          <td class="px-4 py-4"><PaymentStatusBadge :status="order.payment" /></td>
          <td class="px-4 py-4">
            <a href="/customer/order-detail" class="font-bold text-[#98633e] hover:underline">
              Detail
            </a>
          </td>
        </tr>

        <tr v-if="orders.length === 0">
          <td colspan="7" class="px-4 py-10 text-center text-xs text-[#82766c]">
            Belum ada pesanan.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
