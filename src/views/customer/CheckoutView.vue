
<script setup>
import { computed, reactive, ref } from 'vue'

// ==========================================
// 1. DATA PRODUK DAN HARGA SIMULASI
// ==========================================
// Nanti cukup ubah angka price_per_kg jika
// harga jual kakao sudah ditentukan.

const products = {
  a: {
    name: 'Cocoa Bean A',
    grade: 'A',
    type: 'Fermentasi',
    category: 'FERMENTASI',
    stock: 500,
    image: '/kakao-home/cocoa-bean-a.jpg',
    price_per_kg: 85000
  },
  b: {
    name: 'Cocoa Bean B',
    grade: 'B',
    type: 'Fermentasi',
    category: 'FERMENTASI',
    stock: 800,
    image: '/kakao-home/cocoa-bean-b.jpg',
    price_per_kg: 75000
  },
  c: {
    name: 'Cocoa Bean C',
    grade: 'C',
    type: 'Non-Fermentasi',
    category: 'NON-FERMENTASI',
    stock: 300,
    image: '/kakao-home/cocoa-bean-c.jpg',
    price_per_kg: 65000
  },
  d: {
    name: 'Cocoa Bean D',
    grade: 'A',
    type: 'Fermentasi',
    category: 'FERMENTASI',
    stock: 650,
    image: '/kakao-home/cocoa-bean-d.jpg',
    price_per_kg: 85000
  },
  e: {
    name: 'Cocoa Bean E',
    grade: 'B',
    type: 'Fermentasi',
    category: 'FERMENTASI',
    stock: 450,
    image: '/kakao-home/cocoa-bean-e.jpg',
    price_per_kg: 75000
  },
  f: {
    name: 'Cocoa Bean F',
    grade: 'B',
    type: 'Non-Fermentasi',
    category: 'NON-FERMENTASI',
    stock: 700,
    image: '/kakao-home/cocoa-bean-f.png',
    price_per_kg: 70000
  },
  g: {
    name: 'Cocoa Bean G',
    grade: 'C',
    type: 'Fermentasi',
    category: 'FERMENTASI',
    stock: 350,
    image: '/kakao-home/cocoa-bean-g.jpg',
    price_per_kg: 65000
  },
  h: {
    name: 'Cocoa Bean H',
    grade: 'A',
    type: 'Non-Fermentasi',
    category: 'NON-FERMENTASI',
    stock: 550,
    image: '/kakao-home/cocoa-bean-h.jpg',
    price_per_kg: 90000
  }
}

// ==========================================
// 2. MEMBACA PRODUK YANG DIPILIH
// ==========================================

function readSelectedProduct() {
  try {
    const saved = sessionStorage.getItem('selectedProduct')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

const selectedProduct = ref(readSelectedProduct())

const product = computed(() => {
  const id = selectedProduct.value?.id
  return id && products[id] ? products[id] : null
})

const quantity = ref(
  Number(selectedProduct.value?.quantity_kg) || 1
)

const validQuantity = computed(() => {
  if (!product.value) return 0

  return Math.min(
    product.value.stock,
    Math.max(1, Math.floor(Number(quantity.value) || 1))
  )
})

const updateQuantity = () => {
  quantity.value = validQuantity.value
}

const subtotal = computed(() => {
  if (!product.value) return 0
  return product.value.price_per_kg * validQuantity.value
})

// ==========================================
// 3. DATA PROFIL CUSTOMER
// ==========================================

const getSavedValue = (...keys) => {
  for (const key of keys) {
    const value = localStorage.getItem(key)
    if (value) return value
  }
  return ''
}

const form = reactive({
  company: getSavedValue('customerCompany'),
  name: getSavedValue('customerName'),
  email: getSavedValue('customerEmail'),
  phone: getSavedValue('customerPhone'),
  address: getSavedValue('customerAddress'),
  notes: ''
})

// ==========================================
// 4. PILIHAN PENGIRIMAN SIMULASI
// ==========================================

const shippingOptions = [
  { id: 'regular', name: 'Reguler', description: 'Estimasi 3–5 hari', cost: 15000 },
  { id: 'express', name: 'Express', description: 'Estimasi 1–2 hari', cost: 25000 },
  { id: 'cargo', name: 'Kargo', description: 'Untuk pengiriman jumlah besar', cost: 35000 }
]

const selectedShippingId = ref('regular')

const selectedShipping = computed(() => {
  return shippingOptions.find(
    item => item.id === selectedShippingId.value
  ) || shippingOptions[0]
})

const shippingCost = computed(() => selectedShipping.value.cost)

const grandTotal = computed(() => {
  return subtotal.value + shippingCost.value
})

// ==========================================
// 5. FORMAT RUPIAH
// ==========================================

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)
}

// ==========================================
// 6. PROSES BUAT PESANAN
// ==========================================

const errorMessage = ref('')

function submitOrder() {
  errorMessage.value = ''

  if (!product.value) {
    errorMessage.value = 'Produk tidak ditemukan. Silakan pilih produk kembali.'
    return
  }

  if (localStorage.getItem('userRole') !== 'CUSTOMER') {
    sessionStorage.setItem('redirectAfterLogin', 'checkout')
    alert('Silakan login sebagai customer terlebih dahulu.')
    window.location.href = '/login'
    return
  }

  if (!form.name.trim()) {
    errorMessage.value = 'Nama lengkap wajib diisi.'
    return
  }

  if (!form.email.trim()) {
    errorMessage.value = 'Email wajib diisi.'
    return
  }

  if (!form.phone.trim()) {
    errorMessage.value = 'Nomor telepon wajib diisi.'
    return
  }

  if (!form.address.trim()) {
    errorMessage.value = 'Alamat pengiriman wajib diisi.'
    return
  }

  if (validQuantity.value < 1) {
    errorMessage.value = 'Jumlah pesanan tidak valid.'
    return
  }

  const checkoutData = {
    customer: {
      company: form.company,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      notes: form.notes
    },

    product: {
      id: selectedProduct.value.id,
      name: product.value.name,
      grade: product.value.grade,
      type: product.value.type,
      quantity_kg: validQuantity.value,
      price_per_kg: product.value.price_per_kg,
      subtotal: subtotal.value
    },

    shipping: {
      id: selectedShipping.value.id,
      name: selectedShipping.value.name,
      description: selectedShipping.value.description,
      cost: shippingCost.value
    },

    item_total: subtotal.value,
    shipping_cost: shippingCost.value,
    grand_total: grandTotal.value,
    created_at: new Date().toISOString()
  }

  sessionStorage.setItem(
    'checkoutData',
    JSON.stringify(checkoutData)
  )

  sessionStorage.setItem(
    'selectedProduct',
    JSON.stringify({
      id: selectedProduct.value.id,
      name: product.value.name,
      quantity_kg: validQuantity.value
    })
  )

  window.location.href = '/payment'
}
</script>

<template>
  <div class="min-h-screen bg-[#fffdf9] font-[Arial,Helvetica,sans-serif] text-[#3b2416]">

    <!-- HEADER -->
    <header class="sticky top-0 z-50 border-b border-[#eadfd3] bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="/" class="flex items-center gap-3">
          <img
            src="/kakao-home/logo-kakao.png"
            alt="Logo KAKAO"
            class="h-10 w-auto object-contain"
          >
        </a>

        <a
          href="/products"
          class="text-sm font-medium text-[#795238] transition hover:text-[#a16b43]"
        >
          ← Kembali ke Produk
        </a>
      </div>
    </header>

    <!-- MAIN -->
    <main class="mx-auto max-w-7xl px-5 py-10">

      <div class="mb-8">
        <p class="mb-2 text-xs font-bold tracking-[0.2em] text-[#a16b43]">
          PEMESANAN CUSTOMER
        </p>
        <h1 class="font-[Georgia,serif] text-3xl font-bold md:text-4xl">
          Checkout & Pemesanan
        </h1>
        <p class="mt-3 text-sm leading-6 text-[#82766c]">
          Periksa kembali produk dan lengkapi informasi pengiriman sebelum membuat pesanan.
        </p>
      </div>

      <!-- NOTIFIKASI HARGA SIMULASI -->
      <div class="mb-7 rounded-xl border border-[#ead6b5] bg-[#fff8eb] p-4">
        <div class="flex items-start gap-3">
          <span class="text-lg">ⓘ</span>
          <div>
            <p class="text-sm font-bold text-[#795238]">
              Harga dan ongkir masih berupa simulasi
            </p>
            <p class="mt-1 text-xs leading-5 text-[#82766c]">
              Nominal digunakan untuk pengujian tampilan dan perhitungan Checkout.
              Harga jual dan biaya pengiriman sebenarnya dapat diperbarui kemudian.
            </p>
          </div>
        </div>
      </div>

      <!-- PRODUK TIDAK DITEMUKAN -->
      <div
        v-if="!product"
        class="rounded-2xl border border-[#eadfd3] bg-white p-10 text-center shadow-sm"
      >
        <div class="mb-4 text-4xl">🛒</div>
        <h2 class="text-xl font-bold">Belum ada produk yang dipilih</h2>
        <p class="mt-2 text-sm text-[#82766c]">
          Silakan pilih produk kakao terlebih dahulu sebelum melanjutkan checkout.
        </p>
        <a
          href="/products"
          class="mt-6 inline-flex rounded-lg bg-[#795238] px-6 py-3 text-sm font-semibold text-white hover:bg-[#60402c]"
        >
          Pilih Produk
        </a>
      </div>

      <div v-else class="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

        <!-- KOLOM KIRI -->
        <div class="space-y-7 lg:col-span-2">

          <!-- RINGKASAN PRODUK -->
          <section class="rounded-2xl border border-[#eadfd3] bg-white p-6 shadow-sm">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="text-lg font-bold">Ringkasan Produk</h2>
              <span class="rounded-full bg-[#f5eee7] px-3 py-1 text-xs font-semibold text-[#795238]">
                1 Produk
              </span>
            </div>

            <div class="flex flex-col gap-5 sm:flex-row">
              <img
                :src="product.image"
                :alt="product.name"
                class="h-36 w-full rounded-xl bg-[#f7f3ee] object-cover sm:w-40"
              >

              <div class="flex-1">
                <p class="text-xs font-bold tracking-wider text-[#a16b43]">
                  {{ product.category }}
                </p>

                <h3 class="mt-2 text-xl font-bold">
                  {{ product.name }}
                </h3>

                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="rounded-md bg-[#f5eee7] px-3 py-1 text-xs font-semibold">
                    Grade {{ product.grade }}
                  </span>
                  <span class="rounded-md bg-[#f5eee7] px-3 py-1 text-xs font-semibold">
                    {{ product.type }}
                  </span>
                </div>

                <p class="mt-4 text-sm text-[#82766c]">
                  Stok tersedia: {{ product.stock }} kg
                </p>
              </div>
            </div>

            <div class="my-6 border-t border-[#eee5dc]"></div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-semibold">
                  Harga per Kilogram
                </label>
                <p class="text-lg font-bold text-[#795238]">
                  {{ formatRupiah(product.price_per_kg) }}
                </p>
              </div>

              <div>
                <label for="quantity" class="mb-2 block text-sm font-semibold">
                  Jumlah Pesanan (kg)
                </label>

                <div class="flex h-11 w-full max-w-48 items-center overflow-hidden rounded-lg border border-[#e5d8ca]">
                  <button
                    type="button"
                    class="h-full w-12 text-lg hover:bg-[#f5eee7]"
                    @click="quantity = Math.max(1, validQuantity - 1)"
                  >
                    −
                  </button>

                  <input
                    id="quantity"
                    v-model.number="quantity"
                    type="number"
                    min="1"
                    :max="product.stock"
                    class="h-full min-w-0 flex-1 border-x border-[#e5d8ca] text-center text-sm outline-none"
                    @change="updateQuantity"
                  >

                  <button
                    type="button"
                    class="h-full w-12 text-lg hover:bg-[#f5eee7]"
                    @click="quantity = Math.min(product.stock, validQuantity + 1)"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-between rounded-xl bg-[#faf6f1] p-4">
              <span class="text-sm font-medium text-[#82766c]">
                Subtotal Produk
              </span>
              <strong class="text-lg text-[#795238]">
                {{ formatRupiah(subtotal) }}
              </strong>
            </div>
          </section>

          <!-- ALAMAT PENGIRIMAN -->
          <section class="rounded-2xl border border-[#eadfd3] bg-white p-6 shadow-sm">
            <div class="mb-6">
              <h2 class="text-lg font-bold">Informasi Pembeli & Pengiriman</h2>
              <p class="mt-1 text-sm text-[#82766c]">
                Lengkapi data penerima produk kakao.
              </p>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">

              <div class="sm:col-span-2">
                <label class="mb-2 block text-sm font-semibold">
                  Nama Perusahaan (Opsional)
                </label>
                <input
                  v-model="form.company"
                  type="text"
                  placeholder="Nama perusahaan atau usaha"
                  class="w-full rounded-lg border border-[#e5d8ca] px-4 py-3 text-sm outline-none transition focus:border-[#a16b43]"
                >
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold">
                  Nama Lengkap *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  class="w-full rounded-lg border border-[#e5d8ca] px-4 py-3 text-sm outline-none focus:border-[#a16b43]"
                >
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold">
                  Email *
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="nama@email.com"
                  class="w-full rounded-lg border border-[#e5d8ca] px-4 py-3 text-sm outline-none focus:border-[#a16b43]"
                >
              </div>

              <div class="sm:col-span-2">
                <label class="mb-2 block text-sm font-semibold">
                  Nomor Telepon *
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="Contoh: 08xxxxxxxxxx"
                  class="w-full rounded-lg border border-[#e5d8ca] px-4 py-3 text-sm outline-none focus:border-[#a16b43]"
                >
              </div>

              <div class="sm:col-span-2">
                <label class="mb-2 block text-sm font-semibold">
                  Alamat Pengiriman Lengkap *
                </label>
                <textarea
                  v-model="form.address"
                  rows="4"
                  placeholder="Nama jalan, nomor rumah, desa/kelurahan, kecamatan, kabupaten/kota, provinsi, dan kode pos"
                  class="w-full resize-y rounded-lg border border-[#e5d8ca] px-4 py-3 text-sm outline-none focus:border-[#a16b43]"
                ></textarea>
                <p class="mt-2 text-xs text-[#82766c]">
                  Alamat dapat disesuaikan untuk setiap pesanan.
                </p>
              </div>
            </div>
          </section>

          <!-- PENGIRIMAN -->
          <section class="rounded-2xl border border-[#eadfd3] bg-white p-6 shadow-sm">
            <h2 class="text-lg font-bold">Metode Pengiriman</h2>
            <p class="mt-1 text-sm text-[#82766c]">
              Pilih layanan pengiriman yang tersedia.
            </p>

            <div class="mt-5 space-y-3">
              <label
                v-for="option in shippingOptions"
                :key="option.id"
                class="flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition"
                :class="selectedShippingId === option.id
                  ? 'border-[#a16b43] bg-[#faf6f1]'
                  : 'border-[#eadfd3] hover:bg-[#fdfaf7]'"
              >
                <div class="flex items-center gap-3">
                  <input
                    v-model="selectedShippingId"
                    type="radio"
                    :value="option.id"
                    class="accent-[#795238]"
                  >

                  <div>
                    <p class="text-sm font-bold">{{ option.name }}</p>
                    <p class="mt-1 text-xs text-[#82766c]">
                      {{ option.description }}
                    </p>
                  </div>
                </div>

                <strong class="whitespace-nowrap text-sm text-[#795238]">
                  {{ formatRupiah(option.cost) }}
                </strong>
              </label>
            </div>

            <p class="mt-4 text-xs text-[#a16b43]">
              * Biaya pengiriman di atas masih berupa nominal simulasi.
            </p>
          </section>

          <!-- CATATAN -->
          <section class="rounded-2xl border border-[#eadfd3] bg-white p-6 shadow-sm">
            <h2 class="text-lg font-bold">Catatan Pembeli</h2>
            <p class="mt-1 text-sm text-[#82766c]">
              Tambahkan informasi khusus untuk pesanan (opsional).
            </p>

            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Contoh: Mohon hubungi saya sebelum pengiriman..."
              class="mt-4 w-full resize-y rounded-lg border border-[#e5d8ca] px-4 py-3 text-sm outline-none focus:border-[#a16b43]"
            ></textarea>
          </section>
        </div>

        <!-- KOLOM KANAN: TOTAL -->
        <aside class="lg:sticky lg:top-24">
          <section class="rounded-2xl border border-[#eadfd3] bg-white p-6 shadow-sm">
            <h2 class="text-lg font-bold">Ringkasan Pembayaran</h2>

            <div class="mt-6 space-y-4 text-sm">
              <div class="flex justify-between gap-3">
                <span class="text-[#82766c]">Total Produk</span>
                <strong class="text-right">
                  {{ formatRupiah(subtotal) }}
                </strong>
              </div>

              <div class="flex justify-between gap-3">
                <span class="text-[#82766c]">Ongkos Kirim</span>
                <strong class="text-right">
                  {{ formatRupiah(shippingCost) }}
                </strong>
              </div>

              <div class="border-t border-dashed border-[#e5d8ca] pt-4">
                <div class="flex justify-between gap-3">
                  <span class="font-semibold">Total Pembayaran</span>
                  <strong class="text-xl text-[#795238]">
                    {{ formatRupiah(grandTotal) }}
                  </strong>
                </div>
              </div>
            </div>

            <div class="mt-6 rounded-lg bg-[#faf6f1] p-4">
              <p class="text-xs leading-5 text-[#82766c]">
                Total pembayaran dihitung dari subtotal produk ditambah
                biaya pengiriman yang dipilih.
              </p>
            </div>

            <div
              v-if="errorMessage"
              class="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {{ errorMessage }}
            </div>

            <button
              type="button"
              class="mt-6 w-full rounded-xl bg-[#795238] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#60402c]"
              @click="submitOrder"
            >
              Buat Pesanan
            </button>

            <p class="mt-4 text-center text-xs leading-5 text-[#82766c]">
              Dengan melanjutkan, kamu menyetujui informasi pesanan
              dan pengiriman yang telah diisi.
            </p>
          </section>

          <div class="mt-5 flex items-center justify-center gap-2 text-xs text-[#82766c]">
            <span>🔒</span>
            <span>Informasi pesanan disimpan untuk proses berikutnya.</span>
          </div>
        </aside>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="mt-16 border-t border-[#eadfd3] bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-7 text-center text-xs text-[#82766c] sm:flex-row sm:justify-between">
        <p>© 2026 KAKAO</p>
        <p>Sistem Informasi Manajemen Produsen Kakao</p>
      </div>
    </footer>
  </div>
</template>
