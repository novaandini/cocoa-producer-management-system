<script setup>
import { computed, ref } from 'vue'

// PROTOTIPE FRONTEND: tidak terhubung ke bank, QRIS, VA, atau server.
// Gunakan file contoh saja, jangan bukti transfer atau data sensitif asli.
const STORAGE_KEY = 'kakao_demo_customer_payments'
const MAX_FILE_SIZE = 1024 * 1024 // 1 MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

const isCustomer = ref(localStorage.getItem('userRole') === 'CUSTOMER')

function loadCheckout() {
  try {
    const data = JSON.parse(sessionStorage.getItem('checkoutData') || 'null')
    if (!data?.customer || !data?.product) return null
    if (!data.orderId) {
      data.orderId = `ORD-DEMO-${Date.now().toString(36).toUpperCase()}`
      sessionStorage.setItem('checkoutData', JSON.stringify(data))
    }
    return data
  } catch {
    return null
  }
}

function loadPayments() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

const checkout = ref(loadCheckout())
const orderId = computed(() => checkout.value?.orderId || '')
const product = computed(() => checkout.value?.product || {})
const customer = computed(() => checkout.value?.customer || {})
const productName = computed(() => product.value.name || 'Produk Kakao')
const quantity = computed(() => Number(product.value.quantity_kg) || 1)
const productImage = computed(() => {
  const images = {
    a: '/kakao-home/cocoa-bean-a.jpg', b: '/kakao-home/cocoa-bean-b.jpg',
    c: '/kakao-home/cocoa-bean-c.jpg', d: '/kakao-home/cocoa-bean-d.jpg',
    e: '/kakao-home/cocoa-bean-e.jpg', f: '/kakao-home/cocoa-bean-f.png',
    g: '/kakao-home/cocoa-bean-g.jpg', h: '/kakao-home/cocoa-bean-h.jpg'
  }
  return images[product.value.id] || '/kakao-home/logo-kakao.png'
})

// Checkout KAKAO sekarang belum memiliki harga, jadi nominal tidak dikarang.
const totalText = 'Rp -'
const selectedMethod = ref('')
const savedPayment = ref(loadPayments().find(p => p.order_id === orderId.value) || null)
const stage = ref(savedPayment.value?.proofData && savedPayment.value?.review_status !== 'rejected'
  ? 'success' : 'choose')
const proofFile = ref(null)
const proofData = ref('')
const errorMessage = ref('')
const infoMessage = ref('')

const methodOptions = [
  { value: 'bank_transfer', icon: 'BANK', name: 'Transfer Bank', description: 'Transfer melalui rekening bank.' },
  { value: 'va', icon: 'VA', name: 'Virtual Account', description: 'Bayar menggunakan nomor virtual account.' },
  { value: 'qris', icon: 'QR', name: 'QRIS', description: 'Scan QR menggunakan aplikasi pembayaran.' }
]
const methodTitle = computed(() => ({
  bank_transfer: 'Transfer Bank', va: 'Virtual Account', qris: 'Pembayaran QRIS'
})[selectedMethod.value] || 'Metode Pembayaran')
const reviewStatus = computed(() => {
  if (savedPayment.value?.review_status === 'approved') return 'Bukti Disetujui (Simulasi)'
  if (savedPayment.value?.review_status === 'rejected') return 'Bukti Ditolak (Simulasi)'
  if (savedPayment.value?.review_status === 'needs_review') return 'Menunggu Verifikasi'
  return 'Belum Mengirim Bukti'
})

function goToLogin() {
  sessionStorage.setItem('redirectAfterLogin', 'payment')
  window.location.href = '/login'
}

function proceedToDetail() {
  errorMessage.value = ''
  if (!selectedMethod.value) {
    errorMessage.value = 'Pilih metode pembayaran terlebih dahulu.'
    return
  }
  stage.value = 'detail'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function backToMethods() {
  errorMessage.value = ''
  stage.value = 'choose'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onProofChange(event) {
  proofFile.value = null
  proofData.value = ''
  errorMessage.value = ''
  const chosen = event.target.files?.[0]
  if (!chosen) return
  if (!ALLOWED_FILE_TYPES.includes(chosen.type)) {
    errorMessage.value = 'Gunakan file contoh JPG, PNG, atau PDF.'
    event.target.value = ''
    return
  }
  if (chosen.size > MAX_FILE_SIZE) {
    errorMessage.value = 'Ukuran file maksimal 1 MB untuk penyimpanan demo browser.'
    event.target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    proofFile.value = chosen
    proofData.value = typeof reader.result === 'string' ? reader.result : ''
    if (!proofData.value) errorMessage.value = 'File gagal dibaca. Coba pilih lagi.'
  }
  reader.onerror = () => { errorMessage.value = 'File gagal dibaca. Coba pilih lagi.' }
  reader.readAsDataURL(chosen)
}

function submitProof() {
  errorMessage.value = ''
  if (!isCustomer.value || !checkout.value) {
    errorMessage.value = 'Data pelanggan dan checkout belum tersedia.'
    return
  }
  if (!selectedMethod.value) {
    errorMessage.value = 'Metode pembayaran belum dipilih.'
    return
  }
  if (!proofFile.value || !proofData.value) {
    errorMessage.value = 'Pilih dan unggah bukti pembayaran CONTOH terlebih dahulu.'
    return
  }
  if (savedPayment.value?.review_status === 'approved') {
    errorMessage.value = 'Bukti sudah disetujui pada simulasi ini.'
    return
  }

  const entries = loadPayments()
  const prior = entries.find(p => p.order_id === orderId.value)
  const now = new Date()
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const payment = {
    id: prior?.id || `PAY-${orderId.value}`,
    order_id: orderId.value,
    customer_name: customer.value.name || '-',
    product_name: productName.value,
    amount: null, // Harga belum diisi pada Checkout.
    payment_method: selectedMethod.value,
    payment_gateway: 'Manual',
    transaction_id: '-',
    status: 'pending', // Upload bukti TIDAK membuktikan uang sudah diterima.
    payment_date: date,
    review_status: 'needs_review',
    proofData: proofData.value,
    proofName: proofFile.value.name,
    proofType: proofFile.value.type,
    review_reason: '',
    reviewed_at: ''
  }

  const index = entries.findIndex(p => p.order_id === orderId.value)
  if (index >= 0) entries[index] = payment
  else entries.push(payment)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    savedPayment.value = payment
    proofFile.value = null
    proofData.value = ''
    infoMessage.value = 'Bukti contoh disimpan di browser. Menunggu verifikasi Admin (simulasi).'
    stage.value = 'success'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch {
    errorMessage.value = 'Gagal menyimpan bukti contoh. Penyimpanan browser mungkin penuh.'
  }
}

function refreshStatus() {
  savedPayment.value = loadPayments().find(p => p.order_id === orderId.value) || null
  infoMessage.value = 'Status simulasi diperbarui dari penyimpanan browser.'
  if (savedPayment.value?.review_status === 'rejected') stage.value = 'choose'
}
</script>

<template>
  <div class="kakao-payment">
    <header class="payment-header">
      <a href="/" class="payment-logo"><img src="/kakao-home/logo-kakao.png" alt="Logo KAKAO"></a>
      <a href="/products" class="back-link">← Kembali ke Produk</a>
    </header>

    <main class="payment-page">
      <section v-if="!isCustomer" class="payment-method empty-message">
        <p class="section-label">PEMBAYARAN</p>
        <h2>Silakan Login sebagai Customer</h2>
        <p>Login diperlukan sebelum melanjutkan pembayaran.</p>
        <button type="button" class="payment-button" @click="goToLogin">Login Customer</button>
      </section>

      <section v-else-if="!checkout" class="payment-method empty-message">
        <p class="section-label">PEMBAYARAN</p>
        <h2>Pesanan belum ditemukan</h2>
        <p>Pilih produk dan isi Checkout terlebih dahulu.</p>
        <a class="payment-button" href="/products">Pilih Produk</a>
      </section>

      <template v-else>
        <!-- TAHAP 1: mengikuti struktur desain HTML Payment lama -->
        <div v-if="stage === 'choose'" id="paymentContent">
          <section class="payment-heading">
            <p class="section-label">PEMBAYARAN</p>
            <h1>Selesaikan <span>Pembayaran Anda</span></h1>
            <p class="payment-description">Pilih metode pembayaran yang ingin digunakan untuk menyelesaikan pesanan.</p>
          </section>

          <section class="payment-container">
            <div class="payment-method">
              <div class="method-heading">
                <p class="section-label">METODE PEMBAYARAN</p>
                <h2>Pilih Pembayaran</h2>
              </div>
              <form id="paymentForm" @submit.prevent="proceedToDetail">
                <label v-for="option in methodOptions" :key="option.value" class="payment-option" :class="{ selected: selectedMethod === option.value }">
                  <input v-model="selectedMethod" type="radio" name="payment" :value="option.value" required>
                  <span class="option-icon">{{ option.icon }}</span>
                  <span class="option-content"><strong>{{ option.name }}</strong><span>{{ option.description }}</span></span>
                </label>
              </form>
              <div class="payment-information">
                <strong>Mode Demo Frontend</strong>
                <p>Rekening bank, nomor VA, dan QRIS resmi belum dikonfigurasi. Jangan transfer uang atau gunakan bukti pembayaran asli.</p>
              </div>
            </div>

            <aside class="order-summary">
              <div class="summary-heading"><p class="section-label">DETAIL PESANAN</p><h2>Ringkasan Pesanan</h2></div>
              <div class="order-number"><span>Nomor Pesanan</span><strong>{{ orderId }}</strong></div>
              <div class="summary-product">
                <img :src="productImage" :alt="productName">
                <div class="summary-product-info"><span>{{ product.type || 'PRODUK KAKAO' }}</span><h3>{{ productName }}</h3><p>Grade {{ product.grade || '-' }}</p></div>
              </div>
              <div class="summary-detail">
                <div><span>Jumlah</span><strong>{{ quantity }} kg</strong></div>
                <div><span>Jenis</span><strong>{{ product.type || '-' }}</strong></div>
                <div><span>Grade</span><strong>{{ product.grade || '-' }}</strong></div>
              </div>
              <div class="summary-total"><span>Total Pembayaran</span><strong>{{ totalText }}</strong></div>
              <p class="payment-note">Nominal belum tersedia karena harga produk belum ditentukan pada Checkout.</p>
              <p v-if="savedPayment?.review_status === 'rejected'" class="feedback error">Bukti sebelumnya ditolak. {{ savedPayment.review_reason || 'Silakan kirim ulang bukti contoh.' }}</p>
              <p v-if="errorMessage" class="feedback error" role="alert">{{ errorMessage }}</p>
              <button type="submit" form="paymentForm" class="payment-button">Lanjutkan Pembayaran</button>
            </aside>
          </section>
        </div>

        <!-- TAHAP 2: detail metode pembayaran -->
        <section v-else-if="stage === 'detail'" id="paymentDetail" class="payment-detail">
          <p class="section-label">DETAIL PEMBAYARAN</p>
          <h2>{{ methodTitle }}</h2>
          <div class="payment-detail-content">
            <template v-if="selectedMethod === 'bank_transfer'">
              <div class="payment-account"><span>Bank Tujuan</span><strong>Belum Dikonfigurasi</strong><p>Nomor rekening resmi belum tersedia. Jangan melakukan transfer sungguhan.</p></div>
            </template>
            <template v-else-if="selectedMethod === 'va'">
              <div class="payment-account"><span>Nomor Virtual Account</span><strong>Belum Dikonfigurasi</strong><p>Nomor VA hanya dapat diterbitkan setelah integrasi penyedia pembayaran.</p></div>
            </template>
            <template v-else>
              <div class="qris-area"><div class="qris-placeholder">QRIS</div><p>QRIS resmi belum tersedia. Kotak ini hanya placeholder, bukan kode pembayaran.</p></div>
            </template>
          </div>
          <div class="payment-total-detail"><span>Total Pembayaran</span><strong>{{ totalText }}</strong></div>
          <p class="demo-note">Untuk menguji frontend, pilih file bukti pembayaran DUMMY JPG/PNG/PDF (maksimal 1 MB). Jangan gunakan bukti transaksi sebenarnya.</p>
          <div class="proof-upload">
            <label for="paymentProof">Unggah Bukti Pembayaran (Contoh)</label>
            <input id="paymentProof" type="file" accept="image/jpeg,image/png,application/pdf" @change="onProofChange">
            <p v-if="proofFile" class="file-selected">File dipilih: {{ proofFile.name }}</p>
            <img v-if="proofData && proofFile?.type.startsWith('image/')" :src="proofData" class="proof-preview" alt="Pratinjau bukti pembayaran contoh">
          </div>
          <p v-if="errorMessage" class="feedback error" role="alert">{{ errorMessage }}</p>
          <button type="button" class="paid-button" @click="submitProof">Saya Sudah Bayar (Kirim Bukti Demo)</button>
          <button type="button" class="change-payment" @click="backToMethods">← Ganti Metode Pembayaran</button>
        </section>

        <!-- TAHAP 3: bukti dikirim, bukan konfirmasi transaksi berhasil -->
        <section v-else id="paymentSuccess" class="payment-success">
          <div class="success-icon">✓</div>
          <p class="section-label">BUKTI PEMBAYARAN DIKIRIM</p>
          <h2>{{ savedPayment?.review_status === 'approved' ? 'Bukti Disetujui (Simulasi)' : 'Pembayaran Menunggu Verifikasi' }}</h2>
          <p class="success-description">Bukti contoh sudah tersimpan di browser. Verifikasi Admin di sini hanya simulasi dan tidak menyatakan bahwa dana telah diterima.</p>
          <div class="success-info">
            <div><span>Nomor Pesanan</span><strong>{{ orderId }}</strong></div>
            <div><span>Status Verifikasi</span><strong class="waiting-status">{{ reviewStatus }}</strong></div>
            <div v-if="savedPayment?.proofName"><span>Nama File</span><strong>{{ savedPayment.proofName }}</strong></div>
          </div>
          <p v-if="infoMessage" class="feedback success" role="status">{{ infoMessage }}</p>
          <button type="button" class="change-payment refresh-action" @click="refreshStatus">Perbarui Status Verifikasi</button>
          <div class="success-actions">
            <a href="/" class="home-button">Kembali ke Beranda</a>
            <a href="/traceability" class="tracking-button">
            Lihat Tahapan Produk →</a>
          </div>
        </section>
      </template>
    </main>

    <footer class="payment-footer"><p>© 2026 KAKAO</p><p>Sistem Informasi Penjualan dan Pemesanan Kakao</p></footer>
  </div>
</template>

<style scoped src="./PaymentView.css"></style>
