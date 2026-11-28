<script setup>
import { computed, ref, watch } from 'vue'

// Data contoh dari file script.js Admin Pembayaran lama.
// Nanti dapat diganti dengan respons API Laravel.
const payments = ref([
  {"id": "PAY001", "order_id": "ORD001", "customer_name": "Budi Santoso", "product_name": "Cocoa Bean Grade A", "amount": 2500000, "payment_method": "bank_transfer", "payment_gateway": "Midtrans", "transaction_id": "MID-20261001-001", "status": "settlement", "payment_date": "2026-10-01"},
  {"id": "PAY002", "order_id": "ORD002", "customer_name": "Sari Dewi", "product_name": "Cocoa Bean Grade B", "amount": 1800000, "payment_method": "credit_card", "payment_gateway": "Midtrans", "transaction_id": "MID-20261002-002", "status": "settlement", "payment_date": "2026-10-02"},
  {"id": "PAY003", "order_id": "ORD003", "customer_name": "Andi Pratama", "product_name": "Cocoa Bean Grade A", "amount": 3200000, "payment_method": "qris", "payment_gateway": "Midtrans", "transaction_id": "MID-20261003-003", "status": "pending", "payment_date": "2026-10-03"},
  {"id": "PAY004", "order_id": "ORD004", "customer_name": "Made Adnyana", "product_name": "Cocoa Bean Grade C", "amount": 1200000, "payment_method": "bank_transfer", "payment_gateway": "Midtrans", "transaction_id": "MID-20261004-004", "status": "expire", "payment_date": "2026-10-04"},
  {"id": "PAY005", "order_id": "ORD005", "customer_name": "Putri Maharani", "product_name": "Cocoa Bean Grade A", "amount": 4500000, "payment_method": "gopay", "payment_gateway": "Midtrans", "transaction_id": "MID-20261005-005", "status": "settlement", "payment_date": "2026-10-05"},
  {"id": "PAY006", "order_id": "ORD006", "customer_name": "Agus Setiawan", "product_name": "Cocoa Bean Grade B", "amount": 2100000, "payment_method": "qris", "payment_gateway": "Midtrans", "transaction_id": "MID-20261006-006", "status": "deny", "payment_date": "2026-10-06"},
  {"id": "PAY007", "order_id": "ORD007", "customer_name": "Dewi Lestari", "product_name": "Cocoa Bean Grade A", "amount": 5000000, "payment_method": "bank_transfer", "payment_gateway": "Midtrans", "transaction_id": "MID-20261007-007", "status": "settlement", "payment_date": "2026-10-07"},
  {"id": "PAY008", "order_id": "ORD008", "customer_name": "Komang Wirawan", "product_name": "Cocoa Bean Grade C", "amount": 1500000, "payment_method": "credit_card", "payment_gateway": "Midtrans", "transaction_id": "MID-20261008-008", "status": "cancel", "payment_date": "2026-10-08"},
  {"id": "PAY009", "order_id": "ORD009", "customer_name": "Rina Anggraini", "product_name": "Cocoa Bean Grade B", "amount": 2750000, "payment_method": "gopay", "payment_gateway": "Midtrans", "transaction_id": "MID-20261009-009", "status": "settlement", "payment_date": "2026-10-09"},
  {"id": "PAY010", "order_id": "ORD010", "customer_name": "Kadek Saputra", "product_name": "Cocoa Bean Grade A", "amount": 3600000, "payment_method": "qris", "payment_gateway": "Midtrans", "transaction_id": "MID-20261010-010", "status": "pending", "payment_date": "2026-10-10"},
  {"id": "PAY011", "order_id": "ORD011", "customer_name": "Yoga Permana", "product_name": "Cocoa Bean Grade B", "amount": 1900000, "payment_method": "bank_transfer", "payment_gateway": "Midtrans", "transaction_id": "MID-20261011-011", "status": "settlement", "payment_date": "2026-10-11"},
  {"id": "PAY012", "order_id": "ORD012", "customer_name": "Budi Santoso", "product_name": "Cocoa Bean Grade C", "amount": 950000, "payment_method": "credit_card", "payment_gateway": "Midtrans", "transaction_id": "MID-20261012-012", "status": "refund", "payment_date": "2026-10-12"}
  ,{
    id: 'PAY-DEMO', order_id: 'ORD-DEMO', customer_name: 'Pelanggan Demo',
    product_name: 'Cocoa Bean (contoh)', amount: 300000,
    payment_method: 'bank_transfer', payment_gateway: 'Manual',
    transaction_id: '-', status: 'pending', payment_date: '2026-11-18',
    review_status: 'waiting_proof', proofData: null, proofType: '', proofName: '',
    review_reason: '', reviewed_at: ''
  }
])

const searchText = ref('')
const statusFilter = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const sortColumn = ref('')
const sortDirection = ref('asc')
const selectedPayment = ref(null)
const reviewMessage = ref('')
const rejectionReason = ref('')

const reviewLabels = {
  waiting_proof: 'Menunggu Bukti',
  needs_review: 'Perlu Diverifikasi',
  approved: 'Disetujui (Demo)',
  rejected: 'Ditolak (Demo)'
}

function reviewStatus(payment) {
  if (payment.payment_gateway !== 'Manual') return 'Otomatis via Gateway'
  return reviewLabels[payment.review_status] || 'Belum Ditinjau'
}

function openPayment(payment) {
  selectedPayment.value = payment
  reviewMessage.value = ''
  rejectionReason.value = payment.review_reason || ''
}

function closePayment() {
  selectedPayment.value = null
  reviewMessage.value = ''
  rejectionReason.value = ''
}

// Simulasi: admin memilih file lokal sebagai bukti contoh. Tidak dikirim ke server.
function handleSampleProof(event) {
  const file = event.target.files?.[0]
  const payment = selectedPayment.value
  if (!payment || payment.payment_gateway !== 'Manual' || !file) return
  if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
    reviewMessage.value = 'Gunakan JPG, PNG, atau PDF.'
    event.target.value = ''
    return
  }
  if (file.size > 3 * 1024 * 1024) {
    reviewMessage.value = 'Ukuran file contoh maksimal 3 MB.'
    event.target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    if (selectedPayment.value?.id !== payment.id) return
    payment.proofData = String(reader.result || '')
    payment.proofName = file.name
    payment.proofType = file.type
    payment.review_status = 'needs_review'
    reviewMessage.value = 'Bukti contoh telah dimuat di browser. Periksa sebelum membuat keputusan demo.'
  }
  reader.onerror = () => { reviewMessage.value = 'Bukti contoh gagal dibaca.' }
  reader.readAsDataURL(file)
  event.target.value = ''
}

function reviewPayment(action) {
  const payment = selectedPayment.value
  if (!payment || payment.payment_gateway !== 'Manual' || payment.review_status !== 'needs_review') return
  if (!payment.proofData) {
    reviewMessage.value = 'Bukti pembayaran belum tersedia.'
    return
  }
  if (action === 'rejected' && !rejectionReason.value.trim()) {
    reviewMessage.value = 'Isi alasan penolakan sebelum menolak pembayaran.'
    return
  }
  const message = action === 'approved'
    ? 'Setujui bukti pembayaran ini untuk SIMULASI saja?'
    : 'Tolak bukti pembayaran ini untuk SIMULASI saja?'
  if (!window.confirm(message)) return
  payment.review_status = action
  payment.review_reason = action === 'rejected' ? rejectionReason.value.trim() : ''
  payment.reviewed_at = new Date().toLocaleString('id-ID')
  // Status 'pending' dari transaksi/gateway tidak diubah oleh verifikasi demo ini.
  reviewMessage.value = 'Keputusan verifikasi tersimpan sementara di halaman (simulasi frontend).'
}


const formatRupiah = (number) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0
}).format(number)

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const [year, month, day] = dateString.split('-').map(Number)
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(year, month - 1, day))
}

const statusLabels = {
  settlement: 'Berhasil',
  pending: 'Menunggu',
  expire: 'Kedaluwarsa',
  deny: 'Ditolak',
  cancel: 'Dibatalkan',
  refund: 'Refund'
}

const methodLabels = {
  bank_transfer: 'Transfer Bank',
  credit_card: 'Kartu Kredit',
  qris: 'QRIS',
  gopay: 'GoPay'
}

const paymentStats = computed(() => {
  const successful = payments.value.filter((payment) => payment.status === 'settlement')
  return [
    { category: 'Total Pembayaran', value: payments.value.length },
    { category: 'Pembayaran Berhasil', value: successful.length },
    { category: 'Perlu Verifikasi Manual', value: payments.value.filter((p) => p.payment_gateway === 'Manual' && p.review_status === 'needs_review').length },
    { category: 'Total Pendapatan', value: formatRupiah(successful.reduce((sum, p) => sum + p.amount, 0)) }
  ]
})

const filteredPayments = computed(() => {
  const query = searchText.value.trim().toLowerCase()
  return payments.value.filter((payment) => {
    const matchesStatus = !statusFilter.value || (statusFilter.value === 'review_pending'
      ? payment.payment_gateway === 'Manual' && payment.review_status === 'needs_review'
      : payment.status === statusFilter.value)
    const searchable = [
      payment.id, payment.order_id, payment.customer_name, payment.product_name,
      payment.amount, formatRupiah(payment.amount), payment.status,
      statusLabels[payment.status], payment.transaction_id, reviewStatus(payment)
    ].join(' ').toLowerCase()
    return matchesStatus && searchable.includes(query)
  })
})

const sortedPayments = computed(() => {
  const items = [...filteredPayments.value]
  if (!sortColumn.value) return items

  return items.sort((a, b) => {
    const left = a[sortColumn.value]
    const right = b[sortColumn.value]
    const comparison = sortColumn.value === 'amount'
      ? Number(left) - Number(right)
      : String(left).localeCompare(String(right), 'id', { numeric: true })
    return sortDirection.value === 'asc' ? comparison : -comparison
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredPayments.value.length / itemsPerPage.value)))
const visiblePayments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return sortedPayments.value.slice(start, start + itemsPerPage.value)
})
const showingStart = computed(() => filteredPayments.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1)
const showingEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredPayments.value.length))

watch([searchText, statusFilter, itemsPerPage], () => { currentPage.value = 1 })

function toggleSort(column) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}

function sortIcon(column) {
  if (sortColumn.value !== column) return '↕'
  return sortDirection.value === 'asc' ? '↑' : '↓'
}

function goToPage(page) {
  currentPage.value = Math.min(pageCount.value, Math.max(1, page))
}
</script>

<template>
  <div class="admin-payment-page">
    <!-- SIDEBAR ADMIN -->
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
        <a href="/admin/payments" class="active" aria-current="page">Pembayaran</a>
        <a href="/admin/shipping">Pengiriman</a>
      </nav>
    </aside>

    <!-- TOPBAR -->
    <header class="topbar">
      <div>
        <p class="topbar-label">ADMIN AREA</p>
        <h1>Pembayaran</h1>
      </div>
      <div class="admin-info">
        <strong>Admin KAKAO</strong>
        <span>Pembayaran</span>
      </div>
    </header>

    <!-- KONTEN -->
    <main class="payment-main">
      <section class="stats" aria-label="Statistik pembayaran">
        <div v-for="stat in paymentStats" :key="stat.category" class="stat-card">
          <p>{{ stat.category }}</p>
          <h3>{{ stat.value }}</h3>
        </div>
      </section>

      <section class="table-card">
        <div class="page-heading">
          <div>
            <h2>Pembayaran</h2>
            <div class="breadcrumb">
              <span>Admin</span><span>›</span><strong>Pembayaran</strong>
            </div>
          </div>
        </div>

        <div class="toolbar">
          <div class="filters">
            <label class="filter-label">
              Tampilkan
              <select v-model.number="itemsPerPage" aria-label="Jumlah baris per halaman">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </label>

            <select v-model="statusFilter" aria-label="Filter status pembayaran">
              <option value="">Semua Status</option>
              <option value="settlement">Berhasil</option>
              <option value="pending">Menunggu</option>
              <option value="expire">Kedaluwarsa</option>
              <option value="deny">Ditolak</option>
              <option value="cancel">Dibatalkan</option>
              <option value="refund">Refund</option>
              <option value="review_pending">Perlu Verifikasi Manual</option>
            </select>
          </div>

          <label class="product-search">
            <span aria-hidden="true">⌕</span>
            <input v-model="searchText" type="search" placeholder="Search" aria-label="Cari pembayaran">
          </label>
        </div>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th :aria-sort="sortColumn === 'id' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'">
                  <button type="button" class="sort-button" @click="toggleSort('id')">ID PEMBAYARAN <span class="sort">{{ sortIcon('id') }}</span></button>
                </th>
                <th :aria-sort="sortColumn === 'order_id' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'">
                  <button type="button" class="sort-button" @click="toggleSort('order_id')">ID PESANAN <span class="sort">{{ sortIcon('order_id') }}</span></button>
                </th>
                <th :aria-sort="sortColumn === 'amount' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'">
                  <button type="button" class="sort-button" @click="toggleSort('amount')">TOTAL <span class="sort">{{ sortIcon('amount') }}</span></button>
                </th>
                <th :aria-sort="sortColumn === 'status' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'">
                  <button type="button" class="sort-button" @click="toggleSort('status')">STATUS <span class="sort">{{ sortIcon('status') }}</span></button>
                </th>
                <th>VERIFIKASI</th>
                <th class="action-cell">AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in visiblePayments" :key="payment.id">
                <td class="payment-id">{{ payment.id }}</td>
                <td class="muted">{{ payment.order_id }}</td>
                <td class="muted">{{ formatRupiah(payment.amount) }}</td>
                <td>
                  <span class="payment-status" :class="'status-' + payment.status">
                    {{ statusLabels[payment.status] || payment.status }}
                  </span>
                </td>
                <td><span class="review-badge" :class="'review-' + (payment.review_status || 'gateway')">{{ reviewStatus(payment) }}</span></td>
                <td class="action-cell">
                  <button type="button" class="detail-button" @click="openPayment(payment)">Detail / Verifikasi</button>
                </td>
              </tr>
              <tr v-if="visiblePayments.length === 0">
                <td colspan="6" class="empty-state">Tidak ada pembayaran yang sesuai dengan pencarian atau filter.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-footer">
          <span>Menampilkan {{ showingStart }}–{{ showingEnd }} dari {{ filteredPayments.length }} pembayaran</span>
          <div class="pagination">
            <button type="button" :disabled="currentPage === 1" aria-label="Halaman sebelumnya" @click="goToPage(currentPage - 1)">‹</button>
            <button
              v-for="page in pageCount"
              :key="page"
              type="button"
              :class="{ 'current-page': page === currentPage }"
              :aria-current="page === currentPage ? 'page' : undefined"
              @click="goToPage(page)"
            >{{ page }}</button>
            <button type="button" :disabled="currentPage === pageCount" aria-label="Halaman berikutnya" @click="goToPage(currentPage + 1)">›</button>
          </div>
        </div>
      </section>
    </main>

    <footer class="payment-footer">
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>

    <!-- Detail dan simulasi verifikasi bukti; tidak mengubah status transaksi gateway -->
    <div v-if="selectedPayment" class="modal-overlay" @click.self="closePayment">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="payment-detail-title">
        <div class="modal-heading">
          <div>
            <p class="topbar-label">RINCIAN TRANSAKSI</p>
            <h2 id="payment-detail-title">{{ selectedPayment.id }}</h2>
          </div>
          <button type="button" class="modal-close" aria-label="Tutup detail" @click="closePayment">×</button>
        </div>
        <dl class="detail-list">
          <div><dt>ID Pesanan</dt><dd>{{ selectedPayment.order_id }}</dd></div>
          <div><dt>Pelanggan</dt><dd>{{ selectedPayment.customer_name }}</dd></div>
          <div><dt>Produk</dt><dd>{{ selectedPayment.product_name }}</dd></div>
          <div><dt>Total</dt><dd>{{ formatRupiah(selectedPayment.amount) }}</dd></div>
          <div><dt>Metode Pembayaran</dt><dd>{{ methodLabels[selectedPayment.payment_method] || selectedPayment.payment_method }}</dd></div>
          <div><dt>Gateway</dt><dd>{{ selectedPayment.payment_gateway }}</dd></div>
          <div><dt>ID Transaksi</dt><dd>{{ selectedPayment.transaction_id }}</dd></div>
          <div><dt>Tanggal</dt><dd>{{ formatDate(selectedPayment.payment_date) }}</dd></div>
          <div><dt>Status transaksi</dt><dd>{{ statusLabels[selectedPayment.status] || selectedPayment.status }}</dd></div>
          <div><dt>Verifikasi Admin</dt><dd>{{ reviewStatus(selectedPayment) }}</dd></div>
          <div v-if="selectedPayment.reviewed_at"><dt>Waktu tinjau (demo)</dt><dd>{{ selectedPayment.reviewed_at }}</dd></div>
          <div v-if="selectedPayment.review_reason"><dt>Alasan penolakan</dt><dd>{{ selectedPayment.review_reason }}</dd></div>
        </dl>

        <section class="verification-panel" aria-label="Verifikasi pembayaran">
          <h3>Verifikasi Pembayaran</h3>
          <p class="verification-note">Mode demo frontend: keputusan di sini bukan konfirmasi bank/Midtrans, tidak dikirim ke server, dan hilang saat halaman dimuat ulang.</p>

          <template v-if="selectedPayment.payment_gateway === 'Manual' && selectedPayment.status === 'pending'">
            <label v-if="['waiting_proof', 'needs_review'].includes(selectedPayment.review_status)" class="demo-upload">
              Simulasikan bukti dari pelanggan (JPG/PNG/PDF, maks. 3 MB)
              <input type="file" accept="image/png,image/jpeg,application/pdf" @change="handleSampleProof">
            </label>
            <div v-if="selectedPayment.proofData" class="proof-card">
              <strong>Bukti contoh: {{ selectedPayment.proofName }}</strong>
              <img v-if="selectedPayment.proofType.startsWith('image/')" :src="selectedPayment.proofData" alt="Pratinjau bukti pembayaran contoh">
              <a v-else :href="selectedPayment.proofData" target="_blank" rel="noopener noreferrer">Buka PDF bukti contoh</a>
            </div>
            <p v-else class="no-proof">Belum ada bukti pembayaran. Tidak boleh menyetujui tanpa bukti.</p>
            <template v-if="selectedPayment.review_status === 'needs_review'">
              <label class="rejection-label">Alasan penolakan (wajib jika menolak)
                <textarea v-model="rejectionReason" rows="2" placeholder="Jelaskan alasan jika bukti tidak sesuai"></textarea>
              </label>
              <div class="verification-actions">
                <button type="button" class="approve-button" @click="reviewPayment('approved')">Setujui Bukti (Demo)</button>
                <button type="button" class="reject-button" @click="reviewPayment('rejected')">Tolak Bukti (Demo)</button>
              </div>
            </template>
            <p v-if="selectedPayment.review_status === 'approved'" class="review-result">Bukti disetujui dalam simulasi. Status transaksi tetap mengikuti konfirmasi pembayaran sebenarnya.</p>
            <p v-if="selectedPayment.review_status === 'rejected'" class="review-result">Bukti ditolak dalam simulasi. Pelanggan perlu mengirim bukti yang sesuai.</p>
          </template>
          <p v-else class="gateway-notice">Transaksi ini dikelola oleh {{ selectedPayment.payment_gateway }}. Status pembayaran harus mengikuti notifikasi resmi penyedia pembayaran, bukan tombol persetujuan manual.</p>
          <p v-if="reviewMessage" class="review-message" role="status">{{ reviewMessage }}</p>
        </section>
        <button type="button" class="close-detail-button" @click="closePayment">Tutup</button>
      </div>
    </div>
  </div>
</template>

<style scoped src="./AdminPaymentsView.css"></style>
