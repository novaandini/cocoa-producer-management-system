<script setup>
import { computed, reactive, ref } from 'vue'

// Informasi produk sementara. Nantinya dapat diganti dengan data API/backend.
// ID dan stok mengikuti data ProductDetailView.vue sebelumnya.
const products = {
  a: { name: 'Cocoa Bean A', category: 'FERMENTASI', type: 'Fermentasi', grade: 'A', stock: 500, image: '/kakao-home/cocoa-bean-a.jpg' },
  b: { name: 'Cocoa Bean B', category: 'FERMENTASI', type: 'Fermentasi', grade: 'B', stock: 800, image: '/kakao-home/cocoa-bean-b.jpg' },
  c: { name: 'Cocoa Bean C', category: 'NON-FERMENTASI', type: 'Non-Fermentasi', grade: 'C', stock: 300, image: '/kakao-home/cocoa-bean-c.jpg' },
  d: { name: 'Cocoa Bean D', category: 'FERMENTASI', type: 'Fermentasi', grade: 'A', stock: 650, image: '/kakao-home/cocoa-bean-d.jpg' },
  e: { name: 'Cocoa Bean E', category: 'FERMENTASI', type: 'Fermentasi', grade: 'B', stock: 450, image: '/kakao-home/cocoa-bean-e.jpg' },
  f: { name: 'Cocoa Bean F', category: 'NON-FERMENTASI', type: 'Non-Fermentasi', grade: 'B', stock: 700, image: '/kakao-home/cocoa-bean-f.png' },
  g: { name: 'Cocoa Bean G', category: 'FERMENTASI', type: 'Fermentasi', grade: 'C', stock: 350, image: '/kakao-home/cocoa-bean-g.jpg' },
  h: { name: 'Cocoa Bean H', category: 'NON-FERMENTASI', type: 'Non-Fermentasi', grade: 'A', stock: 550, image: '/kakao-home/cocoa-bean-h.jpg' }
}

// ProductDetailView.vue sudah menyimpan data dengan key 'selectedProduct':
// { id: 'a', name: 'Cocoa Bean A', quantity_kg: 1 }
function readSelectedProduct() {
  try {
    const value = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null')
    if (!value || typeof value.id !== 'string' || !Object.prototype.hasOwnProperty.call(products, value.id)) {
      return null
    }

    const stock = products[value.id].stock
    const amount = Number(value.quantity_kg)
    const quantity_kg = Number.isFinite(amount)
      ? Math.min(stock, Math.max(1, Math.trunc(amount)))
      : 1

    return { id: value.id, quantity_kg }
  } catch {
    return null
  }
}

const isCustomer = ref(localStorage.getItem('userRole') === 'CUSTOMER')
const selectedProduct = ref(readSelectedProduct())
const product = computed(() => selectedProduct.value ? products[selectedProduct.value.id] : null)
const backToDetail = computed(() => selectedProduct.value
  ? `/detail-product?product=${selectedProduct.value.id}`
  : '/products')

const form = reactive({
  company: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  notes: ''
})
const errorMessage = ref('')

function goToLogin() {
  sessionStorage.setItem('redirectAfterLogin', 'checkout')
  // Halaman Login masih HTML lama. Saat Login dikonversi ke Vue,
  // ganti alamat ini dengan /login.
   window.location.href = '/login'
}

function submitOrder() {
  errorMessage.value = ''

  // Hanya untuk DEMO sisi frontend. Backend tetap wajib mengecek sesi login.
  if (localStorage.getItem('userRole') !== 'CUSTOMER') {
    isCustomer.value = false
    errorMessage.value = 'Silakan masuk sebagai pelanggan terlebih dahulu.'
    return
  }
  if (!selectedProduct.value || !product.value) {
    errorMessage.value = 'Pilih produk terlebih dahulu sebelum membuat pesanan.'
    return
  }
  if (!form.name || !form.email || !form.phone || !form.address) {
    errorMessage.value = 'Lengkapi data pemesanan dan alamat pengiriman.'
    return
  }

  // Sementara simpan data form untuk tahap Payment. BELUM tersimpan ke database.
  // Jangan gunakan sessionStorage sebagai sumber kebenaran harga/stok/transaksi nyata.
  sessionStorage.setItem('checkoutData', JSON.stringify({
    customer: { ...form },
    product: {
      id: selectedProduct.value.id,
      name: product.value.name,
      grade: product.value.grade,
      type: product.value.type,
      quantity_kg: selectedProduct.value.quantity_kg
    }
  }))

  // Payment belum dikonversi ke Vue: untuk sementara menuju HTML lama.
  // Ubah ke '/payment' setelah PaymentView.vue tersedia dan route diatur.
  window.location.href = '/payment'
}
</script>

<template>
  <div class="kakao-checkout">
    <!-- HEADER -->
    <header class="checkout-header">
      <a href="/" class="checkout-logo">
        <img src="/kakao-home/logo-kakao.png" alt="Logo KAKAO">
      </a>
      <a :href="backToDetail" class="back-link">← Kembali ke Detail Produk</a>
    </header>

    <main class="checkout-page">
      <section class="checkout-heading">
        <p class="section-label">PEMESANAN</p>
        <h1>Selesaikan <span>Pesanan Anda</span></h1>
        <p class="checkout-description">
          Lengkapi informasi pemesanan dan pengiriman untuk melanjutkan proses pembelian kakao.
        </p>
      </section>

      <!-- Belum login / bukan pelanggan -->
      <section v-if="!isCustomer" class="checkout-state">
        <h2>Silakan masuk terlebih dahulu</h2>
        <p>Pelanggan dapat melihat produk tanpa login, tetapi perlu masuk sebelum checkout dan pembayaran.</p>
        <button type="button" class="checkout-button state-button" @click="goToLogin">Masuk sebagai Pelanggan</button>
        <a href="/products" class="state-link">← Kembali melihat produk</a>
      </section>

      <!-- Sudah login tetapi belum memilih produk -->
      <section v-else-if="!product" class="checkout-state">
        <h2>Belum ada produk yang dipilih</h2>
        <p>Buka halaman produk, pilih Cocoa Bean, kemudian tekan “Pesan Sekarang”.</p>
        <a href="/products" class="state-link">← Pilih Produk</a>
      </section>

      <!-- Pelanggan sudah login dan produk tersedia -->
      <section v-else class="checkout-container">
        <div class="checkout-form">
          <div class="form-heading">
            <p class="section-label">INFORMASI PELANGGAN</p>
            <h2>Data Pemesanan</h2>
          </div>

          <form id="checkoutForm" @submit.prevent="submitOrder">
            <div class="form-group">
              <label for="company">Nama Perusahaan (opsional)</label>
              <input id="company" v-model.trim="form.company" name="company" type="text"
                placeholder="Masukkan nama perusahaan">
            </div>

            <div class="form-group">
              <label for="name">Nama Pemesan</label>
              <input id="name" v-model.trim="form.name" name="name" type="text"
                placeholder="Masukkan nama lengkap" required>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" v-model.trim="form.email" name="email" type="email"
                  placeholder="nama@email.com" required>
              </div>
              <div class="form-group">
                <label for="phone">Nomor Telepon</label>
                <input id="phone" v-model.trim="form.phone" name="phone" type="tel"
                  placeholder="08xxxxxxxxxx" required>
              </div>
            </div>

            <div class="form-group">
              <label for="address">Alamat Pengiriman</label>
              <textarea id="address" v-model.trim="form.address" name="address" rows="5"
                placeholder="Masukkan alamat lengkap pengiriman" required></textarea>
            </div>

            <div class="form-group">
              <label for="notes">Catatan Pesanan</label>
              <textarea id="notes" v-model.trim="form.notes" name="notes" rows="4"
                placeholder="Tambahkan catatan jika diperlukan"></textarea>
            </div>
          </form>
        </div>

        <aside class="order-summary">
          <div class="summary-heading">
            <p class="section-label">RINGKASAN PESANAN</p>
            <h2>Pesanan Anda</h2>
          </div>

          <div class="summary-product">
            <img :src="product.image" :alt="product.name">
            <div class="summary-product-info">
              <span>{{ product.category }}</span>
              <h3>{{ product.name }}</h3>
              <p>Grade {{ product.grade }}</p>
            </div>
          </div>

          <div class="summary-detail">
            <div><span>Jumlah</span><strong>{{ selectedProduct.quantity_kg }} kg</strong></div>
            <div><span>Stok Tersedia</span><strong>{{ product.stock }} kg</strong></div>
            <div><span>Jenis</span><strong>{{ product.type }}</strong></div>
            <div><span>Grade</span><strong>{{ product.grade }}</strong></div>
          </div>

          <div class="summary-total">
            <span>Total Pesanan</span>
            <strong>Rp -</strong>
          </div>
          <p class="price-note">Harga produk belum diatur. Nilai pembayaran belum dapat dihitung.</p>

          <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>
          <button type="submit" form="checkoutForm" class="checkout-button">Buat Pesanan</button>
          <p class="checkout-note">
            Dalam demo ini data formulir disimpan sementara di browser, lalu diarahkan ke halaman pembayaran lama.
          </p>
        </aside>
      </section>
    </main>

    <footer class="checkout-footer">
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>
  </div>
</template>

<style scoped src="./CheckoutView.css"></style>
