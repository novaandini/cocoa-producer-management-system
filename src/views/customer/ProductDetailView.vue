<script setup>
import { computed, ref } from 'vue'

// Data yang sama seperti script.js Detail Produk lama.
// Nantinya dapat dipindahkan ke store atau diambil melalui backend.
const products = {
  a: {
    name: 'Cocoa Bean A', category: 'FERMENTASI', grade: 'A',
    type: 'Fermentasi', stock: 500, image: '/kakao-home/cocoa-bean-a.jpg',
    description: 'Biji kakao fermentasi dengan kualitas Grade A yang diproses untuk menghasilkan kualitas kakao yang baik dan sesuai kebutuhan.',
    descriptionOne: 'Cocoa Bean A merupakan biji kakao fermentasi dengan kualitas Grade A. Produk ini tersedia dalam jumlah stok 500 kg.'
  },
  b: {
    name: 'Cocoa Bean B', category: 'FERMENTASI', grade: 'B',
    type: 'Fermentasi', stock: 800, image: '/kakao-home/cocoa-bean-b.jpg',
    description: 'Biji kakao fermentasi dengan kualitas Grade B yang tersedia untuk memenuhi kebutuhan customer.',
    descriptionOne: 'Cocoa Bean B merupakan biji kakao fermentasi dengan kualitas Grade B. Produk ini tersedia dalam jumlah stok 800 kg.'
  },
  c: {
    name: 'Cocoa Bean C', category: 'NON-FERMENTASI', grade: 'C',
    type: 'Non-Fermentasi', stock: 300, image: '/kakao-home/cocoa-bean-c.jpg',
    description: 'Biji kakao non-fermentasi dengan kualitas Grade C yang tersedia untuk memenuhi kebutuhan customer.',
    descriptionOne: 'Cocoa Bean C merupakan biji kakao non-fermentasi dengan kualitas Grade C. Produk ini tersedia dalam jumlah stok 300 kg.'
  },
  d: {
    name: 'Cocoa Bean D', category: 'FERMENTASI', grade: 'A',
    type: 'Fermentasi', stock: 650, image: '/kakao-home/cocoa-bean-d.jpg',
    description: 'Biji kakao fermentasi Grade A dengan ketersediaan stok 650 kg.',
    descriptionOne: 'Cocoa Bean D merupakan biji kakao fermentasi dengan kualitas Grade A. Produk ini tersedia dalam jumlah stok 650 kg.'
  },
  e: {
    name: 'Cocoa Bean E', category: 'FERMENTASI', grade: 'B',
    type: 'Fermentasi', stock: 450, image: '/kakao-home/cocoa-bean-e.jpg',
    description: 'Biji kakao fermentasi Grade B dengan ketersediaan stok 450 kg.',
    descriptionOne: 'Cocoa Bean E merupakan biji kakao fermentasi dengan kualitas Grade B. Produk ini tersedia dalam jumlah stok 450 kg.'
  },
  f: {
    name: 'Cocoa Bean F', category: 'NON-FERMENTASI', grade: 'B',
    type: 'Non-Fermentasi', stock: 700, image: '/kakao-home/cocoa-bean-f.png',
    description: 'Biji kakao non-fermentasi Grade B dengan stok 700 kg.',
    descriptionOne: 'Cocoa Bean F merupakan biji kakao non-fermentasi dengan kualitas Grade B. Produk ini tersedia dalam jumlah stok 700 kg.'
  },
  g: {
    name: 'Cocoa Bean G', category: 'FERMENTASI', grade: 'C',
    type: 'Fermentasi', stock: 350, image: '/kakao-home/cocoa-bean-g.jpg',
    description: 'Biji kakao fermentasi Grade C dengan ketersediaan stok 350 kg.',
    descriptionOne: 'Cocoa Bean G merupakan biji kakao fermentasi dengan kualitas Grade C. Produk ini tersedia dalam jumlah stok 350 kg.'
  },
  h: {
    name: 'Cocoa Bean H', category: 'NON-FERMENTASI', grade: 'A',
    type: 'Non-Fermentasi', stock: 550, image: '/kakao-home/cocoa-bean-h.jpg',
    description: 'Biji kakao non-fermentasi Grade A dengan stok 550 kg.',
    descriptionOne: 'Cocoa Bean H merupakan biji kakao non-fermentasi dengan kualitas Grade A. Produk ini tersedia dalam jumlah stok 550 kg.'
  }
}

// Contoh: /detail-product?product=b akan menampilkan Cocoa Bean B.
const requestedId = new URLSearchParams(window.location.search).get('product')
const productId = Object.hasOwn(products, requestedId) ? requestedId : 'a'
const product = computed(() => products[productId])
const quantity = ref(1)

function normalizedQuantity(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return 1
  return Math.min(product.value.stock, Math.max(1, Math.trunc(number)))
}

function updateQuantity(event) {
  quantity.value = normalizedQuantity(event.target.value)
  event.target.value = String(quantity.value)
}

function decreaseQuantity() {
  quantity.value = normalizedQuantity(quantity.value - 1)
}

function increaseQuantity() {
  quantity.value = normalizedQuantity(quantity.value + 1)
}

function pesanSekarang() {
  // Simpan pilihan untuk tahap checkout berikutnya.
  sessionStorage.setItem('selectedProduct', JSON.stringify({
    id: productId,
    name: product.value.name,
    quantity_kg: quantity.value
  }))

  // Ini hanya pengecekan antarmuka untuk demo frontend.
  // Akses pesanan/pembayaran yang sebenarnya wajib divalidasi backend.
  const role = localStorage.getItem('userRole')

  if (role === 'CUSTOMER') {
    window.location.href = '/checkout'
  } else {
    sessionStorage.setItem('redirectAfterLogin', 'checkout')
    window.alert('Silakan terlebih dahulu untuk melakukan pemesanan.')
    // Login lama, sementara belum dikonversi ke Vue.
    window.location.href = '/login'
  }
}
</script>

<template>
  <div class="kakao-detail">
    <!-- NAVBAR -->
    <header class="header">
      <nav class="navbar">
        <a href="/" class="logo">
          <img src="/kakao-home/logo-kakao.png" alt="Logo KAKAO">
        </a>
        <a href="/" class="back-home">← Kembali ke Beranda</a>
      </nav>
    </header>

    <main>
      <!-- DETAIL PRODUK -->
      <section class="product-detail">
        <div class="detail-image">
          <img :src="product.image" :alt="product.name">
          <span class="detail-badge">GRADE {{ product.grade }}</span>
        </div>

        <div class="detail-content">
          <p class="section-label">{{ product.category }}</p>
          <h1>{{ product.name }}</h1>
          <p class="detail-description">{{ product.description }}</p>

          <div class="detail-information">
            <div>
              <span>Grade</span>
              <strong>{{ product.grade }}</strong>
            </div>
            <div>
              <span>Jenis</span>
              <strong>{{ product.type }}</strong>
            </div>
            <div>
              <span>Stok</span>
              <strong>{{ product.stock }} kg</strong>
            </div>
          </div>

          <div class="order-box">
            <div class="quantity-area">
              <label for="quantity">Jumlah</label>
              <div class="quantity-control">
                <button type="button" aria-label="Kurangi jumlah" @click="decreaseQuantity">−</button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  :max="product.stock"
                  :value="quantity"
                  @change="updateQuantity"
                  @blur="updateQuantity"
                >
                <button type="button" aria-label="Tambah jumlah" @click="increaseQuantity">+</button>
              </div>
            </div>
            <button type="button" class="order-button" @click="pesanSekarang">
              Pesan Sekarang
            </button>
          </div>

          <div class="trace-note">
            <span>✓</span>
            <p>Informasi produk dan proses pemesanan dapat dipantau melalui sistem.</p>
          </div>
        </div>
      </section>

      <!-- INFORMASI PRODUK -->
      <section class="detail-description-section">
        <div class="description-title">
          <p class="section-label">INFORMASI PRODUK</p>
          <h2>Detail Produk</h2>
        </div>
        <div class="description-text">
          <p>{{ product.descriptionOne }}</p>
          <p>Pelanggan dapat menentukan jumlah produk yang ingin dipesan sebelum melanjutkan ke halaman checkout.</p>
        </div>
      </section>

      <section class="back-products">
        <a href="/products">← Kembali ke Produk</a>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-brand">
          <a href="/" class="footer-logo">KAKAO</a>
          <p>Sistem informasi untuk membantu pengelolaan penjualan kakao secara terstruktur, transparan, dan mudah dipantau.</p>
        </div>

        <div class="footer-links">
          <div>
            <h4>Menu</h4>
            <a href="/">Beranda</a>
            <a href="/products">Produk</a>
            <a href="/#about">Tentang</a>
          </div>
          <div>
            <h4>Informasi</h4>
            <a href="/source_code/frontend/traceability/index.html">Ketertelusuran</a>
            <a href="/admin/login/index.html">Masuk</a>
            <a href="#" @click.prevent="pesanSekarang">Checkout</a>
          </div>
          <div>
            <h4>Kontak</h4>
            <p>info@kakao.com</p>
            <p>Indonesia</p>
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

<style scoped src="./ProductDetailView.css"></style>
