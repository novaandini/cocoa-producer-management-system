
<script setup>
import CustomerSidebar from '../../components/customer/CustomerSidebar.vue'
import CustomerHeader from '../../components/customer/CustomerHeader.vue'
import CustomerStatCard from '../../components/customer/CustomerStatCard.vue'

const orders = [
  {
    id: 'ORD-2026-001',
    date: '25 Nov 2026',
    product: 'Cocoa Bean Grade A',
    total: 'Rp2.500.000',
    status: 'Diproses',
    payment: 'Paid'
  },
  {
    id: 'ORD-2026-002',
    date: '24 Nov 2026',
    product: 'Cocoa Bean Grade B',
    total: 'Rp1.800.000',
    status: 'Menunggu Pembayaran',
    payment: 'Pending'
  },
  {
    id: 'ORD-2026-003',
    date: '20 Nov 2026',
    product: 'Cocoa Bean Grade A',
    total: 'Rp3.000.000',
    status: 'Selesai',
    payment: 'Paid'
  }
]

function orderStatusClass(status) {
  const styles = {
    'Menunggu Pembayaran': 'bg-amber-50 text-amber-700',
    'Diproses': 'bg-blue-50 text-blue-700',
    'Dikirim': 'bg-violet-50 text-violet-700',
    'Selesai': 'bg-green-50 text-green-700',
    'Dibatalkan': 'bg-red-50 text-red-700'
  }

  return styles[status] || 'bg-gray-100 text-gray-600'
}

function paymentStatusClass(status) {
  const styles = {
    'Paid': 'bg-green-50 text-green-700',
    'Pending': 'bg-amber-50 text-amber-700',
    'Expired': 'bg-red-50 text-red-700',
    'Failed': 'bg-red-50 text-red-700',
    'Refund': 'bg-blue-50 text-blue-700'
  }

  return styles[status] || 'bg-gray-100 text-gray-600'
}
</script>

<template>
  <div class="min-h-screen bg-[#fffdf9] md:flex">

    <!-- SIDEBAR -->
    <CustomerSidebar active-menu="dashboard" />

    <!-- MAIN CONTENT -->
    <main class="min-w-0 flex-1">

      <!-- HEADER -->
      <CustomerHeader />

      <div class="space-y-8 p-5 sm:p-8">

        <!-- PAGE TITLE -->
        <div>
          <p class="text-xs font-semibold uppercase tracking-[2px] text-[#a16b43]">
            Ringkasan Akun
          </p>

          <h2 class="mt-2 font-[Georgia,serif] text-2xl font-bold text-[#3b2416]">
            Dashboard Customer
          </h2>

          <p class="mt-2 text-xs text-[#82766c]">
            Pantau pesanan dan aktivitas pembelian produk kakao kamu.
          </p>
        </div>

        <!-- STATISTICS -->
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

          <CustomerStatCard
            title="Pesanan Aktif"
            :value="2"
            description="Pesanan sedang berjalan"
            icon="▤"
          />

          <CustomerStatCard
            title="Menunggu Pembayaran"
            :value="1"
            description="Segera selesaikan pembayaran"
            icon="◷"
          />

          <CustomerStatCard
            title="Pesanan Selesai"
            :value="1"
            description="Pesanan berhasil diterima"
            icon="✓"
          />

        </div>

        <!-- LATEST ORDERS -->
        <section class="overflow-hidden rounded-xl border border-[#eadfd3] bg-white">

          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#eadfd3] p-5">

            <div>
              <h3 class="font-[Georgia,serif] text-lg font-bold text-[#3b2416]">
                Pesanan Terbaru
              </h3>

              <p class="mt-1 text-xs text-[#82766c]">
                Daftar aktivitas pesanan terakhir kamu.
              </p>
            </div>

            <a
              href="/customer/orders"
              class="text-xs font-bold text-[#98633e] hover:underline"
            >
              Lihat Semua →
            </a>

          </div>

          <!-- TABLE -->
          <div class="overflow-x-auto">

            <table class="w-full min-w-212.5 text-left text-xs">

              <thead class="bg-[#f8f3ed] text-[#795238]">
                <tr>
                  <th class="px-5 py-4 font-bold">Nomor Pesanan</th>
                  <th class="px-5 py-4 font-bold">Tanggal</th>
                  <th class="px-5 py-4 font-bold">Produk</th>
                  <th class="px-5 py-4 font-bold">Total</th>
                  <th class="px-5 py-4 font-bold">Status Pesanan</th>
                  <th class="px-5 py-4 font-bold">Pembayaran</th>
                  <th class="px-5 py-4 text-center font-bold">Aksi</th>
                </tr>
              </thead>

              <tbody>

                <tr
                  v-for="order in orders"
                  :key="order.id"
                  class="border-t border-[#f0e8df] transition hover:bg-[#fffdf9]"
                >

                  <td class="whitespace-nowrap px-5 py-5 font-bold text-[#3b2416]">
                    {{ order.id }}
                  </td>

                  <td class="whitespace-nowrap px-5 py-5 text-[#82766c]">
                    {{ order.date }}
                  </td>

                  <td class="px-5 py-5 font-medium text-[#3b2416]">
                    {{ order.product }}
                  </td>

                  <td class="whitespace-nowrap px-5 py-5 font-semibold text-[#3b2416]">
                    {{ order.total }}
                  </td>

                  <td class="px-5 py-5">
                    <span
                      class="inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-bold"
                      :class="orderStatusClass(order.status)"
                    >
                      {{ order.status }}
                    </span>
                  </td>

                  <td class="px-5 py-5">
                    <span
                      class="inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold"
                      :class="paymentStatusClass(order.payment)"
                    >
                      {{ order.payment }}
                    </span>
                  </td>

                  <td class="px-5 py-5 text-center">
                    <a
                      href="/customer/order-detail"
                      class="whitespace-nowrap font-bold text-[#98633e] hover:underline"
                    >
                      Detail
                    </a>
                  </td>

                </tr>

                <tr v-if="orders.length === 0">
                  <td colspan="7" class="px-5 py-10 text-center text-[#82766c]">
                    Belum ada pesanan.
                  </td>
                </tr>

              </tbody>

            </table>

          </div>
        </section>

      </div>
    </main>
  </div>
</template>
