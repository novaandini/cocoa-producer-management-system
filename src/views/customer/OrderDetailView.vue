
<script setup>
import CustomerSidebar from '../../components/customer/CustomerSidebar.vue'
import CustomerHeader from '../../components/customer/CustomerHeader.vue'
import OrderStatusBadge from '../../components/customer/OrderStatusBadge.vue'
import PaymentStatusBadge from '../../components/customer/PaymentStatusBadge.vue'
import OrderTimeline from '../../components/customer/OrderTimeline.vue'
import OrderSummaryCard from '../../components/customer/OrderSummaryCard.vue'

const order = {
  id: 'ORD-2026-001',
  date: '25 November 2026',
  status: 'Diproses',
  payment: 'Paid',
  product: 'Cocoa Bean Grade A',
  grade: 'A',
  batch: 'BATCH-KK-001',
  weight: '50 kg',
  price: 'Rp50.000/kg',
  subtotal: 'Rp2.500.000',
  shipping: 'Rp25.000',
  total: 'Rp2.525.000',
  courier: 'JNE Cargo',
  tracking: 'JNE123456789',
  address: 'Jl. Raya Denpasar, Bali',
  note: 'Mohon hubungi penerima sebelum pengiriman.'
}

const timeline = [
  { title: 'Pesanan Dibuat', description: 'Pesanan berhasil dibuat oleh customer.', date: '25 November 2026', done: true },
  { title: 'Pembayaran Dikonfirmasi', description: 'Pembayaran telah diterima.', date: '25 November 2026', done: true },
  { title: 'Pesanan Diproses', description: 'Produk sedang disiapkan oleh penjual.', date: '26 November 2026', done: true },
  { title: 'Pesanan Dikirim', description: 'Menunggu proses pengiriman.', done: false },
  { title: 'Pesanan Selesai', description: 'Pesanan diterima oleh customer.', done: false }
]
</script>

<template>
  <div class="min-h-screen bg-[#fffdf9] md:flex">
    <CustomerSidebar active-menu="orders" />

    <main class="min-w-0 flex-1">
      <CustomerHeader />

      <div class="space-y-6 p-5 sm:p-8">
        <div>
          <a href="/customer/orders" class="text-xs font-semibold text-[#98633e] hover:underline">← Kembali ke Pesanan</a>
          <h2 class="mt-3 font-[Georgia,serif] text-2xl font-bold text-[#3b2416]">Detail Pesanan</h2>
          <p class="mt-1 text-xs text-[#82766c]">{{ order.id }} · {{ order.date }}</p>
        </div>

        <section class="rounded-xl border border-[#eadfd3] bg-white p-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-xs text-[#82766c]">Status Pesanan</p>
              <div class="mt-2"><OrderStatusBadge :status="order.status" /></div>
            </div>
            <div>
              <p class="text-xs text-[#82766c]">Status Pembayaran</p>
              <div class="mt-2"><PaymentStatusBadge :status="order.payment" /></div>
            </div>
          </div>
        </section>

        <div class="grid gap-6 xl:grid-cols-3">
          <div class="space-y-6 xl:col-span-2">
            <section class="rounded-xl border border-[#eadfd3] bg-white p-5">
              <h3 class="font-[Georgia,serif] text-lg font-bold text-[#3b2416]">Informasi Produk</h3>
              <div class="mt-5 flex flex-wrap justify-between gap-4">
                <div>
                  <p class="text-sm font-bold text-[#3b2416]">{{ order.product }}</p>
                  <p class="mt-1 text-xs text-[#82766c]">Grade {{ order.grade }} · {{ order.batch }}</p>
                </div>
                <p class="text-sm font-bold text-[#795238]">{{ order.weight }}</p>
              </div>
              <div class="mt-5 border-t border-[#eadfd3] pt-4 text-xs text-[#82766c]">
                Harga produk: {{ order.price }}
              </div>
            </section>

            <section class="rounded-xl border border-[#eadfd3] bg-white p-5">
              <h3 class="mb-5 font-[Georgia,serif] text-lg font-bold text-[#3b2416]">Informasi Pengiriman</h3>
              <div class="grid gap-4 text-xs sm:grid-cols-2">
                <div><p class="text-[#82766c]">Kurir</p><p class="mt-1 font-semibold text-[#3b2416]">{{ order.courier }}</p></div>
                <div><p class="text-[#82766c]">Nomor Resi</p><p class="mt-1 font-semibold text-[#3b2416]">{{ order.tracking }}</p></div>
                <div class="sm:col-span-2"><p class="text-[#82766c]">Alamat Tujuan</p><p class="mt-1 font-semibold text-[#3b2416]">{{ order.address }}</p></div>
              </div>
            </section>

            <section class="rounded-xl border border-[#eadfd3] bg-white p-5">
              <h3 class="mb-5 font-[Georgia,serif] text-lg font-bold text-[#3b2416]">Riwayat Pesanan</h3>
              <OrderTimeline :steps="timeline" />
            </section>
          </div>

          <div class="space-y-5">
            <OrderSummaryCard :order="order" />
            <section class="rounded-xl border border-[#eadfd3] bg-white p-5">
              <h3 class="font-[Georgia,serif] font-bold text-[#3b2416]">Catatan Pesanan</h3>
              <p class="mt-3 text-xs leading-6 text-[#82766c]">{{ order.note }}</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
