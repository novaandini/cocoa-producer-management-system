
<script setup>
import { computed, reactive, ref } from 'vue'

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

const product = computed(() =>
  selectedProduct.value ? products[selectedProduct.value.id] : null
)

const backToDetail = computed(() =>
  selectedProduct.value
    ? `/detail-product?product=${selectedProduct.value.id}`
    : '/products'
)

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
  window.location.href = '/login'
}

function submitOrder() {
  errorMessage.value = ''

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

  window.location.href = '/payment'
}
</script>

<template>
  <div class="min-h-screen bg-[#fffdf9] font-[Arial,Helvetica,sans-serif] text-[#2d2118]">

    <!-- HEADER -->
    <header class="sticky top-0 z-50 flex min-h-[76px] items-center justify-between border-b border-[#eadfd3] bg-[#fffdf9] px-5 shadow-sm sm:px-8 lg:px-16">
      <a href="/" class="flex items-center">
        <img
          src="/kakao-home/logo-kakao.png"
          alt="Logo KAKAO"
          class="h-10 w-auto object-contain sm:h-12"
        >
      </a>

      <a
        :href="backToDetail"
        class="text-right text-xs font-semibold text-[#795238] transition hover:text-[#a46c42] sm:text-sm"
      >
        ← Kembali ke Detail Produk
      </a>
    </header>

    <main class="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">

      <!-- JUDUL HALAMAN -->
      <section class="mb-10 text-center">
        <p class="mb-3 text-[11px] font-bold tracking-[3px] text-[#a16b43]">
          PEMESANAN
        </p>

        <h1 class="font-[Georgia,serif] text-3xl leading-tight text-[#38271b] sm:text-4xl md:text-5xl">
          Selesaikan
          <span class="italic text-[#98633e]">Pesanan Anda</span>
        </h1>

        <p class="mx-auto mt-4 max-w-[620px] text-sm leading-7 text-[#82766c]">
          Lengkapi informasi pemesanan dan pengiriman untuk melanjutkan proses pembelian kakao.
        </p>
      </section>

      <!-- BELUM LOGIN -->
      <section
        v-if="!isCustomer"
        class="mx-auto max-w-[650px] rounded-2xl border border-[#eadfd3] bg-white px-6 py-12 text-center shadow-sm sm:px-10"
      >
        <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5ede4] text-2xl text-[#8a5a38]">
          <span>♙</span>
        </div>

        <h2 class="font-[Georgia,serif] text-2xl text-[#38271b]">
          Silakan masuk terlebih dahulu
        </h2>

        <p class="mx-auto mt-3 max-w-[440px] text-sm leading-7 text-[#82766c]">
          Pelanggan dapat melihat produk tanpa login, tetapi perlu masuk sebelum checkout dan pembayaran.
        </p>

        <button
          type="button"
          class="mt-7 rounded-md bg-[#795238] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#5d3c27]"
          @click="goToLogin"
        >
          Masuk sebagai Pelanggan
        </button>

        <div class="mt-5">
          <a href="/products" class="text-sm font-medium text-[#795238] hover:underline">
            ← Kembali melihat produk
          </a>
        </div>
      </section>

      <!-- BELUM MEMILIH PRODUK -->
      <section
        v-else-if="!product"
        class="mx-auto max-w-[650px] rounded-2xl border border-[#eadfd3] bg-white px-6 py-12 text-center shadow-sm sm:px-10"
      >
        <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5ede4] text-2xl">
          🛒
        </div>

        <h2 class="font-[Georgia,serif] text-2xl text-[#38271b]">
          Belum ada produk yang dipilih
        </h2>

        <p class="mx-auto mt-3 max-w-[440px] text-sm leading-7 text-[#82766c]">
          Buka halaman produk, pilih Cocoa Bean, kemudian tekan “Pesan Sekarang”.
        </p>

        <a
          href="/products"
          class="mt-7 inline-block rounded-md bg-[#795238] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#5d3c27]"
        >
          ← Pilih Produk
        </a>
      </section>

      <!-- FORM CHECKOUT -->
      <section v-else class="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1.55fr_1fr] lg:gap-9">

        <!-- FORMULIR PELANGGAN -->
        <div class="rounded-2xl border border-[#eadfd3] bg-white p-5 shadow-sm sm:p-8">
          <div class="mb-7 border-b border-[#eee5dc] pb-5">
            <p class="mb-2 text-[10px] font-bold tracking-[2px] text-[#a16b43]">
              INFORMASI PELANGGAN
            </p>

            <h2 class="font-[Georgia,serif] text-2xl text-[#38271b] sm:text-3xl">
              Data Pemesanan
            </h2>

            <p class="mt-2 text-xs leading-6 text-[#94877c]">
              Isi data berikut dengan benar untuk keperluan pemesanan dan pengiriman.
            </p>
          </div>

          <form id="checkoutForm" @submit.prevent="submitOrder" class="space-y-5">

            <div>
              <label for="company" class="mb-2 block text-sm font-semibold text-[#514033]">
                Nama Perusahaan
                <span class="font-normal text-[#a89b90]">(opsional)</span>
              </label>

              <input
                id="company"
                v-model.trim="form.company"
                name="company"
                type="text"
                placeholder="Masukkan nama perusahaan"
                class="w-full rounded-lg border border-[#e5d9cd] bg-[#fffdf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#b5aaa0] focus:border-[#9a704f] focus:ring-2 focus:ring-[#9a704f]/10"
              >
            </div>

            <div>
              <label for="name" class="mb-2 block text-sm font-semibold text-[#514033]">
                Nama Pemesan
              </label>

              <input
                id="name"
                v-model.trim="form.name"
                name="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                required
                class="w-full rounded-lg border border-[#e5d9cd] bg-[#fffdf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#b5aaa0] focus:border-[#9a704f] focus:ring-2 focus:ring-[#9a704f]/10"
              >
            </div>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label for="email" class="mb-2 block text-sm font-semibold text-[#514033]">
                  Email
                </label>

                <input
                  id="email"
                  v-model.trim="form.email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  required
                  class="w-full rounded-lg border border-[#e5d9cd] bg-[#fffdf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#b5aaa0] focus:border-[#9a704f] focus:ring-2 focus:ring-[#9a704f]/10"
                >
              </div>

              <div>
                <label for="phone" class="mb-2 block text-sm font-semibold text-[#514033]">
                  Nomor Telepon
                </label>

                <input
                  id="phone"
                  v-model.trim="form.phone"
                  name="phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  required
                  class="w-full rounded-lg border border-[#e5d9cd] bg-[#fffdf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#b5aaa0] focus:border-[#9a704f] focus:ring-2 focus:ring-[#9a704f]/10"
                >
              </div>
            </div>

            <div>
              <label for="address" class="mb-2 block text-sm font-semibold text-[#514033]">
                Alamat Pengiriman
              </label>

              <textarea
                id="address"
                v-model.trim="form.address"
                name="address"
                rows="5"
                placeholder="Masukkan alamat lengkap pengiriman"
                required
                class="w-full resize-y rounded-lg border border-[#e5d9cd] bg-[#fffdf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#b5aaa0] focus:border-[#9a704f] focus:ring-2 focus:ring-[#9a704f]/10"
              ></textarea>
            </div>

            <div>
              <label for="notes" class="mb-2 block text-sm font-semibold text-[#514033]">
                Catatan Pesanan
                <span class="font-normal text-[#a89b90]">(opsional)</span>
              </label>

              <textarea
                id="notes"
                v-model.trim="form.notes"
                name="notes"
                rows="4"
                placeholder="Tambahkan catatan jika diperlukan"
                class="w-full resize-y rounded-lg border border-[#e5d9cd] bg-[#fffdf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#b5aaa0] focus:border-[#9a704f] focus:ring-2 focus:ring-[#9a704f]/10"
              ></textarea>
            </div>
          </form>
        </div>

        <!-- RINGKASAN PESANAN -->
        <aside class="rounded-2xl border border-[#eadfd3] bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-24">
          <div class="mb-6 border-b border-[#eee5dc] pb-5">
            <p class="mb-2 text-[10px] font-bold tracking-[2px] text-[#a16b43]">
              RINGKASAN PESANAN
            </p>

            <h2 class="font-[Georgia,serif] text-2xl text-[#38271b]">
              Pesanan Anda
            </h2>
          </div>

          <!-- PRODUK -->
          <div class="flex gap-4 border-b border-[#eee5dc] pb-6">
            <img
              :src="product.image"
              :alt="product.name"
              class="h-24 w-24 shrink-0 rounded-xl bg-[#f5ede4] object-cover"
            >

            <div class="min-w-0 flex-1">
              <span class="text-[9px] font-bold tracking-[1.5px] text-[#a16b43]">
                {{ product.category }}
              </span>

              <h3 class="mt-1 font-[Georgia,serif] text-lg font-semibold text-[#38271b]">
                {{ product.name }}
              </h3>

              <p class="mt-1 text-sm text-[#82766c]">
                Grade {{ product.grade }}
              </p>
            </div>
          </div>

          <!-- DETAIL PRODUK -->
          <div class="space-y-4 border-b border-[#eee5dc] py-6 text-sm">
            <div class="flex items-center justify-between gap-3">
              <span class="text-[#82766c]">Jumlah</span>
              <strong class="text-[#38271b]">{{ selectedProduct.quantity_kg }} kg</strong>
            </div>

            <div class="flex items-center justify-between gap-3">
              <span class="text-[#82766c]">Stok Tersedia</span>
              <strong class="text-[#38271b]">{{ product.stock }} kg</strong>
            </div>

            <div class="flex items-center justify-between gap-3">
              <span class="text-[#82766c]">Jenis</span>
              <strong class="text-right text-[#38271b]">{{ product.type }}</strong>
            </div>

            <div class="flex items-center justify-between gap-3">
              <span class="text-[#82766c]">Grade</span>
              <strong class="text-[#38271b]">{{ product.grade }}</strong>
            </div>
          </div>

          <!-- TOTAL -->
          <div class="flex items-center justify-between gap-3 py-6">
            <span class="font-semibold text-[#514033]">Total Pesanan</span>
            <strong class="text-xl text-[#795238]">Rp -</strong>
          </div>

          <p class="-mt-3 mb-6 text-[11px] leading-5 text-[#a09286]">
            Harga produk belum diatur. Nilai pembayaran belum dapat dihitung.
          </p>

          <!-- PESAN ERROR -->
          <p
            v-if="errorMessage"
            class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700"
            role="alert"
          >
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            form="checkoutForm"
            class="w-full rounded-lg bg-[#795238] px-5 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-[#5d3c27] active:scale-[0.99]"
          >
            Buat Pesanan
          </button>

          <p class="mt-4 text-center text-[10px] leading-5 text-[#a09286]">
            Dalam demo ini data formulir disimpan sementara di browser, lalu diarahkan ke halaman pembayaran lama.
          </p>
        </aside>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="mt-12 border-t border-[#eadfd3] bg-[#f5ede4] px-5 py-6 sm:px-8">
      <div class="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 text-center text-[11px] text-[#82766c] sm:flex-row sm:text-left">
        <p>© 2026 KAKAO</p>
        <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
      </div>
    </footer>

  </div>
</template>
