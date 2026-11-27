
<script setup>
import { computed, ref } from 'vue'
import CustomerSidebar from '../../components/customer/CustomerSidebar.vue'
import CustomerHeader from '../../components/customer/CustomerHeader.vue'
import OrderStatusBadge from '../../components/customer/OrderStatusBadge.vue'
import PaymentStatusBadge from '../../components/customer/PaymentStatusBadge.vue'

const activeTab = ref('Semua')
const tabs = ['Semua', 'Menunggu Pembayaran', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan']

const orders = [
  { id: 'ORD-2026-001', date: '25 Nov 2026', product: 'Cocoa Bean Grade A', grade: 'A', weight: '50 kg', total: 'Rp2.500.000', status: 'Diproses', payment: 'Paid' },
  { id: 'ORD-2026-002', date: '24 Nov 2026', product: 'Cocoa Bean Grade B', grade: 'B', weight: '40 kg', total: 'Rp1.800.000', status: 'Menunggu Pembayaran', payment: 'Pending' },
  { id: 'ORD-2026-003', date: '20 Nov 2026', product: 'Cocoa Bean Grade A', grade: 'A', weight: '60 kg', total: 'Rp3.000.000', status: 'Selesai', payment: 'Paid' },
  { id: 'ORD-2026-004', date: '18 Nov 2026', product: 'Cocoa Bean Grade C', grade: 'C', weight: '25 kg', total: 'Rp900.000', status: 'Dikirim', payment: 'Paid' }
]

const filteredOrders = computed(() => {
  if (activeTab.value === 'Semua') return orders
  return orders.filter(order => order.status === activeTab.value)
})
</script>

<template>
  <div class="min-h-screen bg-[#fffdf9] md:flex">
    <CustomerSidebar active-menu="orders" />

    <main class="min-w-0 flex-1">
      <CustomerHeader />

      <div class="space-y-6 p-5 sm:p-8">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[2px] text-[#a16b43]">Aktivitas Pembelian</p>
          <h2 class="mt-2 font-[Georgia,serif] text-2xl font-bold text-[#3b2416]">Pesanan Saya</h2>
          <p class="mt-2 text-xs text-[#82766c]">Lihat dan pantau seluruh pesanan produk kakao kamu.</p>
        </div>

        <div class="flex gap-2 overflow-x-auto border-b border-[#eadfd3] pb-3">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition"
            :class="activeTab === tab ? 'bg-[#3b2416] text-white' : 'text-[#82766c] hover:bg-[#f4ede4]'"
          >
            {{ tab }}
          </button>
        </div>

        <div v-if="filteredOrders.length" class="space-y-4">
          <article v-for="order in filteredOrders" :key="order.id" class="rounded-xl border border-[#eadfd3] bg-white p-5">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e8df] pb-4">
              <div>
                <p class="text-xs font-bold text-[#795238]">{{ order.id }}</p>
                <p class="mt-1 text-[11px] text-[#82766c]">{{ order.date }}</p>
              </div>
              <OrderStatusBadge :status="order.status" />
            </div>

            <div class="flex flex-wrap items-center justify-between gap-4 py-4">
              <div>
                <h3 class="text-sm font-bold text-[#3b2416]">{{ order.product }}</h3>
                <p class="mt-1 text-xs text-[#82766c]">Grade {{ order.grade }} · {{ order.weight }}</p>
                <div class="mt-2"><PaymentStatusBadge :status="order.payment" /></div>
              </div>
              <div class="text-left sm:text-right">
                <p class="text-[10px] text-[#82766c]">Total Pembayaran</p>
                <p class="mt-1 font-bold text-[#795238]">{{ order.total }}</p>
              </div>
            </div>

            <div class="flex justify-end border-t border-[#f0e8df] pt-4">
              <a
                v-if="order.payment === 'Pending'"
                href="/payment"
                class="rounded-lg bg-[#795238] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#3b2416]"
              >Bayar Sekarang</a>
              <a
                v-else
                href="/customer/order-detail"
                class="rounded-lg border border-[#eadfd3] px-4 py-2.5 text-xs font-bold text-[#795238] hover:bg-[#f4ede4]"
              >Lacak & Detail</a>
            </div>
          </article>
        </div>

        <div v-else class="rounded-xl border border-[#eadfd3] bg-white py-16 text-center">
          <p class="font-[Georgia,serif] text-lg font-bold text-[#3b2416]">Belum Ada Pesanan</p>
          <p class="mt-2 text-xs text-[#82766c]">Tidak ada pesanan pada kategori ini.</p>
          <a href="/products" class="mt-5 inline-block rounded-lg bg-[#795238] px-5 py-3 text-xs font-bold text-white">Lihat Produk</a>
        </div>
      </div>
    </main>
  </div>
</template>
