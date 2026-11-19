<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// 12 data contoh dari script.js lama, bukan data dari Laravel.
const seedShipments = [
    {
        id: "SHP001",
        order_id: "ORD001",
        customer_name: "Budi Santoso",
        origin: "Jembrana, Bali",
        destination: "Denpasar, Bali",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140001",
        shipping_cost: 25000,
        weight: 10,
        status: "delivered",
        shipped_date: "2026-10-01",
        estimated_delivery: "2026-10-03"
    },
    {
        id: "SHP002",
        order_id: "ORD002",
        customer_name: "Sari Dewi",
        origin: "Jembrana, Bali",
        destination: "Surabaya, Jawa Timur",
        courier: "JNE",
        service: "YES",
        tracking_number: "JNE202610140002",
        shipping_cost: 45000,
        weight: 15,
        status: "in_transit",
        shipped_date: "2026-10-12",
        estimated_delivery: "2026-10-14"
    },
    {
        id: "SHP003",
        order_id: "ORD003",
        customer_name: "Andi Pratama",
        origin: "Jembrana, Bali",
        destination: "Jakarta Selatan, DKI Jakarta",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140003",
        shipping_cost: 65000,
        weight: 20,
        status: "shipped",
        shipped_date: "2026-10-13",
        estimated_delivery: "2026-10-17"
    },
    {
        id: "SHP004",
        order_id: "ORD004",
        customer_name: "Made Adnyana",
        origin: "Jembrana, Bali",
        destination: "Bandung, Jawa Barat",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140004",
        shipping_cost: 55000,
        weight: 12,
        status: "processing",
        shipped_date: null,
        estimated_delivery: null
    },
    {
        id: "SHP005",
        order_id: "ORD005",
        customer_name: "Putri Maharani",
        origin: "Jembrana, Bali",
        destination: "Yogyakarta, DI Yogyakarta",
        courier: "JNE",
        service: "YES",
        tracking_number: "JNE202610140005",
        shipping_cost: 50000,
        weight: 8,
        status: "delivered",
        shipped_date: "2026-10-08",
        estimated_delivery: "2026-10-09"
    },
    {
        id: "SHP006",
        order_id: "ORD006",
        customer_name: "Agus Setiawan",
        origin: "Jembrana, Bali",
        destination: "Malang, Jawa Timur",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140006",
        shipping_cost: 40000,
        weight: 18,
        status: "in_transit",
        shipped_date: "2026-10-13",
        estimated_delivery: "2026-10-16"
    },
    {
        id: "SHP007",
        order_id: "ORD007",
        customer_name: "Dewi Lestari",
        origin: "Jembrana, Bali",
        destination: "Makassar, Sulawesi Selatan",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140007",
        shipping_cost: 85000,
        weight: 25,
        status: "shipped",
        shipped_date: "2026-10-12",
        estimated_delivery: "2026-10-18"
    },
    {
        id: "SHP008",
        order_id: "ORD008",
        customer_name: "Komang Wirawan",
        origin: "Jembrana, Bali",
        destination: "Gianyar, Bali",
        courier: "JNE",
        service: "JTR",
        tracking_number: "JNE202610140008",
        shipping_cost: 120000,
        weight: 100,
        status: "processing",
        shipped_date: null,
        estimated_delivery: null
    },
    {
        id: "SHP009",
        order_id: "ORD009",
        customer_name: "Rina Anggraini",
        origin: "Jembrana, Bali",
        destination: "Semarang, Jawa Tengah",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140009",
        shipping_cost: 60000,
        weight: 16,
        status: "cancelled",
        shipped_date: null,
        estimated_delivery: null
    },
    {
        id: "SHP010",
        order_id: "ORD010",
        customer_name: "Kadek Saputra",
        origin: "Jembrana, Bali",
        destination: "Denpasar, Bali",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140010",
        shipping_cost: 20000,
        weight: 5,
        status: "delivered",
        shipped_date: "2026-10-10",
        estimated_delivery: "2026-10-12"
    },
    {
        id: "SHP011",
        order_id: "ORD011",
        customer_name: "Yoga Permana",
        origin: "Jembrana, Bali",
        destination: "Tangerang, Banten",
        courier: "JNE",
        service: "YES",
        tracking_number: "JNE202610140011",
        shipping_cost: 70000,
        weight: 22,
        status: "in_transit",
        shipped_date: "2026-10-13",
        estimated_delivery: "2026-10-15"
    },
    {
        id: "SHP012",
        order_id: "ORD012",
        customer_name: "Budi Santoso",
        origin: "Jembrana, Bali",
        destination: "Denpasar, Bali",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140012",
        shipping_cost: 30000,
        weight: 10,
        status: "pending",
        shipped_date: null,
        estimated_delivery: null
    }
]

// Key ini juga bisa digunakan AdminShippingFormView.vue pada tahap berikutnya.
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
      // Isi data contoh hanya ketika penyimpanan belum pernah dibuat.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedShipments))
      shipments.value = structuredClone(seedShipments)
    } else {
      const parsed = JSON.parse(saved)
      if (!Array.isArray(parsed)) throw new Error('Format data pengiriman tidak sesuai')
      shipments.value = parsed
    }
    errorMessage.value = ''
  } catch (error) {
    console.error(error)
    shipments.value = structuredClone(seedShipments)
    errorMessage.value = 'Data lokal tidak dapat dibaca atau disimpan. Menampilkan data contoh.'
  }
}

// Statistik sama seperti halaman HTML lama.
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
    // Tanggal null selalu ditempatkan terakhir.
    if (aa == null || aa === '') return bb == null || bb === '' ? 0 : 1
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

watch([search, itemsPerPage], () => { currentPage.value = 1 })
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
  return sortColumn.value !== column ? '↕' : sortDirection.value === 'asc' ? '↑' : '↓'
}
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}
function displayDate(date) {
  return date || '-'
}
function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0
  }).format(Number(amount || 0))
}
const statusNames = {
  pending: 'Menunggu', processing: 'Disiapkan', shipped: 'Dikirim',
  in_transit: 'Dalam Perjalanan', delivered: 'Terkirim', cancelled: 'Dibatalkan'
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
function showFormPending() {
  window.alert('Form Tambah/Edit Pengiriman akan dihubungkan setelah halaman Form Pengiriman selesai dipindahkan ke Vue.js.')
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
  <div class="admin-shipping-page">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <a href="/">KAKAO</a>
        <p>SISTEM INFORMASI<br>PRODUSEN KAKAO</p>
      </div>
      <nav class="sidebar-menu" aria-label="Navigasi Admin">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/customers">Pelanggan</a>
        <a href="/admin/products">Produk</a>
        <a href="/admin/orders">Pesanan</a>
        <a href="/admin/payments">Pembayaran</a>
        <a href="/admin/shipping" class="active" aria-current="page">Pengiriman</a>
      </nav>
    </aside>

    <header class="topbar">
      <div>
        <p class="topbar-label">ADMIN AREA</p>
        <h1>Pengiriman</h1>
      </div>
      <div class="admin-info">
        <strong>Admin KAKAO</strong>
        <span>Pengiriman</span>
      </div>
    </header>

    <main>
      <p class="demo-note" role="note">Mode demo frontend — data pengiriman disimpan pada browser ini, belum terhubung ke Laravel.</p>
      <p v-if="errorMessage" class="error-note" role="alert">{{ errorMessage }}</p>

      <section class="stats" aria-label="Statistik Pengiriman">
        <div v-for="stat in stats" :key="stat.category" class="stat-card">
          <p>{{ stat.category }}</p>
          <h3>{{ stat.value }}</h3>
        </div>
      </section>

      <section class="table-card">
        <div class="page-heading">
          <div>
            <h1>Pengiriman</h1>
            <div class="breadcrumb"><span>Admin</span><span>›</span><strong>Pengiriman</strong></div>
          </div>
        </div>

        <section class="toolbar" aria-label="Pencarian dan jumlah data pengiriman">
          <div class="filters">
            <label class="filter-label">Tampilkan
              <select v-model.number="itemsPerPage" aria-label="Jumlah baris per halaman">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </label>
          </div>
          <div class="table-actions">
            <label class="product-search">
              <span aria-hidden="true">⌕</span>
              <input v-model="search" type="search" placeholder="Search" aria-label="Cari pengiriman">
            </label>
            <a href="/admin/shipping/form" class="add-button">+ Tambah</a>
          </div>
        </section>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th v-for="column in [
                  { key: 'order_id', label: 'ID PEMESANAN' },
                  { key: 'tracking_number', label: 'NOMOR PELACAKAN' },
                  { key: 'shipped_date', label: 'TANGGAL PENGIRIMAN' },
                  { key: 'estimated_delivery', label: 'PERKIRAAN SELESAI' }
                ]" :key="column.key">
                  <button type="button" class="sort-button" :aria-label="`Urutkan ${column.label}`"
                    @click="toggleSort(column.key)">
                    {{ column.label }} <span class="sort">{{ sortSymbol(column.key) }}</span>
                  </button>
                </th>
                <th class="action-cell">AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="shipment in pagedShipments" :key="shipment.id">
                <td>{{ shipment.order_id || '-' }}</td>
                <td class="muted">{{ shipment.tracking_number || '-' }}</td>
                <td class="muted">{{ displayDate(shipment.shipped_date) }}</td>
                <td class="muted">{{ displayDate(shipment.estimated_delivery) }}</td>
                <td class="action-cell">
                  <button type="button" class="action detail" @click="openDetail(shipment)">Detail</button>
                </td>
              </tr>
              <tr v-if="pagedShipments.length === 0">
                <td colspan="5" class="empty-row">Tidak ada pengiriman yang sesuai.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-footer">
          <span>Menampilkan {{ startItem }} sampai {{ endItem }} dari {{ totalItems }} pengiriman</span>
          <div class="pagination" aria-label="Navigasi halaman">
            <button type="button" aria-label="Halaman sebelumnya"
              :disabled="currentPage <= 1" @click="goToPage(currentPage - 1)">‹</button>
            <button v-for="page in pageNumbers" :key="page" type="button"
              :class="{ 'current-page': page === currentPage }"
              :aria-current="page === currentPage ? 'page' : undefined"
              @click="goToPage(page)">{{ page }}</button>
            <button type="button" aria-label="Halaman selanjutnya"
              :disabled="currentPage >= totalPages" @click="goToPage(currentPage + 1)">›</button>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>

    <div v-if="selectedShipment" class="dialog-backdrop" @click.self="closeDetail">
      <section class="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="shipping-detail-title">
        <div class="dialog-heading">
          <div>
            <p class="topbar-label">DETAIL PENGIRIMAN</p>
            <h2 id="shipping-detail-title">{{ selectedShipment.id }}</h2>
          </div>
          <button type="button" class="close-dialog" aria-label="Tutup detail" @click="closeDetail">×</button>
        </div>
        <dl class="detail-list">
          <div><dt>ID Pesanan</dt><dd>{{ selectedShipment.order_id }}</dd></div>
          <div><dt>Pelanggan</dt><dd>{{ selectedShipment.customer_name || '-' }}</dd></div>
          <div><dt>Status Pengiriman</dt><dd>{{ shipmentStatus(selectedShipment.status) }}</dd></div>
          <div><dt>Asal</dt><dd>{{ selectedShipment.origin || '-' }}</dd></div>
          <div><dt>Tujuan</dt><dd>{{ selectedShipment.destination || '-' }}</dd></div>
          <div><dt>Kurir / Layanan</dt><dd>{{ selectedShipment.courier || '-' }} / {{ selectedShipment.service || '-' }}</dd></div>
          <div><dt>Nomor Pelacakan</dt><dd>{{ selectedShipment.tracking_number || '-' }}</dd></div>
          <div><dt>Berat</dt><dd>{{ selectedShipment.weight == null ? '-' : `${selectedShipment.weight} kg` }}</dd></div>
          <div><dt>Biaya Pengiriman</dt><dd>{{ formatCurrency(selectedShipment.shipping_cost) }}</dd></div>
          <div><dt>Tanggal Pengiriman</dt><dd>{{ displayDate(selectedShipment.shipped_date) }}</dd></div>
          <div><dt>Perkiraan Selesai</dt><dd>{{ displayDate(selectedShipment.estimated_delivery) }}</dd></div>
        </dl>
        <div class="dialog-actions"><button type="button" @click="closeDetail">Tutup</button></div>
      </section>
    </div>
  </div>
</template>

<style scoped src="./AdminShippingView.css"></style>
