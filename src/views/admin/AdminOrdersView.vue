<script setup>
import { computed, ref, watch } from 'vue'

// Data contoh dari HTML asli. Belum terhubung ke Laravel / verifikasi pembayaran.
const STORAGE_KEY = 'kakao_demo_orders'
const initialOrders = [
  { id: 'ORD-001', customer: 'Customer 01', product: 'Cocoa Bean A', date: '12-10-2026', total: 250000, status: 'Diproses' },
  { id: 'ORD-002', customer: 'Customer 02', product: 'Cocoa Bean B', date: '13-10-2026', total: 450000, status: 'Selesai' },
  { id: 'ORD-003', customer: 'Customer 03', product: 'Cocoa Bean C', date: '14-10-2026', total: 350000, status: 'Menunggu Pembayaran' },
  { id: 'ORD-004', customer: 'Customer 04', product: 'Cocoa Bean D', date: '14-10-2026', total: 500000, status: 'Diproses' },
  { id: 'ORD-005', customer: 'Customer 05', product: 'Cocoa Bean E', date: '14-10-2026', total: 300000, status: 'Dibatalkan' }
]

const statusOptions = ['Menunggu Pembayaran', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan']
const searchOrder = ref('')
const statusFilter = ref('')
const storageNotice = ref('')
const notice = ref('')

function readOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return initialOrders.map(order => ({ ...order }))
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) throw new Error('Format penyimpanan tidak sesuai')
    return parsed
  } catch {
    storageNotice.value = 'Data demo di browser tidak dapat dibaca. Menampilkan data awal.'
    return initialOrders.map(order => ({ ...order }))
  }
}

const orders = ref(readOrders())

const stats = computed(() => [
  { label: 'Total Pesanan', value: orders.value.length },
  { label: 'Menunggu Pembayaran', value: orders.value.filter(order => order.status === 'Menunggu Pembayaran').length },
  { label: 'Sedang Diproses', value: orders.value.filter(order => order.status === 'Diproses').length },
  { label: 'Pesanan Selesai', value: orders.value.filter(order => order.status === 'Selesai').length }
])

const filteredOrders = computed(() => {
  const keyword = searchOrder.value.trim().toLocaleLowerCase('id-ID')
  return orders.value.filter(order => {
    const text = [order.id, order.customer, order.product, order.date, formatRupiah(order.total)]
      .join(' ')
      .toLocaleLowerCase('id-ID')
    return text.includes(keyword) && (!statusFilter.value || order.status === statusFilter.value)
  })
})

function formatRupiah(amount) {
  return 'Rp ' + new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 })
    .format(Number(amount) || 0)
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
  notice.value = `Status ${order.id} diperbarui menjadi ${order.status} (simulasi).`
}

// Perubahan hanya disimpan di browser ini; tidak mengubah pembayaran sungguhan.
watch(orders, (currentOrders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentOrders))
    storageNotice.value = ''
  } catch {
    storageNotice.value = 'Status berubah di layar, tetapi gagal disimpan di browser.'
  }
}, { deep: true })

function notReady(feature) {
  notice.value = `Halaman ${feature} belum dipindahkan ke Vue.js.`
}
</script>

<template>
  <div class="admin-orders-page">
    <div class="dashboard">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <a href="/">KAKAO</a>
          <p>SISTEM INFORMASI<br>PRODUSEN KAKAO</p>
        </div>
        <nav class="sidebar-menu" aria-label="Navigasi Admin">
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/customers">Pelanggan</a>
          <a href="/admin/products">Produk</a>
          <a href="/admin/orders" class="active" aria-current="page">Pesanan</a>
          <a href="/admin/payments">Pembayaran</a>
          <a href="/admin/shipping">Pengiriman</a>
        </nav>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <div>
            <p class="topbar-label">AREA ADMIN</p>
            <h1>Pesanan</h1>
          </div>
          <div class="admin-info">
            <strong>Admin KAKAO</strong>
            <span>Administrator</span>
          </div>
        </header>

        <p v-if="notice" class="navigation-note" role="status">
          {{ notice }}
          <button type="button" aria-label="Tutup pemberitahuan" @click="notice = ''">×</button>
        </p>
        <p v-if="storageNotice" class="navigation-note" role="alert">{{ storageNotice }}</p>

        <section class="stats orders-stats" aria-label="Statistik pesanan">
          <div v-for="item in stats" :key="item.label" class="stat-card">
            <p>{{ item.label }}</p>
            <h3>{{ item.value }}</h3>
          </div>
        </section>

        <section class="panel orders-panel">
          <div class="panel-heading">
            <div>
              <p class="section-label">DATA TRANSAKSI</p>
              <h2>Daftar Pesanan</h2>
            </div>
            <a href="/admin/dashboard" class="view-all">← Kembali ke Dashboard</a>
          </div>

          <div class="order-tools">
            <input
              id="searchOrder"
              v-model="searchOrder"
              type="search"
              placeholder="Cari ID, customer, atau produk..."
              aria-label="Cari pesanan"
            >
            <select id="statusFilter" v-model="statusFilter" aria-label="Filter status">
              <option value="">Semua Status</option>
              <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
            </select>
          </div>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID Pesanan</th>
                  <th>Customer</th>
                  <th>Produk</th>
                  <th>Tanggal</th>
                  <th>Total</th>
                  <th>Status Pesanan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in filteredOrders" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.customer }}</td>
                  <td>{{ order.product }}</td>
                  <td>{{ order.date }}</td>
                  <td>{{ formatRupiah(order.total) }}</td>
                  <td>
                    <select
                      v-model="order.status"
                      class="order-status-select"
                      :class="statusClass(order.status)"
                      :aria-label="`Ubah status pesanan ${order.id}`"
                      @change="changeStatus(order)"
                    >
                      <option v-for="status in statusOptions" :key="status" :value="status">
                        {{ status }}
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-if="filteredOrders.length === 0" id="emptyState" class="show">
              Tidak ada pesanan yang sesuai.
            </p>
          </div>
          <p class="demo-note">Data dan perubahan status hanya simulasi di browser, belum terhubung ke Laravel atau verifikasi pembayaran.</p>
        </section>
      </main>
    </div>

    <footer class="footer">
      <div class="footer-main">
        <div class="footer-brand">
          <a href="/" class="footer-logo">KAKAO</a>
          <p>Sistem informasi untuk membantu pengelolaan penjualan kakao secara terstruktur, transparan, dan mudah dipantau.</p>
        </div>
        <div class="footer-info">
          <div>
            <h4>Menu</h4>
            <a href="/admin/dashboard">Dashboard</a>
            <a href="/admin/products">Produk</a>
          </div>
          <div>
            <h4>Admin</h4>
            <a href="/admin/products/form">Tambah Produk</a>
            <a href="/admin/orders">Pesanan</a>
          </div>
          <div>
            <h4>Informasi</h4>
            <p>Indonesia</p>
            <p>info@kakao.com</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 KAKAO</p>
        <p>Sistem Informasi Manajemen Produsen Kakao</p>
      </div>
    </footer>
  </div>
</template>

<style scoped src="./AdminOrdersView.css"></style>
