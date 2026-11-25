
<script setup>
import { computed, ref, watch } from 'vue'

// Data contoh. Belum terhubung ke Laravel / verifikasi pembayaran.
const STORAGE_KEY = 'kakao_demo_orders'

const initialOrders = [
  { id: 'ORD-001', customer: 'Customer 01', product: 'Cocoa Bean A', date: '12-10-2026', total: 250000, status: 'Diproses' },
  { id: 'ORD-002', customer: 'Customer 02', product: 'Cocoa Bean B', date: '13-10-2026', total: 450000, status: 'Selesai' },
  { id: 'ORD-003', customer: 'Customer 03', product: 'Cocoa Bean C', date: '14-10-2026', total: 350000, status: 'Menunggu Pembayaran' },
  { id: 'ORD-004', customer: 'Customer 04', product: 'Cocoa Bean D', date: '14-10-2026', total: 500000, status: 'Diproses' },
  { id: 'ORD-005', customer: 'Customer 05', product: 'Cocoa Bean E', date: '14-10-2026', total: 300000, status: 'Dibatalkan' }
]

const statusOptions = [
  'Menunggu Pembayaran',
  'Diproses',
  'Dikirim',
  'Selesai',
  'Dibatalkan'
]

const searchOrder = ref('')
const statusFilter = ref('')
const storageNotice = ref('')
const notice = ref('')

function readOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (raw === null) {
      return initialOrders.map(order => ({ ...order }))
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      throw new Error('Format penyimpanan tidak sesuai')
    }

    return parsed
  } catch {
    storageNotice.value =
      'Data demo di browser tidak dapat dibaca. Menampilkan data awal.'

    return initialOrders.map(order => ({ ...order }))
  }
}

const orders = ref(readOrders())

const stats = computed(() => [
  {
    label: 'Total Pesanan',
    value: orders.value.length
  },
  {
    label: 'Menunggu Pembayaran',
    value: orders.value.filter(
      order => order.status === 'Menunggu Pembayaran'
    ).length
  },
  {
    label: 'Sedang Diproses',
    value: orders.value.filter(
      order => order.status === 'Diproses'
    ).length
  },
  {
    label: 'Pesanan Selesai',
    value: orders.value.filter(
      order => order.status === 'Selesai'
    ).length
  }
])

const filteredOrders = computed(() => {
  const keyword = searchOrder.value.trim().toLocaleLowerCase('id-ID')

  return orders.value.filter(order => {
    const text = [
      order.id,
      order.customer,
      order.product,
      order.date,
      formatRupiah(order.total)
    ]
      .join(' ')
      .toLocaleLowerCase('id-ID')

    return text.includes(keyword) &&
      (!statusFilter.value || order.status === statusFilter.value)
  })
})

function formatRupiah(amount) {
  return 'Rp ' + new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0
  }).format(Number(amount) || 0)
}

function statusClass(status) {
  return {
    'Menunggu Pembayaran': 'pending',
    Diproses: 'process',
    Dikirim: 'shipped',
    Selesai: 'done',
    Dibatalkan: 'cancelled'
  }[status] || 'pending'
}

function changeStatus(order) {
  notice.value =
    `Status ${order.id} diperbarui menjadi ${order.status} (simulasi).`
}

// Perubahan hanya disimpan di browser ini.
watch(
  orders,
  currentOrders => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(currentOrders)
      )

      storageNotice.value = ''
    } catch {
      storageNotice.value =
        'Status berubah di layar, tetapi gagal disimpan di browser.'
    }
  },
  { deep: true }
)

function notReady(feature) {
  notice.value = `Halaman ${feature} belum dipindahkan ke Vue.js.`
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f7f5] text-gray-800">

    <div class="min-h-screen md:flex">

      <!-- Sidebar -->
      <aside class="hidden w-64 shrink-0 flex-col bg-[#173f35] text-white md:flex">
        <div class="border-b border-white/10 px-7 py-6">
          <a href="/" class="text-2xl font-bold tracking-wide">
            KAKAO
          </a>

          <p class="mt-2 text-xs leading-5 tracking-wide text-white/70">
            SISTEM INFORMASI<br />
            PRODUSEN KAKAO
          </p>
        </div>

        <nav class="flex-1 space-y-2 px-4 py-6" aria-label="Navigasi Admin">
          <a
            href="/admin/dashboard"
            class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </a>

          <a
            href="/admin/customers"
            class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            Pelanggan
          </a>

          <a
            href="/admin/products"
            class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            Produk
          </a>

          <a
            href="/admin/orders"
            aria-current="page"
            class="block rounded-lg bg-[#d5a85b] px-4 py-3 text-sm font-semibold text-[#173f35]"
          >
            Pesanan
          </a>

          <a
            href="/admin/payments"
            class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            Pembayaran
          </a>

          <a
            href="/admin/shipping"
            class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            Pengiriman
          </a>
        </nav>
      </aside>

      <!-- Main content -->
      <div class="min-w-0 flex-1">

        <!-- Topbar -->
        <header class="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-8">
          <div>
            <p class="text-xs font-semibold tracking-widest text-gray-400">
              AREA ADMIN
            </p>

            <h1 class="mt-1 text-xl font-semibold text-gray-800">
              Pesanan
            </h1>
          </div>

          <div class="text-right">
            <p class="text-sm font-semibold text-gray-800">
              Admin KAKAO
            </p>

            <p class="mt-1 text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </header>

        <!-- Notifications -->
        <div class="space-y-3 px-4 pt-5 sm:px-8">
          <div
            v-if="notice"
            class="flex items-start justify-between gap-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700"
            role="status"
          >
            <p>{{ notice }}</p>

            <button
              type="button"
              aria-label="Tutup pemberitahuan"
              class="shrink-0 text-lg leading-none"
              @click="notice = ''"
            >
              ×
            </button>
          </div>

          <p
            v-if="storageNotice"
            class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
            role="alert"
          >
            {{ storageNotice }}
          </p>
        </div>

        <main class="space-y-6 px-4 py-6 sm:px-8 sm:py-8">

          <!-- Statistics -->
          <section
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Statistik pesanan"
          >
            <div
              v-for="(item, index) in stats"
              :key="item.label"
              class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <p class="text-sm text-gray-500">
                {{ item.label }}
              </p>

              <h3
                class="mt-3 text-2xl font-bold"
                :class="index === 3 ? 'text-[#28634f]' : 'text-gray-800'"
              >
                {{ item.value }}
              </h3>
            </div>
          </section>

          <!-- Orders panel -->
          <section class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

            <!-- Panel heading -->
            <div class="flex flex-col gap-4 border-b border-gray-100 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p class="text-xs font-semibold tracking-widest text-gray-400">
                  DATA TRANSAKSI
                </p>

                <h2 class="mt-2 text-xl font-bold text-gray-800">
                  Daftar Pesanan
                </h2>
              </div>

              <a
                href="/admin/dashboard"
                class="text-sm font-medium text-[#28634f] transition hover:text-[#173f35]"
              >
                ← Kembali ke Dashboard
              </a>
            </div>

            <!-- Search and filter -->
            <div class="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:px-7">

              <label class="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 transition focus-within:border-[#28634f] focus-within:ring-2 focus-within:ring-[#28634f]/10">
                <span class="text-gray-400" aria-hidden="true">
                  ⌕
                </span>

                <input
                  id="searchOrder"
                  v-model="searchOrder"
                  type="search"
                  placeholder="Cari ID, customer, atau produk..."
                  aria-label="Cari pesanan"
                  class="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </label>

              <select
                id="statusFilter"
                v-model="statusFilter"
                aria-label="Filter status"
                class="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#28634f] sm:min-w-52"
              >
                <option value="">Semua Status</option>

                <option
                  v-for="status in statusOptions"
                  :key="status"
                  :value="status"
                >
                  {{ status }}
                </option>
              </select>
            </div>

            <!-- Orders table -->
            <div class="overflow-x-auto">
              <table class="w-full min-w-[850px] text-left">
                <thead class="bg-[#f8faf8]">
                  <tr class="border-y border-gray-100 text-xs font-semibold tracking-wide text-gray-500">
                    <th class="px-5 py-4 sm:px-7">
                      ID PESANAN
                    </th>

                    <th class="px-5 py-4">
                      CUSTOMER
                    </th>

                    <th class="px-5 py-4">
                      PRODUK
                    </th>

                    <th class="px-5 py-4">
                      TANGGAL
                    </th>

                    <th class="px-5 py-4">
                      TOTAL
                    </th>

                    <th class="px-5 py-4">
                      STATUS PESANAN
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="order in filteredOrders"
                    :key="order.id"
                    class="border-b border-gray-100 transition hover:bg-gray-50/70"
                  >
                    <td class="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#28634f] sm:px-7">
                      {{ order.id }}
                    </td>

                    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                      {{ order.customer }}
                    </td>

                    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                      {{ order.product }}
                    </td>

                    <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                      {{ order.date }}
                    </td>

                    <td class="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-700">
                      {{ formatRupiah(order.total) }}
                    </td>

                    <td class="px-5 py-4">
                      <select
                        v-model="order.status"
                        class="w-full min-w-48 rounded-lg border px-3 py-2 text-xs font-medium outline-none transition focus:ring-2 focus:ring-[#28634f]/10"
                        :class="{
                          'border-yellow-200 bg-yellow-50 text-yellow-700': statusClass(order.status) === 'pending',
                          'border-blue-200 bg-blue-50 text-blue-700': statusClass(order.status) === 'process',
                          'border-purple-200 bg-purple-50 text-purple-700': statusClass(order.status) === 'shipped',
                          'border-green-200 bg-green-50 text-green-700': statusClass(order.status) === 'done',
                          'border-red-200 bg-red-50 text-red-700': statusClass(order.status) === 'cancelled'
                        }"
                        :aria-label="`Ubah status pesanan ${order.id}`"
                        @change="changeStatus(order)"
                      >
                        <option
                          v-for="status in statusOptions"
                          :key="status"
                          :value="status"
                        >
                          {{ status }}
                        </option>
                      </select>
                    </td>
                  </tr>

                  <tr v-if="filteredOrders.length === 0">
                    <td
                      colspan="6"
                      class="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      Tidak ada pesanan yang sesuai.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Demo note -->
            <div class="border-t border-gray-100 bg-gray-50 px-5 py-4 sm:px-7">
              <p class="text-xs leading-5 text-gray-500">
                Data dan perubahan status hanya simulasi di browser, belum terhubung ke Laravel atau verifikasi pembayaran.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-white">

      <div class="grid grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-2">

        <!-- Brand -->
        <div class="max-w-md">
          <a href="/" class="text-2xl font-bold tracking-wide text-[#28634f]">
            KAKAO
          </a>

          <p class="mt-3 text-sm leading-6 text-gray-500">
            Sistem informasi untuk membantu pengelolaan penjualan kakao secara terstruktur, transparan, dan mudah dipantau.
          </p>
        </div>

        <!-- Footer links -->
        <div class="grid grid-cols-2 gap-6 sm:grid-cols-3">

          <div>
            <h4 class="mb-3 text-sm font-semibold text-gray-800">
              Menu
            </h4>

            <div class="space-y-2">
              <a href="/admin/dashboard" class="block text-sm text-gray-500 transition hover:text-[#28634f]">
                Dashboard
              </a>

              <a href="/admin/products" class="block text-sm text-gray-500 transition hover:text-[#28634f]">
                Produk
              </a>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-sm font-semibold text-gray-800">
              Admin
            </h4>

            <div class="space-y-2">
              <a href="/admin/products/form" class="block text-sm text-gray-500 transition hover:text-[#28634f]">
                Tambah Produk
              </a>

              <a href="/admin/orders" class="block text-sm text-gray-500 transition hover:text-[#28634f]">
                Pesanan
              </a>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-sm font-semibold text-gray-800">
              Informasi
            </h4>

            <p class="text-sm text-gray-500">
              Indonesia
            </p>

            <p class="mt-2 break-all text-sm text-gray-500">
              info@kakao.com
            </p>
          </div>
        </div>
      </div>

      <!-- Footer bottom -->
      <div class="flex flex-col gap-2 border-t border-gray-100 px-5 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 KAKAO</p>
        <p>Sistem Informasi Manajemen Produsen Kakao</p>
      </div>
    </footer>

  </div>
</template>
