
<script setup>
import { computed, ref, watch } from 'vue'

// Data contoh pembayaran
const payments = ref([
  { id: 'PAY001', order_id: 'ORD001', customer_name: 'Budi Santoso', product_name: 'Cocoa Bean Grade A', amount: 2500000, payment_method: 'bank_transfer', payment_gateway: 'Midtrans', transaction_id: 'MID-20261001-001', status: 'settlement', payment_date: '2026-10-01' },
  { id: 'PAY002', order_id: 'ORD002', customer_name: 'Sari Dewi', product_name: 'Cocoa Bean Grade B', amount: 1800000, payment_method: 'credit_card', payment_gateway: 'Midtrans', transaction_id: 'MID-20261002-002', status: 'settlement', payment_date: '2026-10-02' },
  { id: 'PAY003', order_id: 'ORD003', customer_name: 'Andi Pratama', product_name: 'Cocoa Bean Grade A', amount: 3200000, payment_method: 'qris', payment_gateway: 'Midtrans', transaction_id: 'MID-20261003-003', status: 'pending', payment_date: '2026-10-03' },
  { id: 'PAY004', order_id: 'ORD004', customer_name: 'Made Adnyana', product_name: 'Cocoa Bean Grade C', amount: 1200000, payment_method: 'bank_transfer', payment_gateway: 'Midtrans', transaction_id: 'MID-20261004-004', status: 'expire', payment_date: '2026-10-04' },
  { id: 'PAY005', order_id: 'ORD005', customer_name: 'Putri Maharani', product_name: 'Cocoa Bean Grade A', amount: 4500000, payment_method: 'gopay', payment_gateway: 'Midtrans', transaction_id: 'MID-20261005-005', status: 'settlement', payment_date: '2026-10-05' },
  { id: 'PAY006', order_id: 'ORD006', customer_name: 'Agus Setiawan', product_name: 'Cocoa Bean Grade B', amount: 2100000, payment_method: 'qris', payment_gateway: 'Midtrans', transaction_id: 'MID-20261006-006', status: 'deny', payment_date: '2026-10-06' },
  { id: 'PAY007', order_id: 'ORD007', customer_name: 'Dewi Lestari', product_name: 'Cocoa Bean Grade A', amount: 5000000, payment_method: 'bank_transfer', payment_gateway: 'Midtrans', transaction_id: 'MID-20261007-007', status: 'settlement', payment_date: '2026-10-07' },
  { id: 'PAY008', order_id: 'ORD008', customer_name: 'Komang Wirawan', product_name: 'Cocoa Bean Grade C', amount: 1500000, payment_method: 'credit_card', payment_gateway: 'Midtrans', transaction_id: 'MID-20261008-008', status: 'cancel', payment_date: '2026-10-08' },
  { id: 'PAY009', order_id: 'ORD009', customer_name: 'Rina Anggraini', product_name: 'Cocoa Bean Grade B', amount: 2750000, payment_method: 'gopay', payment_gateway: 'Midtrans', transaction_id: 'MID-20261009-009', status: 'settlement', payment_date: '2026-10-09' },
  { id: 'PAY010', order_id: 'ORD010', customer_name: 'Kadek Saputra', product_name: 'Cocoa Bean Grade A', amount: 3600000, payment_method: 'qris', payment_gateway: 'Midtrans', transaction_id: 'MID-20261010-010', status: 'pending', payment_date: '2026-10-10' },
  { id: 'PAY011', order_id: 'ORD011', customer_name: 'Yoga Permana', product_name: 'Cocoa Bean Grade B', amount: 1900000, payment_method: 'bank_transfer', payment_gateway: 'Midtrans', transaction_id: 'MID-20261011-011', status: 'settlement', payment_date: '2026-10-11' },
  { id: 'PAY012', order_id: 'ORD012', customer_name: 'Budi Santoso', product_name: 'Cocoa Bean Grade C', amount: 950000, payment_method: 'credit_card', payment_gateway: 'Midtrans', transaction_id: 'MID-20261012-012', status: 'refund', payment_date: '2026-10-12' },
  {
    id: 'PAY-DEMO',
    order_id: 'ORD-DEMO',
    customer_name: 'Pelanggan Demo',
    product_name: 'Cocoa Bean (contoh)',
    amount: 300000,
    payment_method: 'bank_transfer',
    payment_gateway: 'Manual',
    transaction_id: '-',
    status: 'pending',
    payment_date: '2026-11-18',
    review_status: 'waiting_proof',
    proofData: null,
    proofType: '',
    proofName: '',
    review_reason: '',
    reviewed_at: ''
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
  if (payment.payment_gateway !== 'Manual') {
    return 'Otomatis via Gateway'
  }

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

// Simulasi upload bukti lokal, tidak dikirim ke server.
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

    reviewMessage.value =
      'Bukti contoh telah dimuat di browser. Periksa sebelum membuat keputusan demo.'
  }

  reader.onerror = () => {
    reviewMessage.value = 'Bukti contoh gagal dibaca.'
  }

  reader.readAsDataURL(file)
  event.target.value = ''
}

function reviewPayment(action) {
  const payment = selectedPayment.value

  if (
    !payment ||
    payment.payment_gateway !== 'Manual' ||
    payment.review_status !== 'needs_review'
  ) return

  if (!payment.proofData) {
    reviewMessage.value = 'Bukti pembayaran belum tersedia.'
    return
  }

  if (action === 'rejected' && !rejectionReason.value.trim()) {
    reviewMessage.value = 'Isi alasan penolakan sebelum menolak pembayaran.'
    return
  }

  const confirmation = action === 'approved'
    ? 'Setujui bukti pembayaran ini untuk SIMULASI saja?'
    : 'Tolak bukti pembayaran ini untuk SIMULASI saja?'

  if (!window.confirm(confirmation)) return

  payment.review_status = action
  payment.review_reason =
    action === 'rejected' ? rejectionReason.value.trim() : ''
  payment.reviewed_at = new Date().toLocaleString('id-ID')

  // Status transaksi gateway tidak diubah oleh verifikasi demo.
  reviewMessage.value =
    'Keputusan verifikasi tersimpan sementara di halaman (simulasi frontend).'
}

const formatRupiah = (number) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
}).format(number)

const formatDate = (dateString) => {
  if (!dateString) return '-'

  const [year, month, day] = dateString.split('-').map(Number)

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(year, month - 1, day))
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
  const successful = payments.value.filter(
    payment => payment.status === 'settlement'
  )

  return [
    {
      category: 'Total Pembayaran',
      value: payments.value.length
    },
    {
      category: 'Pembayaran Berhasil',
      value: successful.length
    },
    {
      category: 'Perlu Verifikasi Manual',
      value: payments.value.filter(
        p => p.payment_gateway === 'Manual' &&
          p.review_status === 'needs_review'
      ).length
    },
    {
      category: 'Total Pendapatan',
      value: formatRupiah(
        successful.reduce((sum, p) => sum + p.amount, 0)
      )
    }
  ]
})

const filteredPayments = computed(() => {
  const query = searchText.value.trim().toLowerCase()

  return payments.value.filter(payment => {
    const matchesStatus = !statusFilter.value ||
      (statusFilter.value === 'review_pending'
        ? payment.payment_gateway === 'Manual' &&
          payment.review_status === 'needs_review'
        : payment.status === statusFilter.value)

    const searchable = [
      payment.id,
      payment.order_id,
      payment.customer_name,
      payment.product_name,
      payment.amount,
      formatRupiah(payment.amount),
      payment.status,
      statusLabels[payment.status],
      payment.transaction_id,
      reviewStatus(payment)
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
      : String(left).localeCompare(String(right), 'id', {
          numeric: true
        })

    return sortDirection.value === 'asc'
      ? comparison
      : -comparison
  })
})

const pageCount = computed(() =>
  Math.max(1, Math.ceil(filteredPayments.value.length / itemsPerPage.value))
)

const visiblePayments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value

  return sortedPayments.value.slice(
    start,
    start + itemsPerPage.value
  )
})

const showingStart = computed(() =>
  filteredPayments.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1
)

const showingEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredPayments.value.length
  )
)

watch([searchText, statusFilter, itemsPerPage], () => {
  currentPage.value = 1
})

function toggleSort(column) {
  if (sortColumn.value === column) {
    sortDirection.value =
      sortDirection.value === 'asc' ? 'desc' : 'asc'
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
  currentPage.value = Math.min(
    pageCount.value,
    Math.max(1, page)
  )
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f7f5] text-gray-800">

    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#173f35] text-white md:flex">
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
        <a href="/admin/dashboard" class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
          Dashboard
        </a>

        <a href="/admin/customers" class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
          Pelanggan
        </a>

        <a href="/admin/products" class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
          Produk
        </a>

        <a href="/admin/orders" class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
          Pesanan
        </a>

        <a href="/admin/payments" aria-current="page" class="block rounded-lg bg-[#d5a85b] px-4 py-3 text-sm font-semibold text-[#173f35]">
          Pembayaran
        </a>

        <a href="/admin/shipping" class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
          Pengiriman
        </a>
      </nav>
    </aside>

    <div class="md:ml-64">

      <!-- Topbar -->
      <header class="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-8">
        <div>
          <p class="text-xs font-semibold tracking-widest text-gray-400">
            ADMIN AREA
          </p>
          <h1 class="mt-1 text-xl font-semibold text-gray-800">
            Pembayaran
          </h1>
        </div>

        <div class="text-right">
          <p class="text-sm font-semibold text-gray-800">
            Admin KAKAO
          </p>
          <p class="mt-1 text-xs text-gray-500">
            Pembayaran
          </p>
        </div>
      </header>

      <!-- Main content -->
      <main class="space-y-6 px-4 py-6 sm:px-8 sm:py-8">

        <!-- Statistics -->
        <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Statistik pembayaran">
          <div
            v-for="(stat, index) in paymentStats"
            :key="stat.category"
            class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p class="text-sm text-gray-500">
              {{ stat.category }}
            </p>

            <h3
              class="mt-3 break-words text-2xl font-bold"
              :class="index === 3 ? 'text-[#28634f]' : 'text-gray-800'"
            >
              {{ stat.value }}
            </h3>
          </div>
        </section>

        <!-- Payment table -->
        <section class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

          <div class="border-b border-gray-100 px-5 py-6 sm:px-7">
            <h2 class="text-xl font-bold text-gray-800">
              Pembayaran
            </h2>

            <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <span>Admin</span>
              <span class="text-gray-300">›</span>
              <strong class="font-medium text-[#28634f]">Pembayaran</strong>
            </div>
          </div>

          <!-- Toolbar -->
          <div class="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between sm:px-7">

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">

              <label class="flex items-center gap-2 text-sm text-gray-600">
                Tampilkan

                <select
                  v-model.number="itemsPerPage"
                  aria-label="Jumlah baris per halaman"
                  class="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-[#28634f]"
                >
                  <option :value="5">5</option>
                  <option :value="10">10</option>
                  <option :value="25">25</option>
                  <option :value="50">50</option>
                </select>
              </label>

              <select
                v-model="statusFilter"
                aria-label="Filter status pembayaran"
                class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#28634f]"
              >
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

            <label class="flex w-full items-center gap-3 rounded-lg border border-gray-300 px-3 py-2.5 lg:max-w-xs">
              <span class="text-lg text-gray-400" aria-hidden="true">⌕</span>

              <input
                v-model="searchText"
                type="search"
                placeholder="Cari pembayaran..."
                aria-label="Cari pembayaran"
                class="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </label>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px] text-left">
              <thead class="bg-[#f8faf8]">
                <tr class="border-y border-gray-100 text-xs font-semibold tracking-wide text-gray-500">
                  <th class="px-5 py-4">
                    <button type="button" class="flex items-center gap-2 whitespace-nowrap hover:text-[#28634f]" @click="toggleSort('id')">
                      ID PEMBAYARAN
                      <span>{{ sortIcon('id') }}</span>
                    </button>
                  </th>

                  <th class="px-5 py-4">
                    <button type="button" class="flex items-center gap-2 whitespace-nowrap hover:text-[#28634f]" @click="toggleSort('order_id')">
                      ID PESANAN
                      <span>{{ sortIcon('order_id') }}</span>
                    </button>
                  </th>

                  <th class="px-5 py-4">
                    <button type="button" class="flex items-center gap-2 whitespace-nowrap hover:text-[#28634f]" @click="toggleSort('amount')">
                      TOTAL
                      <span>{{ sortIcon('amount') }}</span>
                    </button>
                  </th>

                  <th class="px-5 py-4">
                    <button type="button" class="flex items-center gap-2 whitespace-nowrap hover:text-[#28634f]" @click="toggleSort('status')">
                      STATUS
                      <span>{{ sortIcon('status') }}</span>
                    </button>
                  </th>

                  <th class="px-5 py-4">
                    VERIFIKASI
                  </th>

                  <th class="px-5 py-4 text-right">
                    AKSI
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="payment in visiblePayments"
                  :key="payment.id"
                  class="border-b border-gray-100 transition hover:bg-gray-50/70"
                >
                  <td class="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#28634f]">
                    {{ payment.id }}
                  </td>

                  <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    {{ payment.order_id }}
                  </td>

                  <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    {{ formatRupiah(payment.amount) }}
                  </td>

                  <td class="px-5 py-4">
                    <span
                      class="inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-700': payment.status === 'settlement',
                        'bg-yellow-100 text-yellow-700': payment.status === 'pending',
                        'bg-red-100 text-red-700': ['deny', 'expire'].includes(payment.status),
                        'bg-gray-100 text-gray-600': ['cancel', 'refund'].includes(payment.status)
                      }"
                    >
                      {{ statusLabels[payment.status] || payment.status }}
                    </span>
                  </td>

                  <td class="px-5 py-4">
                    <span
                      class="inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium"
                      :class="{
                        'bg-blue-50 text-blue-700': payment.payment_gateway !== 'Manual',
                        'bg-yellow-100 text-yellow-700': payment.review_status === 'waiting_proof',
                        'bg-orange-100 text-orange-700': payment.review_status === 'needs_review',
                        'bg-green-100 text-green-700': payment.review_status === 'approved',
                        'bg-red-100 text-red-700': payment.review_status === 'rejected'
                      }"
                    >
                      {{ reviewStatus(payment) }}
                    </span>
                  </td>

                  <td class="px-5 py-4 text-right">
                    <button
                      type="button"
                      class="whitespace-nowrap rounded-lg border border-[#28634f] px-3 py-2 text-xs font-medium text-[#28634f] transition hover:bg-[#28634f] hover:text-white"
                      @click="openPayment(payment)"
                    >
                      Detail / Verifikasi
                    </button>
                  </td>
                </tr>

                <tr v-if="visiblePayments.length === 0">
                  <td colspan="6" class="px-5 py-12 text-center text-sm text-gray-500">
                    Tidak ada pembayaran yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p class="text-sm text-gray-500">
              Menampilkan {{ showingStart }}–{{ showingEnd }} dari {{ filteredPayments.length }} pembayaran
            </p>

            <div class="flex flex-wrap items-center gap-1">
              <button
                type="button"
                :disabled="currentPage === 1"
                aria-label="Halaman sebelumnya"
                class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                @click="goToPage(currentPage - 1)"
              >
                ‹
              </button>

              <button
                v-for="page in pageCount"
                :key="page"
                type="button"
                :aria-current="page === currentPage ? 'page' : undefined"
                class="h-9 min-w-9 rounded-lg border px-3 text-sm transition"
                :class="page === currentPage
                  ? 'border-[#28634f] bg-[#28634f] text-white'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>

              <button
                type="button"
                :disabled="currentPage === pageCount"
                aria-label="Halaman berikutnya"
                class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                @click="goToPage(currentPage + 1)"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-200 bg-white px-5 py-5 sm:px-8">
        <div class="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 KAKAO</p>
          <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
        </div>
      </footer>
    </div>

    <!-- Modal detail pembayaran -->
    <div
      v-if="selectedPayment"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      @click.self="closePayment"
    >
      <div
        class="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-detail-title"
      >

        <!-- Modal header -->
        <div class="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-7">
          <div>
            <p class="text-xs font-semibold tracking-widest text-gray-400">
              RINCIAN TRANSAKSI
            </p>

            <h2 id="payment-detail-title" class="mt-2 text-xl font-bold text-gray-800">
              {{ selectedPayment.id }}
            </h2>
          </div>

          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Tutup detail"
            @click="closePayment"
          >
            ×
          </button>
        </div>

        <!-- Payment details -->
        <div class="max-h-[65vh] overflow-y-auto px-5 py-5 sm:px-7">

          <dl class="divide-y divide-gray-100">
            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">ID Pesanan</dt>
              <dd class="text-sm font-medium text-gray-800">{{ selectedPayment.order_id }}</dd>
            </div>

            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Pelanggan</dt>
              <dd class="text-sm font-medium text-gray-800">{{ selectedPayment.customer_name }}</dd>
            </div>

            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Produk</dt>
              <dd class="text-sm font-medium text-gray-800">{{ selectedPayment.product_name }}</dd>
            </div>

            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Total</dt>
              <dd class="text-sm font-semibold text-[#28634f]">{{ formatRupiah(selectedPayment.amount) }}</dd>
            </div>

            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Metode Pembayaran</dt>
              <dd class="text-sm font-medium text-gray-800">{{ methodLabels[selectedPayment.payment_method] || selectedPayment.payment_method }}</dd>
            </div>

            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Gateway</dt>
              <dd class="text-sm font-medium text-gray-800">{{ selectedPayment.payment_gateway }}</dd>
            </div>

            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">ID Transaksi</dt>
              <dd class="break-all text-sm font-medium text-gray-800">{{ selectedPayment.transaction_id }}</dd>
            </div>

            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Tanggal</dt>
              <dd class="text-sm font-medium text-gray-800">{{ formatDate(selectedPayment.payment_date) }}</dd>
            </div>

            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Status Transaksi</dt>
              <dd class="text-sm font-medium text-gray-800">{{ statusLabels[selectedPayment.status] || selectedPayment.status }}</dd>
            </div>

            <div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Verifikasi Admin</dt>
              <dd class="text-sm font-medium text-gray-800">{{ reviewStatus(selectedPayment) }}</dd>
            </div>

            <div v-if="selectedPayment.reviewed_at" class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Waktu Tinjau (Demo)</dt>
              <dd class="text-sm font-medium text-gray-800">{{ selectedPayment.reviewed_at }}</dd>
            </div>

            <div v-if="selectedPayment.review_reason" class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
              <dt class="text-sm text-gray-500">Alasan Penolakan</dt>
              <dd class="text-sm font-medium text-gray-800">{{ selectedPayment.review_reason }}</dd>
            </div>
          </dl>

          <!-- Verification panel -->
          <section class="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5" aria-label="Verifikasi pembayaran">
            <h3 class="font-semibold text-gray-800">
              Verifikasi Pembayaran
            </h3>

            <p class="mt-2 text-xs leading-5 text-amber-700">
              Mode demo frontend: keputusan di sini bukan konfirmasi bank/Midtrans, tidak dikirim ke server, dan hilang saat halaman dimuat ulang.
            </p>

            <template v-if="selectedPayment.payment_gateway === 'Manual' && selectedPayment.status === 'pending'">

              <label
                v-if="['waiting_proof', 'needs_review'].includes(selectedPayment.review_status)"
                class="mt-4 block cursor-pointer rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-600 transition hover:border-[#28634f]"
              >
                <span class="font-medium text-[#28634f]">
                  Simulasikan bukti dari pelanggan
                </span>

                <span class="mt-1 block text-xs text-gray-500">
                  JPG/PNG/PDF, maksimal 3 MB
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  class="mt-3 block w-full text-xs"
                  @change="handleSampleProof"
                />
              </label>

              <div v-if="selectedPayment.proofData" class="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                <strong class="break-words text-sm text-gray-700">
                  Bukti contoh: {{ selectedPayment.proofName }}
                </strong>

                <img
                  v-if="selectedPayment.proofType.startsWith('image/')"
                  :src="selectedPayment.proofData"
                  alt="Pratinjau bukti pembayaran contoh"
                  class="mt-3 max-h-64 w-full rounded-lg border border-gray-100 object-contain"
                />

                <a
                  v-else
                  :href="selectedPayment.proofData"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-3 inline-block text-sm font-medium text-[#28634f] underline"
                >
                  Buka PDF bukti contoh
                </a>
              </div>

              <p v-else class="mt-4 rounded-lg bg-white p-3 text-sm text-gray-500">
                Belum ada bukti pembayaran. Tidak boleh menyetujui tanpa bukti.
              </p>

              <template v-if="selectedPayment.review_status === 'needs_review'">
                <label class="mt-4 block text-sm font-medium text-gray-700">
                  Alasan penolakan (wajib jika menolak)

                  <textarea
                    v-model="rejectionReason"
                    rows="3"
                    placeholder="Jelaskan alasan jika bukti tidak sesuai"
                    class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#28634f] focus:ring-2 focus:ring-[#28634f]/10"
                  ></textarea>
                </label>

                <div class="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    class="rounded-lg bg-[#28634f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4d3c]"
                    @click="reviewPayment('approved')"
                  >
                    Setujui Bukti (Demo)
                  </button>

                  <button
                    type="button"
                    class="rounded-lg border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    @click="reviewPayment('rejected')"
                  >
                    Tolak Bukti (Demo)
                  </button>
                </div>
              </template>

              <p
                v-if="selectedPayment.review_status === 'approved'"
                class="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700"
              >
                Bukti disetujui dalam simulasi. Status transaksi tetap mengikuti konfirmasi pembayaran sebenarnya.
              </p>

              <p
                v-if="selectedPayment.review_status === 'rejected'"
                class="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                Bukti ditolak dalam simulasi. Pelanggan perlu mengirim bukti yang sesuai.
              </p>
            </template>

            <p v-else class="mt-4 rounded-lg bg-white p-3 text-sm leading-5 text-gray-600">
              Transaksi ini dikelola oleh {{ selectedPayment.payment_gateway }}. Status pembayaran harus mengikuti notifikasi resmi penyedia pembayaran, bukan tombol persetujuan manual.
            </p>

            <p
              v-if="reviewMessage"
              role="status"
              class="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700"
            >
              {{ reviewMessage }}
            </p>
          </section>
        </div>

        <!-- Modal footer -->
        <div class="border-t border-gray-100 px-5 py-4 sm:px-7">
          <button
            type="button"
            class="w-full rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto"
            @click="closePayment"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
