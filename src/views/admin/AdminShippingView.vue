
<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// Data contoh pengiriman
const seedShipments = [
  { id: 'SHP001', order_id: 'ORD001', customer_name: 'Budi Santoso', origin: 'Jembrana, Bali', destination: 'Denpasar, Bali', courier: 'JNE', service: 'REG', tracking_number: 'JNE202610140001', shipping_cost: 25000, weight: 10, status: 'delivered', shipped_date: '2026-10-01', estimated_delivery: '2026-10-03' },
  { id: 'SHP002', order_id: 'ORD002', customer_name: 'Sari Dewi', origin: 'Jembrana, Bali', destination: 'Surabaya, Jawa Timur', courier: 'JNE', service: 'YES', tracking_number: 'JNE202610140002', shipping_cost: 45000, weight: 15, status: 'in_transit', shipped_date: '2026-10-12', estimated_delivery: '2026-10-14' },
  { id: 'SHP003', order_id: 'ORD003', customer_name: 'Andi Pratama', origin: 'Jembrana, Bali', destination: 'Jakarta Selatan, DKI Jakarta', courier: 'JNE', service: 'REG', tracking_number: 'JNE202610140003', shipping_cost: 65000, weight: 20, status: 'shipped', shipped_date: '2026-10-13', estimated_delivery: '2026-10-17' },
  { id: 'SHP004', order_id: 'ORD004', customer_name: 'Made Adnyana', origin: 'Jembrana, Bali', destination: 'Bandung, Jawa Barat', courier: 'JNE', service: 'REG', tracking_number: 'JNE202610140004', shipping_cost: 55000, weight: 12, status: 'processing', shipped_date: null, estimated_delivery: null },
  { id: 'SHP005', order_id: 'ORD005', customer_name: 'Putri Maharani', origin: 'Jembrana, Bali', destination: 'Yogyakarta, DI Yogyakarta', courier: 'JNE', service: 'YES', tracking_number: 'JNE202610140005', shipping_cost: 50000, weight: 8, status: 'delivered', shipped_date: '2026-10-08', estimated_delivery: '2026-10-09' },
  { id: 'SHP006', order_id: 'ORD006', customer_name: 'Agus Setiawan', origin: 'Jembrana, Bali', destination: 'Malang, Jawa Timur', courier: 'JNE', service: 'REG', tracking_number: 'JNE202610140006', shipping_cost: 40000, weight: 18, status: 'in_transit', shipped_date: '2026-10-13', estimated_delivery: '2026-10-16' },
  { id: 'SHP007', order_id: 'ORD007', customer_name: 'Dewi Lestari', origin: 'Jembrana, Bali', destination: 'Makassar, Sulawesi Selatan', courier: 'JNE', service: 'REG', tracking_number: 'JNE202610140007', shipping_cost: 85000, weight: 25, status: 'shipped', shipped_date: '2026-10-12', estimated_delivery: '2026-10-18' },
  { id: 'SHP008', order_id: 'ORD008', customer_name: 'Komang Wirawan', origin: 'Jembrana, Bali', destination: 'Gianyar, Bali', courier: 'JNE', service: 'JTR', tracking_number: 'JNE202610140008', shipping_cost: 120000, weight: 100, status: 'processing', shipped_date: null, estimated_delivery: null },
  { id: 'SHP009', order_id: 'ORD009', customer_name: 'Rina Anggraini', origin: 'Jembrana, Bali', destination: 'Semarang, Jawa Tengah', courier: 'JNE', service: 'REG', tracking_number: 'JNE202610140009', shipping_cost: 60000, weight: 16, status: 'cancelled', shipped_date: null, estimated_delivery: null },
  { id: 'SHP010', order_id: 'ORD010', customer_name: 'Kadek Saputra', origin: 'Jembrana, Bali', destination: 'Denpasar, Bali', courier: 'JNE', service: 'REG', tracking_number: 'JNE202610140010', shipping_cost: 20000, weight: 5, status: 'delivered', shipped_date: '2026-10-10', estimated_delivery: '2026-10-12' },
  { id: 'SHP011', order_id: 'ORD011', customer_name: 'Yoga Permana', origin: 'Jembrana, Bali', destination: 'Tangerang, Banten', courier: 'JNE', service: 'YES', tracking_number: 'JNE202610140011', shipping_cost: 70000, weight: 22, status: 'in_transit', shipped_date: '2026-10-13', estimated_delivery: '2026-10-15' },
  { id: 'SHP012', order_id: 'ORD012', customer_name: 'Budi Santoso', origin: 'Jembrana, Bali', destination: 'Denpasar, Bali', courier: 'JNE', service: 'REG', tracking_number: 'JNE202610140012', shipping_cost: 30000, weight: 10, status: 'pending', shipped_date: null, estimated_delivery: null }
]

const STORAGE_KEY = 'kakao_demo_shipments'
const shipments = ref([])
const search = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const sortColumn = ref('')
const sortDirection = ref('asc')
const selectedShipment = ref(null)
const errorMessage = ref('')

function loadShipments() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedShipments))
      shipments.value = structuredClone(seedShipments)
    } else {
      const parsed = JSON.parse(saved)
      if (!Array.isArray(parsed)) {
        throw new Error('Format data pengiriman tidak sesuai')
      }
      shipments.value = parsed
    }

    errorMessage.value = ''
  } catch (error) {
    console.error(error)
    shipments.value = structuredClone(seedShipments)
    errorMessage.value = 'Data lokal tidak dapat dibaca atau disimpan. Menampilkan data contoh.'
  }
}

const stats = computed(() => [
  { category: 'Jumlah Pengiriman', value: shipments.value.length },
  { category: 'Pengiriman Pending', value: shipments.value.filter(s => s.status === 'pending').length },
  { category: 'Pesanan sedang disiapkan', value: shipments.value.filter(s => s.status === 'processing').length },
  { category: 'Barang sudah diserahkan untuk dikirim', value: shipments.value.filter(s => s.status === 'shipped').length }
])

const filteredShipments = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('id-ID')

  return shipments.value.filter(shipment => [
    shipment.id,
    shipment.order_id,
    shipment.customer_name,
    shipment.tracking_number,
    shipment.shipped_date,
    shipment.estimated_delivery,
    shipment.status,
    shipment.destination,
    shipment.courier
  ].some(value => String(value ?? '').toLocaleLowerCase('id-ID').includes(query)))
})

const sortedShipments = computed(() => {
  const data = [...filteredShipments.value]

  if (!sortColumn.value) return data

  const factor = sortDirection.value === 'asc' ? 1 : -1

  return data.sort((a, b) => {
    const aa = a[sortColumn.value]
    const bb = b[sortColumn.value]

    if (aa == null || aa === '') {
      return bb == null || bb === '' ? 0 : 1
    }

    if (bb == null || bb === '') return -1

    return String(aa).localeCompare(String(bb), 'id', { numeric: true }) * factor
  })
})

const totalItems = computed(() => filteredShipments.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / itemsPerPage.value)))
const startItem = computed(() => totalItems.value === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalItems.value))
const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, index) => index + 1))

const pagedShipments = computed(() => sortedShipments.value.slice(
  (currentPage.value - 1) * itemsPerPage.value,
  currentPage.value * itemsPerPage.value
))

watch([search, itemsPerPage], () => {
  currentPage.value = 1
})

watch(totalPages, total => {
  if (currentPage.value > total) currentPage.value = total
})

function toggleSort(column) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }

  currentPage.value = 1
}

function sortSymbol(column) {
  return sortColumn.value !== column
    ? '↕'
    : sortDirection.value === 'asc'
      ? '↑'
      : '↓'
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function displayDate(date) {
  return date || '-'
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(Number(amount || 0))
}

const statusNames = {
  pending: 'Menunggu',
  processing: 'Disiapkan',
  shipped: 'Dikirim',
  in_transit: 'Dalam Perjalanan',
  delivered: 'Terkirim',
  cancelled: 'Dibatalkan'
}

function shipmentStatus(status) {
  return statusNames[status] || status || '-'
}

function openDetail(shipment) {
  selectedShipment.value = shipment
}

function closeDetail() {
  selectedShipment.value = null
}

function onStorage(event) {
  if (event.key === STORAGE_KEY) loadShipments()
}

function onEscape(event) {
  if (event.key === 'Escape') closeDetail()
}

onMounted(() => {
  loadShipments()
  window.addEventListener('storage', onStorage)
  window.addEventListener('keydown', onEscape)
})

onUnmounted(() => {
  window.removeEventListener('storage', onStorage)
  window.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <div class="min-h-screen bg-[#f7f8f6] font-sans text-[#332116]">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#fffdf9] px-6 py-7 shadow-sm lg:flex">
      <div class="mb-10">
        <a href="/" class="text-2xl font-extrabold tracking-wide text-[#6b4328]">KAKAO</a>
        <p class="mt-2 text-xs leading-5 tracking-wide text-[#8b7766]">
          SISTEM INFORMASI<br>PRODUSEN KAKAO
        </p>
      </div>

      <nav class="flex flex-col gap-2" aria-label="Navigasi Admin">
        <a href="/admin/dashboard" class="rounded-lg px-4 py-3 text-sm font-medium text-[#725d4b] transition hover:bg-[#f3ece3]">Dashboard</a>
        <a href="/admin/customers" class="rounded-lg px-4 py-3 text-sm font-medium text-[#725d4b] transition hover:bg-[#f3ece3]">Pelanggan</a>
        <a href="/admin/products" class="rounded-lg px-4 py-3 text-sm font-medium text-[#725d4b] transition hover:bg-[#f3ece3]">Produk</a>
        <a href="/admin/orders" class="rounded-lg px-4 py-3 text-sm font-medium text-[#725d4b] transition hover:bg-[#f3ece3]">Pesanan</a>
        <a href="/admin/payments" class="rounded-lg px-4 py-3 text-sm font-medium text-[#725d4b] transition hover:bg-[#f3ece3]">Pembayaran</a>
        <a href="/admin/shipping" class="rounded-lg bg-[#6b4328] px-4 py-3 text-sm font-semibold text-white shadow-sm" aria-current="page">Pengiriman</a>
      </nav>
    </aside>

    <div class="min-h-screen lg:ml-64">
      <!-- Topbar -->
      <header class="flex flex-col justify-between gap-4 border-b border-[#eadfd5] bg-[#fffdf9] px-5 py-5 sm:flex-row sm:items-center sm:px-8">
        <div>
          <p class="text-xs font-semibold tracking-[0.18em] text-[#a17c5b]">ADMIN AREA</p>
          <h1 class="mt-1 text-2xl font-bold text-[#332116]">Pengiriman</h1>
        </div>

        <div class="flex flex-col sm:items-end">
          <strong class="text-sm text-[#493321]">Admin KAKAO</strong>
          <span class="mt-1 text-xs text-[#8b7766]">Pengiriman</span>
        </div>
      </header>

      <main class="px-5 py-6 sm:px-8">
        <p class="mb-4 rounded-lg border border-[#ead5b8] bg-[#fff4e8] px-4 py-3 text-sm leading-6 text-[#855b31]" role="note">
          Mode demo frontend — data pengiriman disimpan pada browser ini, belum terhubung ke Laravel.
        </p>

        <p v-if="errorMessage" class="mb-4 rounded-lg border border-[#efcaca] bg-[#fff0f0] px-4 py-3 text-sm text-[#a33c3c]" role="alert">
          {{ errorMessage }}
        </p>

        <!-- Statistik -->
        <section class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Statistik Pengiriman">
          <div v-for="stat in stats" :key="stat.category" class="rounded-xl border border-[#eadfd5] bg-white p-5 shadow-sm">
            <p class="text-sm text-[#8b7766]">{{ stat.category }}</p>
            <h3 class="mt-3 text-2xl font-bold text-[#6b4328]">{{ stat.value }}</h3>
          </div>
        </section>

        <!-- Tabel pengiriman -->
        <section class="overflow-hidden rounded-xl border border-[#eadfd5] bg-white shadow-sm">
          <div class="border-b border-[#f0e7de] px-5 py-5 sm:px-6">
            <h2 class="text-xl font-bold text-[#332116]">Pengiriman</h2>
            <div class="mt-2 flex items-center gap-2 text-xs text-[#9a8878]">
              <span>Admin</span>
              <span>›</span>
              <strong class="font-semibold text-[#6b4328]">Pengiriman</strong>
            </div>
          </div>

          <!-- Filter dan pencarian -->
          <section class="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between" aria-label="Pencarian dan jumlah data pengiriman">
            <label class="flex items-center gap-2 text-sm text-[#725d4b]">
              Tampilkan
              <select v-model.number="itemsPerPage" aria-label="Jumlah baris per halaman" class="rounded-md border border-[#dfd2c5] bg-white px-3 py-2 text-sm text-[#493321] outline-none focus:border-[#9b704b] focus:ring-2 focus:ring-[#ead5b8]">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
              <span>data</span>
            </label>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label class="flex min-w-0 items-center gap-2 rounded-md border border-[#dfd2c5] px-3 py-2 focus-within:border-[#9b704b] focus-within:ring-2 focus-within:ring-[#ead5b8] sm:w-64">
                <span aria-hidden="true" class="text-lg text-[#9a8878]">⌕</span>
                <input v-model="search" type="search" placeholder="Cari pengiriman..." aria-label="Cari pengiriman" class="w-full bg-transparent text-sm text-[#493321] outline-none placeholder:text-[#b4a596]">
              </label>

              <a href="/admin/shipping/form" class="inline-flex items-center justify-center rounded-md bg-[#6b4328] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#54331f]">
                + Tambah
              </a>
            </div>
          </section>

          <!-- Tabel -->
          <div class="overflow-x-auto">
            <table class="w-full min-w-[760px] border-collapse text-left">
              <thead class="bg-[#faf6f1]">
                <tr>
                  <th v-for="column in [
                    { key: 'order_id', label: 'ID PEMESANAN' },
                    { key: 'tracking_number', label: 'NOMOR PELACAKAN' },
                    { key: 'shipped_date', label: 'TANGGAL PENGIRIMAN' },
                    { key: 'estimated_delivery', label: 'PERKIRAAN SELESAI' }
                  ]" :key="column.key" class="border-b border-[#eadfd5] px-5 py-4 text-xs font-bold tracking-wide text-[#8b7766]">
                    <button type="button" class="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-[#6b4328]" :aria-label="`Urutkan ${column.label}`" @click="toggleSort(column.key)">
                      {{ column.label }}
                      <span class="text-[#b29b85]">{{ sortSymbol(column.key) }}</span>
                    </button>
                  </th>
                  <th class="border-b border-[#eadfd5] px-5 py-4 text-right text-xs font-bold tracking-wide text-[#8b7766]">AKSI</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="shipment in pagedShipments" :key="shipment.id" class="border-b border-[#f0e7de] transition hover:bg-[#fdfaf6]">
                  <td class="px-5 py-4 text-sm font-semibold text-[#493321]">{{ shipment.order_id || '-' }}</td>
                  <td class="px-5 py-4 text-sm text-[#8b7766]">{{ shipment.tracking_number || '-' }}</td>
                  <td class="px-5 py-4 text-sm text-[#8b7766]">{{ displayDate(shipment.shipped_date) }}</td>
                  <td class="px-5 py-4 text-sm text-[#8b7766]">{{ displayDate(shipment.estimated_delivery) }}</td>
                  <td class="px-5 py-4 text-right">
                    <button type="button" class="rounded-md border border-[#d9c4ae] px-3 py-1.5 text-xs font-semibold text-[#6b4328] transition hover:bg-[#f3ece3]" @click="openDetail(shipment)">
                      Detail
                    </button>
                  </td>
                </tr>

                <tr v-if="pagedShipments.length === 0">
                  <td colspan="5" class="px-5 py-10 text-center text-sm text-[#9a8878]">
                    Tidak ada pengiriman yang sesuai.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="flex flex-col gap-4 border-t border-[#f0e7de] px-5 py-4 text-sm text-[#8b7766] sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>
              Menampilkan {{ startItem }} sampai {{ endItem }} dari {{ totalItems }} pengiriman
            </span>

            <div class="flex items-center gap-1" aria-label="Navigasi halaman">
              <button type="button" aria-label="Halaman sebelumnya" :disabled="currentPage <= 1" class="flex h-8 min-w-8 items-center justify-center rounded-md border border-[#dfd2c5] px-2 transition hover:bg-[#f3ece3] disabled:cursor-not-allowed disabled:opacity-40" @click="goToPage(currentPage - 1)">
                ‹
              </button>

              <button v-for="page in pageNumbers" :key="page" type="button" :class="page === currentPage ? 'bg-[#6b4328] text-white border-[#6b4328]' : 'border-[#dfd2c5] text-[#725d4b] hover:bg-[#f3ece3]'" class="flex h-8 min-w-8 items-center justify-center rounded-md border px-2 transition" :aria-current="page === currentPage ? 'page' : undefined" @click="goToPage(page)">
                {{ page }}
              </button>

              <button type="button" aria-label="Halaman selanjutnya" :disabled="currentPage >= totalPages" class="flex h-8 min-w-8 items-center justify-center rounded-md border border-[#dfd2c5] px-2 transition hover:bg-[#f3ece3] disabled:cursor-not-allowed disabled:opacity-40" @click="goToPage(currentPage + 1)">
                ›
              </button>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="flex flex-col gap-1 border-t border-[#eadfd5] bg-[#fffdf9] px-5 py-5 text-xs text-[#9a8878] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 KAKAO</p>
        <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
      </footer>
    </div>

    <!-- Modal detail -->
    <div v-if="selectedShipment" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]" @click.self="closeDetail">
      <section class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-7" role="dialog" aria-modal="true" aria-labelledby="shipping-detail-title">
        <div class="mb-5 flex items-start justify-between border-b border-[#f0e7de] pb-4">
          <div>
            <p class="text-xs font-semibold tracking-[0.18em] text-[#a17c5b]">DETAIL PENGIRIMAN</p>
            <h2 id="shipping-detail-title" class="mt-2 text-xl font-bold text-[#332116]">
              {{ selectedShipment.id }}
            </h2>
          </div>

          <button type="button" class="rounded-full px-2 text-2xl leading-none text-[#8b7766] transition hover:bg-[#f3ece3] hover:text-[#493321]" aria-label="Tutup detail" @click="closeDetail">
            ×
          </button>
        </div>

        <dl class="grid grid-cols-1 gap-0 sm:grid-cols-2">
          <div class="border-b border-[#f0e7de] py-3 sm:pr-5">
            <dt class="text-xs text-[#9a8878]">ID Pesanan</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">{{ selectedShipment.order_id }}</dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pl-5">
            <dt class="text-xs text-[#9a8878]">Pelanggan</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">{{ selectedShipment.customer_name || '-' }}</dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pr-5">
            <dt class="text-xs text-[#9a8878]">Status Pengiriman</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">{{ shipmentStatus(selectedShipment.status) }}</dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pl-5">
            <dt class="text-xs text-[#9a8878]">Asal</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">{{ selectedShipment.origin || '-' }}</dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pr-5">
            <dt class="text-xs text-[#9a8878]">Tujuan</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">{{ selectedShipment.destination || '-' }}</dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pl-5">
            <dt class="text-xs text-[#9a8878]">Kurir / Layanan</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">
              {{ selectedShipment.courier || '-' }} / {{ selectedShipment.service || '-' }}
            </dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pr-5">
            <dt class="text-xs text-[#9a8878]">Nomor Pelacakan</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">{{ selectedShipment.tracking_number || '-' }}</dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pl-5">
            <dt class="text-xs text-[#9a8878]">Berat</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">
              {{ selectedShipment.weight == null ? '-' : `${selectedShipment.weight} kg` }}
            </dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pr-5">
            <dt class="text-xs text-[#9a8878]">Biaya Pengiriman</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">
              {{ formatCurrency(selectedShipment.shipping_cost) }}
            </dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pl-5">
            <dt class="text-xs text-[#9a8878]">Tanggal Pengiriman</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">
              {{ displayDate(selectedShipment.shipped_date) }}
            </dd>
          </div>

          <div class="border-b border-[#f0e7de] py-3 sm:pr-5">
            <dt class="text-xs text-[#9a8878]">Perkiraan Selesai</dt>
            <dd class="mt-1 break-words text-sm font-semibold text-[#493321]">
              {{ displayDate(selectedShipment.estimated_delivery) }}
            </dd>
          </div>
        </dl>

        <div class="mt-6 flex justify-end">
          <button type="button" class="rounded-md bg-[#6b4328] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#54331f]" @click="closeDetail">
            Tutup
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
