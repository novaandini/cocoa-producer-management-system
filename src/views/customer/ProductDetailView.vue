<script setup>
import { computed, ref, onMounted } from 'vue'

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
const productId = requestedId && Object.hasOwn(products, requestedId) ? requestedId : 'a'
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
  quantity.value = normalizedQuantity(quantity.value)
  // Simpan pilihan untuk tahap checkout berikutnya.
  sessionStorage.setItem('selectedProduct', JSON.stringify({
    id: productId,
    name: product.value.name,
    quantity_kg: quantity.value
  }))

  // Pemeriksaan role ini hanya untuk demo frontend.
  // Otorisasi yang sebenarnya tetap harus divalidasi backend.
  const role = localStorage.getItem('userRole')

  if (role === 'CUSTOMER') {
    window.location.href = '/checkout'
  } else {
    sessionStorage.setItem('redirectAfterLogin', 'checkout')
    window.alert('Silakan masuk sebagai pelanggan terlebih dahulu untuk melakukan pemesanan.')
    window.location.href = '/login'
  }
}
// Animasi masuk menggunakan utility Tailwind, tanpa CSS custom.
const isReady = ref(false)
onMounted(() => {
  requestAnimationFrame(() => { isReady.value = true })
})
</script>

<template>
  <div class="kakao-detail min-h-screen overflow-x-hidden bg-[#fffdf9] font-[Arial,Helvetica,sans-serif] leading-[1.6] text-[#38271c] transition-opacity duration-700 motion-reduce:transition-none"
    :class="isReady ? 'opacity-100' : 'opacity-0'">

    <!-- NAVBAR -->
    <header class="w-full bg-[#fffdf9]">
      <nav class="flex h-17.5 items-center justify-between border-b border-[#eadfd5] bg-[#fffdf9] px-5 min-[601px]:h-20 min-[601px]:px-6.25 min-[851px]:px-[max(7%,45px)]">
        <a href="/" class="flex items-center" aria-label="Kembali ke Beranda KAKAO">
          <img src="/kakao-home/logo-kakao.png" alt="Logo KAKAO" class="block h-15 w-18.75 object-contain min-[601px]:h-17.5 min-[601px]:w-22.5" />
        </a>
        <a href="/" class="inline-flex items-center rounded-md border border-[#ded1c7] px-3 py-2 text-2.5 font-semibold text-[#59483c] no-underline transition-all duration-300 hover:-translate-x-0.75 hover:border-[#3b2416] hover:bg-[#3b2416] hover:text-white min-[601px]:px-4 min-[601px]:py-2.5 min-[601px]:text-xs">
          ← Kembali ke Beranda
        </a>
      </nav>
    </header>

    <main>
      <!-- DETAIL PRODUK -->
      <section class="mx-auto mt-8.75 mb-15 grid max-w-287.5 grid-cols-1 items-center gap-10 px-5 min-[601px]:mt-12.5 min-[601px]:px-7.5 min-[851px]:my-20 min-[851px]:grid-cols-2 min-[851px]:gap-17.5">
        <!-- FOTO -->
        <div
          class="group relative h-82.5 overflow-hidden rounded-2.5 bg-[#eee4da] transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 min-[601px]:h-100 min-[601px]:rounded-3.5 min-[851px]:h-130"
          :class="isReady ? 'translate-x-0 opacity-100' : '-translate-x-6.25 opacity-0'"
        >
          <img :src="product.image" :alt="product.name" class="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-103" />
          <span class="absolute top-5 left-5 rounded-sm bg-[#3b2416] px-3.25 py-2 text-2.25 font-bold tracking-[1px] text-white">
            GRADE {{ product.grade }}
          </span>
        </div>

        <!-- INFORMASI PRODUK -->
        <div class="min-w-0 transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 min-[851px]:pr-5"
          :class="isReady ? 'translate-x-0 opacity-100' : 'translate-x-6.25 opacity-0'">
          <p class="mb-3 inline-block text-2.5 font-bold tracking-[2px] text-[#a16038]">{{ product.category }}</p>
          <h1 class="mb-5 font-[Georgia,'Times_New_Roman',serif] text-8 leading-[1.15] font-normal text-[#38271c] min-[601px]:text-10.5">
            {{ product.name }}
          </h1>
          <p class="mb-7.5 max-w-125 text-[13px] leading-[1.8] text-[#806e62] min-[601px]:text-sm">
            {{ product.description }}
          </p>

          <!-- GRADE / JENIS / STOK -->
          <div class="grid grid-cols-1 border-y border-[#eadfd5] min-[601px]:grid-cols-3">
            <div class="border-b border-[#eadfd5] px-3.75 py-5 min-[601px]:border-r min-[601px]:border-b-0">
              <span class="mb-2 block text-2.5 text-[#806e62]">Grade</span>
              <strong class="text-sm text-[#3b2416]">{{ product.grade }}</strong>
            </div>
            <div class="border-b border-[#eadfd5] px-3.75 py-5 min-[601px]:border-r min-[601px]:border-b-0">
              <span class="mb-2 block text-2.5 text-[#806e62]">Jenis</span>
              <strong class="text-sm text-[#3b2416]">{{ product.type }}</strong>
            </div>
            <div class="px-3.75 py-5">
              <span class="mb-2 block text-2.5 text-[#806e62]">Stok</span>
              <strong class="text-sm text-[#3b2416]">{{ product.stock }} kg</strong>
            </div>
          </div>

          <!-- PESAN SEKARANG -->
          <div class="mt-7.5 flex flex-col items-stretch gap-5 min-[601px]:flex-row min-[601px]:items-end">
            <div class="w-full min-[601px]:w-auto">
              <label for="quantity" class="mb-2 block text-2.75 font-bold text-[#59483c]">Jumlah</label>
              <div class="flex h-11.25 w-full items-center overflow-hidden rounded-[5px] border border-[#d8c9bc] bg-white min-[601px]:w-auto">
                <button type="button" aria-label="Kurangi jumlah" :disabled="quantity <= 1" @click="decreaseQuantity"
                  class="h-full w-10 shrink-0 cursor-pointer bg-[#f5eee8] text-lg text-[#3b2416] transition-colors duration-200 hover:bg-[#3b2416] hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
                  −
                </button>
                <input id="quantity" type="number" min="1" :max="product.stock" :value="quantity"
                  @change="updateQuantity" @blur="updateQuantity" aria-label="Jumlah pesanan dalam kilogram"
                  class="h-full w-auto min-w-0 flex-1 appearance-none bg-white px-1 text-center text-[13px] text-[#3b2416] outline-none appearance:textfield; [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none min-[601px]:w-13.75 min-[601px]:flex-none" />
                <button type="button" aria-label="Tambah jumlah" :disabled="quantity >= product.stock" @click="increaseQuantity"
                  class="h-full w-10 shrink-0 cursor-pointer bg-[#f5eee8] text-lg text-[#3b2416] transition-colors duration-200 hover:bg-[#3b2416] hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
                  +
                </button>
              </div>
            </div>
            <button type="button" @click="pesanSekarang"
              class="inline-flex cursor-pointer items-center justify-center rounded-md bg-[#3b2416] px-6.25 py-3.75 text-center text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#75482c] hover:shadow-[0_8px_18px_rgba(59,36,22,0.15)]">
              Pesan Sekarang
            </button>
          </div>

          <div class="mt-6.25 flex items-center gap-3 rounded-md bg-[#f6f0eb] p-3.75">
            <span class="shrink-0 text-[17px] font-bold text-[#66764a]" aria-hidden="true">✓</span>
            <p class="text-[11px] leading-[1.6] text-[#806e62]">
              Informasi produk dan proses pemesanan dapat dipantau melalui sistem.
            </p>
          </div>
        </div>
      </section>

      <!-- INFORMASI PRODUK -->
      <section class="mx-auto grid max-w-287.5 grid-cols-1 gap-6.25 border-t border-[#eadfd5] px-5 py-13.75 min-[601px]:px-7.5 min-[601px]:py-17.5 min-[851px]:grid-cols-[0.8fr_1.2fr] min-[851px]:gap-20">
        <div>
          <p class="mb-3 inline-block text-2.5 font-bold tracking-[2px] text-[#a16038]">INFORMASI PRODUK</p>
          <h2 class="font-[Georgia,'Times_New_Roman',serif] text-7.5 leading-[1.2] font-normal text-[#38271c]">Detail Produk</h2>
        </div>
        <div>
          <p class="mb-4.5 text-[13px] leading-[1.8] text-[#806e62]">{{ product.descriptionOne }}</p>
          <p class="mb-4.5 text-[13px] leading-[1.8] text-[#806e62]">Pelanggan dapat menentukan jumlah produk yang ingin dipesan sebelum melanjutkan ke halaman checkout.</p>
        </div>
      </section>

      <section class="mx-auto max-w-287.5 px-5 pb-15 min-[601px]:px-7.5 min-[601px]:pb-20">
        <a href="/products" class="inline-flex items-center text-xs font-bold text-[#8b5433] no-underline transition-all duration-300 hover:-translate-x-1 hover:text-[#3b2416]">
          ← Kembali ke Produk
        </a>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="bg-[#332116] text-white">
      <div class="mx-auto grid max-w-287.5 grid-cols-1 gap-10 px-5 py-12.5 min-[601px]:px-7.5 min-[601px]:py-16.25 min-[851px]:grid-cols-[1fr_1.5fr] min-[851px]:gap-25">
        <div>
          <a href="/" class="font-[Georgia,'Times_New_Roman',serif] text-6.25 font-normal text-white no-underline">KAKAO</a>
          <p class="mt-4.5 max-w-80 text-[11px] leading-[1.8] text-[#c8b8ab]">
            Sistem informasi untuk membantu pengelolaan penjualan kakao secara terstruktur, transparan, dan mudah dipantau.
          </p>
        </div>
        <div class="grid grid-cols-1 gap-7.5 min-[601px]:grid-cols-3">
          <div>
            <h4 class="mb-4.5 text-xs font-semibold text-white">Menu</h4>
            <a href="/" class="mb-2.5 block text-[11px] text-[#c8b8ab] no-underline transition-colors duration-300 hover:text-white">Beranda</a>
            <a href="/products" class="mb-2.5 block text-[11px] text-[#c8b8ab] no-underline transition-colors duration-300 hover:text-white">Produk</a>
            <a href="/#about" class="mb-2.5 block text-[11px] text-[#c8b8ab] no-underline transition-colors duration-300 hover:text-white">Tentang</a>
          </div>
          <div>
            <h4 class="mb-4.5 text-xs font-semibold text-white">Informasi</h4>
            <a href="/traceability" class="mb-2.5 block text-[11px] text-[#c8b8ab] no-underline transition-colors duration-300 hover:text-white">Ketertelusuran</a>
            <a href="/login" class="mb-2.5 block text-[11px] text-[#c8b8ab] no-underline transition-colors duration-300 hover:text-white">Masuk</a>
            <a href="/checkout" @click.prevent="pesanSekarang" class="mb-2.5 block text-[11px] text-[#c8b8ab] no-underline transition-colors duration-300 hover:text-white">Checkout</a>
          </div>
          <div>
            <h4 class="mb-4.5 text-xs font-semibold text-white">Kontak</h4>
            <p class="mb-2.5 text-[11px] text-[#c8b8ab]">info@kakao.com</p>
            <p class="mb-2.5 text-[11px] text-[#c8b8ab]">Indonesia</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2 border-t border-white/10 px-5 py-4.5 text-[10px] text-[#a99587] min-[601px]:flex-row min-[601px]:justify-between min-[601px]:gap-5 min-[601px]:px-[7%] min-[601px]:py-5">
        <p>© 2026 KAKAO</p>
        <p>Sistem Informasi Manajemen Produsen Kakao</p>
      </div>
    </footer>
  </div>
</template>
