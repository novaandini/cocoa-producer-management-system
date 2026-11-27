
<script setup>
import { computed, ref } from 'vue'
import CustomerSidebar from '../../components/customer/CustomerSidebar.vue'
import CustomerHeader from '../../components/customer/CustomerHeader.vue'
import PaymentStatusBadge from '../../components/customer/PaymentStatusBadge.vue'

const selectedStatus = ref('Semua')
const statuses = ['Semua', 'Paid', 'Pending', 'Expired', 'Failed', 'Refund']

const transactions = [
  { id: 'TRX-001', order: 'ORD-2026-001', date: '25 Nov 2026', method: 'Transfer Bank', amount: 'Rp2.525.000', status: 'Paid' },
  { id: 'TRX-002', order: 'ORD-2026-002', date: '24 Nov 2026', method: 'QRIS', amount: 'Rp1.825.000', status: 'Pending' },
  { id: 'TRX-003', order: 'ORD-2026-003', date: '20 Nov 2026', method: 'Virtual Account', amount: 'Rp3.025.000', status: 'Paid' },
  { id: 'TRX-004', order: 'ORD-2026-004', date: '18 Nov 2026', method: 'QRIS', amount: 'Rp925.000', status: 'Expired' }
]

const filteredTransactions = computed(() => {
  if (selectedStatus.value === 'Semua') return transactions
  return transactions.filter(item => item.status === selectedStatus.value)
})
</script>

<template>
  <div class="min-h-screen bg-[#fffdf9] md:flex">
    <CustomerSidebar active-menu="transactions" />

    <main class="min-w-0 flex-1">
      <CustomerHeader />

      <div class="space-y-6 p-5 sm:p-8">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[2px] text-[#a16b43]">Catatan Pembayaran</p>
          <h2 class="mt-2 font-[Georgia,serif] text-2xl font-bold text-[#3b2416]">Riwayat Transaksi</h2>
          <p class="mt-2 text-xs text-[#82766c]">Periksa seluruh transaksi pembayaran pesanan kamu.</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="status in statuses"
            :key="status"
            @click="selectedStatus = status"
            class="rounded-lg px-4 py-2.5 text-xs font-semibold"
            :class="selectedStatus === status ? 'bg-[#3b2416] text-white' : 'border border-[#eadfd3] text-[#795238] hover:bg-[#f4ede4]'"
          >{{ status }}</button>
        </div>

        <section class="overflow-hidden rounded-xl border border-[#eadfd3] bg-white">
          <div class="border-b border-[#eadfd3] p-5">
            <h3 class="font-[Georgia,serif] text-lg font-bold text-[#3b2416]">Daftar Transaksi</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-175 text-left">
              <thead class="bg-[#faf6f1] text-[10px] uppercase tracking-wider text-[#82766c]">
                <tr>
                  <th class="px-5 py-4">ID Transaksi</th>
                  <th class="px-5 py-4">Nomor Pesanan</th>
                  <th class="px-5 py-4">Tanggal</th>
                  <th class="px-5 py-4">Metode</th>
                  <th class="px-5 py-4">Jumlah</th>
                  <th class="px-5 py-4">Status</th>
                  <th class="px-5 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="trx in filteredTransactions" :key="trx.id" class="border-t border-[#f0e8df] text-xs">
                  <td class="px-5 py-4 font-bold text-[#795238]">{{ trx.id }}</td>
                  <td class="px-5 py-4 text-[#3b2416]">{{ trx.order }}</td>
                  <td class="px-5 py-4 text-[#82766c]">{{ trx.date }}</td>
                  <td class="px-5 py-4 text-[#3b2416]">{{ trx.method }}</td>
                  <td class="px-5 py-4 font-semibold text-[#3b2416]">{{ trx.amount }}</td>
                  <td class="px-5 py-4"><PaymentStatusBadge :status="trx.status" /></td>
                  <td class="px-5 py-4"><a href="/customer/order-detail" class="font-bold text-[#98633e] hover:underline">Lihat</a></td>
                </tr>
                <tr v-if="filteredTransactions.length === 0">
                  <td colspan="7" class="px-5 py-10 text-center text-xs text-[#82766c]">Tidak ada transaksi pada status ini.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
