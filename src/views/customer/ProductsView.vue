<script setup>
import { ref, computed, onMounted } from 'vue'

// Data produk lama; nanti dapat diganti dengan data API/MySQL.
const products = [
  {
    "id": "a",
    "name": "Cocoa Bean A",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "A",
    "stock": 500,
    "image": "/kakao-home/cocoa-bean-a.jpg",
    "description": "Biji kakao fermentasi Grade A untuk kebutuhan pengolahan kakao."
  },
  {
    "id": "b",
    "name": "Cocoa Bean B",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "B",
    "stock": 800,
    "image": "/kakao-home/cocoa-bean-b.jpg",
    "description": "Biji kakao fermentasi Grade B dengan stok yang tersedia."
  },
  {
    "id": "c",
    "name": "Cocoa Bean C",
    "type": "Non-Fermentasi",
    "category": "non-fermentasi",
    "grade": "C",
    "stock": 300,
    "image": "/kakao-home/cocoa-bean-c.jpg",
    "description": "Biji kakao non-fermentasi untuk kebutuhan produk kakao."
  },
  {
    "id": "d",
    "name": "Cocoa Bean D",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "A",
    "stock": 650,
    "image": "/kakao-home/cocoa-bean-d.jpg",
    "description": "Biji kakao fermentasi Grade A dengan ketersediaan stok 650 kg."
  },
  {
    "id": "e",
    "name": "Cocoa Bean E",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "B",
    "stock": 450,
    "image": "/kakao-home/cocoa-bean-e.jpg",
    "description": "Biji kakao fermentasi Grade B dengan ketersediaan stok 450 kg."
  },
  {
    "id": "f",
    "name": "Cocoa Bean F",
    "type": "Non-Fermentasi",
    "category": "non-fermentasi",
    "grade": "B",
    "stock": 700,
    "image": "/kakao-home/cocoa-bean-f.png",
    "description": "Biji kakao non-fermentasi Grade B dengan stok 700 kg."
  },
  {
    "id": "g",
    "name": "Cocoa Bean G",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "C",
    "stock": 350,
    "image": "/kakao-home/cocoa-bean-g.jpg",
    "description": "Biji kakao fermentasi Grade C dengan ketersediaan stok 350 kg."
  },
  {
    "id": "h",
    "name": "Cocoa Bean H",
    "type": "Non-Fermentasi",
    "category": "non-fermentasi",
    "grade": "A",
    "stock": 550,
    "image": "/kakao-home/cocoa-bean-h.jpg",
    "description": "Biji kakao non-fermentasi Grade A dengan stok 550 kg."
  }
]

const selectedType = ref('all')
const selectedGrade = ref('all')

// Filter otomatis memperbarui tampilan saat tombol ditekan.
const filteredProducts = computed(() =>
  products.filter(product => {
    const typeMatch = selectedType.value === 'all' || product.category === selectedType.value
    const gradeMatch = selectedGrade.value === 'all' || product.grade === selectedGrade.value
    return typeMatch && gradeMatch
  })
)

const typeFilters = [
  { value: 'all', label: 'Semua Produk' },
  { value: 'fermentasi', label: 'Fermentasi' },
  { value: 'non-fermentasi', label: 'Non-Fermentasi' }
]

const gradeFilters = [
  { value: 'all', label: 'Semua Grade' },
  { value: 'A', label: 'Grade A' },
  { value: 'B', label: 'Grade B' },
  { value: 'C', label: 'Grade C' }
]

const informationCards = [
  { number: '01', title: 'Grade Kakao', description: 'Grade menunjukkan tingkat kualitas produk kakao yang tersedia.' },
  { number: '02', title: 'Jenis Pengolahan', description: 'Produk tersedia dalam jenis fermentasi dan non-fermentasi.' },
  { number: '03', title: 'Ketersediaan Stok', description: 'Jumlah stok ditampilkan secara transparan pada setiap produk.' },
  { number: '04', title: 'Detail Produk', description: 'Lihat detail produk sebelum menentukan jumlah pesanan yang dibutuhkan.' }
]

const orderSteps = [
  { number: '01', title: 'Pilih Produk', description: 'Tentukan produk kakao yang sesuai dengan kebutuhan.' },
  { number: '02', title: 'Lihat Detail', description: 'Periksa grade, jenis pengolahan, dan stok produk.' },
  { number: '03', title: 'Tentukan Jumlah', description: 'Tentukan jumlah produk yang ingin dipesan.' },
  { number: '04', title: 'Checkout', description: 'Lanjutkan pesanan melalui halaman checkout.' }
]

// Transisi Tailwind, tanpa CSS keyframe tambahan.
const isReady = ref(false)
onMounted(() => {
  requestAnimationFrame(() => { isReady.value = true })
})
</script>

<template>
  <div class="kakao-products min-h-screen bg-[#fffdf9] font-[Arial,Helvetica,sans-serif] text-[#3b2a20] leading-[1.6]">
    <!-- NAVBAR -->
    <header class="w-full bg-[#fffdf9]">
      <nav class="flex h-20 items-center justify-between border-b border-[#eadfd5] bg-[#fffdf9] px-[max(7%,45px)] max-[750px]:h-17.5 max-[750px]:px-[5%]">
        <a href="/" class="flex items-center" aria-label="Kembali ke Beranda KAKAO">
          <img src="/kakao-home/logo-kakao.png" alt="Logo KAKAO" class="block h-17.5 w-22.5 object-contain max-[750px]:h-15 max-[750px]:w-18.75" />
        </a>
        <a href="/" class="flex items-center rounded-md border border-[#ded1c7] px-4 py-2.5 text-xs font-semibold text-[#59483c] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3b2416] hover:bg-[#3b2416] hover:text-white max-[750px]:px-3 max-[750px]:py-2 max-[750px]:text-[10px]">
          ← Kembali ke Beranda
        </a>
      </nav>
    </header>

    <!-- HERO -->
    <section class="flex flex-col items-start gap-8.75 overflow-hidden border-b border-[#eadfd5] bg-[#f3ebe3] px-[7%] py-15 min-[751px]:min-h-97.5 min-[751px]:flex-row min-[751px]:items-center min-[751px]:justify-between min-[751px]:gap-17.5 min-[751px]:px-[max(7%,45px)] min-[751px]:py-16.25 min-[751px]:max-[1000px]:gap-10">
      <div class="max-w-180 transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100"
        :class="isReady ? 'translate-y-0 opacity-100' : 'translate-y-6.25 opacity-0'">
        <span class="mb-3.5 inline-block text-[11px] font-bold tracking-[2px] text-[#9b6847]">KATALOG PRODUK KAKAO</span>
        <h1 class="mb-5.5 max-w-175 text-[40px] leading-[1.08] font-bold text-[#3b2416] max-[450px]:text-[34px] min-[751px]:text-[clamp(38px,5vw,62px)]">
          Temukan Kakao yang<br />Sesuai Kebutuhan.
        </h1>
        <p class="max-w-162.5 text-[15px] leading-[1.8] text-[#715d4e]">
          Pilih produk kakao berdasarkan jenis pengolahan, grade, dan ketersediaan stok sesuai kebutuhan Anda.
        </p>
      </div>

      <div class="w-full max-w-100 shrink-0 overflow-hidden rounded-xl border border-[#d9c5b5] bg-[#fffaf5] shadow-[0_15px_35px_rgba(59,36,22,0.1)] transition-all delay-200 duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 min-[751px]:w-75 min-[751px]:max-[1000px]:w-65"
        :class="isReady ? 'translate-x-0 opacity-100' : 'translate-x-8.75 opacity-0'">
        <div class="flex min-h-26.25 items-center gap-5 border-b border-[#e4d5c9] px-6 py-5 max-[450px]:px-4.5 max-[450px]:py-4.25">
          <div class="min-w-20.5 text-[32px] leading-none font-bold text-[#9b5d36] max-[450px]:min-w-15 max-[450px]:text-[26px]">{{ String(products.length).padStart(2, '0') }}</div>
          <div class="flex flex-col gap-1">
            <strong class="text-[13px] font-bold tracking-[0.3px] text-[#3b2416]">Produk</strong>
            <span class="text-[11px] leading-[1.4] tracking-[0.8px] text-[#a16e4c] uppercase">Tersedia</span>
          </div>
        </div>
        <div class="flex min-h-26.25 items-center gap-5 border-b border-[#e4d5c9] px-6 py-5 max-[450px]:px-4.5 max-[450px]:py-4.25">
          <div class="min-w-20.5 text-[32px] leading-none font-bold text-[#9b5d36] max-[450px]:min-w-15 max-[450px]:text-[26px]">02</div>
          <div class="flex flex-col gap-1">
            <strong class="text-[13px] font-bold tracking-[0.3px] text-[#3b2416]">Jenis</strong>
            <span class="text-[11px] leading-[1.4] tracking-[0.8px] text-[#a16e4c] uppercase">Pengolahan</span>
          </div>
        </div>
        <div class="flex min-h-26.25 items-center gap-5 px-6 py-5 max-[450px]:px-4.5 max-[450px]:py-4.25">
          <div class="min-w-20.5 text-[32px] leading-none font-bold text-[#9b5d36] max-[450px]:min-w-15 max-[450px]:text-[26px]">A-C</div>
          <div class="flex flex-col gap-1">
            <strong class="text-[13px] font-bold tracking-[0.3px] text-[#3b2416]">Grade</strong>
            <span class="text-[11px] leading-[1.4] tracking-[0.8px] text-[#a16e4c] uppercase">Produk</span>
          </div>
        </div>
      </div>
    </section>

    <main>
      <!-- KATALOG + FILTER -->
      <section class="mx-auto max-w-300 px-[7%] py-16.25 min-[751px]:pt-22.5 min-[751px]:pb-25">
        <div class="mb-11.25 flex flex-col gap-4 min-[751px]:flex-row min-[751px]:items-end min-[751px]:justify-between min-[751px]:gap-10">
          <div>
            <span class="mb-3.5 inline-block text-[11px] font-bold tracking-[2px] text-[#9b6847]">PRODUK TERSEDIA</span>
            <h2 class="mb-3 text-[34px] leading-[1.2] font-bold text-[#3b2416] max-[450px]:text-[28px]">Pilihan Produk Kakao</h2>
          </div>
          <p class="max-w-105 text-sm text-[#79685b]">Temukan berbagai pilihan biji kakao dengan karakteristik dan kualitas yang berbeda.</p>
        </div>

        <div class="mb-11.25 flex flex-col justify-between gap-7.5 rounded-lg border border-[#eadfd5] bg-[#faf6f1] p-6.25 min-[751px]:flex-row">
          <div class="flex flex-col gap-3">
            <span class="text-xs font-bold tracking-[0.8px] text-[#4f3b2d] uppercase">Jenis Pengolahan</span>
            <div class="flex flex-wrap gap-2">
              <button v-for="filter in typeFilters" :key="filter.value" type="button"
                :aria-pressed="selectedType === filter.value"
                @click="selectedType = filter.value"
                class="cursor-pointer rounded-[5px] border px-3.5 py-2.25 text-[11px] transition-all duration-300 hover:-translate-y-px"
                :class="selectedType === filter.value
                  ? 'border-[#3b2416] bg-[#3b2416] text-white'
                  : 'border-[#ded1c7] bg-white text-[#695649] hover:border-[#9b6847] hover:text-[#8c5432]'">
                {{ filter.label }}
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-xs font-bold tracking-[0.8px] text-[#4f3b2d] uppercase">Grade</span>
            <div class="flex flex-wrap gap-2">
              <button v-for="filter in gradeFilters" :key="filter.value" type="button"
                :aria-pressed="selectedGrade === filter.value"
                @click="selectedGrade = filter.value"
                class="cursor-pointer rounded-[5px] border px-3.5 py-2.25 text-[11px] transition-all duration-300 hover:-translate-y-px"
                :class="selectedGrade === filter.value
                  ? 'border-[#3b2416] bg-[#3b2416] text-white'
                  : 'border-[#ded1c7] bg-white text-[#695649] hover:border-[#9b6847] hover:text-[#8c5432]'">
                {{ filter.label }}
              </button>
            </div>
          </div>
        </div>

<!-- PRODUCT GRID -->
<div
  id="productsGrid"
  class="grid grid-cols-1 gap-6.25 min-[751px]:grid-cols-2 min-[1001px]:grid-cols-3"
>
  <article
    v-for="(product, index) in filteredProducts"
    :key="product.id"
    class="group overflow-hidden rounded-lg border border-[#eadfd5] bg-white transition-all duration-300 hover:-translate-y-1.25 hover:shadow-[0_12px_30px_rgba(70,45,28,0.08)] motion-reduce:transform-none motion-reduce:opacity-100"
    :class="isReady ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
    :style="{ transitionDelay: isReady ? `${Math.min(index * 55, 350)}ms` : '0ms' }"
  >
    <!-- FOTO PRODUK -->
    <a
      :href="`/detail-product?product=${product.id}`"
      :aria-label="`Lihat detail ${product.name}`"
      class="relative block h-50 w-full cursor-pointer overflow-hidden bg-[#eee4da]"
    >
      <img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        class="block h-full w-full object-cover transition-transform duration-400 group-hover:scale-104"
      />

      <span
        class="absolute top-3.5 left-3.5 rounded bg-white px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-[#68452f]"
      >
        GRADE {{ product.grade }}
      </span>
    </a>

    <!-- INFORMASI PRODUK -->
    <div class="p-5">
      <span
        class="mb-1 block text-[10px] font-bold tracking-wider text-[#a16e4c] uppercase"
      >
        {{ product.type }}
      </span>

      <h3 class="mb-2 text-xl font-bold text-[#3b2416]">
        {{ product.name }}
      </h3>

      <p
        class="mb-4 min-h-10 text-xs leading-relaxed text-[#766458]"
      >
        {{ product.description }}
      </p>

      <!-- GRADE DAN STOK -->
      <div class="grid grid-cols-2 gap-2.5">
        <div class="rounded-md bg-[#faf6f1] p-3">
          <span
            class="mb-1 block text-[10px] text-[#927e70] uppercase"
          >
            Grade
          </span>
          <span class="text-xs font-bold text-[#4b3628]">
            {{ product.grade }}
          </span>
        </div>

        <div class="rounded-md bg-[#faf6f1] p-3">
          <span
            class="mb-1 block text-[10px] text-[#927e70] uppercase"
          >
            Stok
          </span>
          <span class="text-xs font-bold text-[#4b3628]">
            {{ product.stock }} kg
          </span>
        </div>
      </div>
    </div>
  </article>
</div>



        <div v-if="filteredProducts.length === 0" class="rounded-lg border border-dashed border-[#ded1c7] bg-[#faf6f1] px-5 py-17.5 text-center">
          <div class="mb-2.5 text-3xl text-[#9b6847]">—</div>
          <h3 class="mb-1.25 text-xl text-[#3b2416]">Produk tidak ditemukan</h3>
          <p class="text-[13px] text-[#79685b]">Coba ubah filter untuk melihat produk lainnya.</p>
        </div>
      </section>

      <!-- INFORMASI PRODUK -->
      <section class="border-y border-[#eadfd5] bg-[#f3ebe3] px-[7%] py-22.5">
        <div class="mx-auto mb-11.25 max-w-175 text-center">
          <span class="mb-3.5 inline-block text-[11px] font-bold tracking-[2px] text-[#9b6847]">INFORMASI PRODUK</span>
          <h2 class="mb-3 text-[34px] leading-[1.2] font-bold text-[#3b2416] max-[450px]:text-[28px]">Kenali Produk Kakao</h2>
          <p class="text-sm text-[#79685b]">Setiap produk memiliki karakteristik yang berbeda. Pilih produk sesuai kebutuhan pengolahan Anda.</p>
        </div>
        <div class="mx-auto grid max-w-300 grid-cols-1 gap-5 min-[751px]:grid-cols-2 min-[1001px]:grid-cols-4">
          <div v-for="card in informationCards" :key="card.number"
            class="rounded-[7px] border border-[#e5d9cf] bg-[#fffdf9] p-6.25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(70,45,28,0.06)]">
            <span class="mb-5 block text-xs font-bold text-[#b18463]">{{ card.number }}</span>
            <h3 class="mb-2.5 text-[17px] font-bold text-[#3b2416]">{{ card.title }}</h3>
            <p class="text-xs leading-[1.7] text-[#79685b]">{{ card.description }}</p>
          </div>
        </div>
      </section>

      <!-- CARA PEMESANAN -->
      <section class="mx-auto max-w-300 px-[7%] py-22.5">
        <div class="mb-12.5 max-w-162.5">
          <span class="mb-3.5 inline-block text-[11px] font-bold tracking-[2px] text-[#9b6847]">CARA PEMESANAN</span>
          <h2 class="mb-3 text-[34px] leading-[1.2] font-bold text-[#3b2416] max-[450px]:text-[28px]">Pesan Produk dengan Mudah</h2>
          <p class="text-sm text-[#79685b]">Ikuti beberapa langkah sederhana untuk mendapatkan produk kakao yang Anda butuhkan.</p>
        </div>
        <div class="grid grid-cols-1 gap-5 min-[751px]:grid-cols-2 min-[1001px]:grid-cols-4">
          <div v-for="step in orderSteps" :key="step.number"
            class="border-t-2 border-[#8c5432] p-6.25 transition-transform duration-300 hover:-translate-y-1">
            <span class="mb-5 block text-xs font-bold text-[#a16e4c]">{{ step.number }}</span>
            <h3 class="mb-2.25 text-[17px] font-bold text-[#3b2416]">{{ step.title }}</h3>
            <p class="text-xs leading-[1.7] text-[#79685b]">{{ step.description }}</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="px-[5%] pb-16.25 min-[751px]:px-[7%] min-[751px]:pb-22.5">
        <div class="mx-auto flex max-w-300 flex-col items-start justify-between gap-7.5 rounded-lg bg-[#3b2416] p-7.5 min-[751px]:flex-row min-[751px]:items-center min-[751px]:p-11.25">
          <div>
            <span class="mb-3.5 inline-block text-[11px] font-bold tracking-[2px] text-[#cba78d]">SIAP MEMESAN?</span>
            <h2 class="mb-2.5 text-[34px] leading-[1.2] font-bold text-white max-[450px]:text-[28px]">Temukan Produk Kakao Anda</h2>
            <p class="text-[13px] text-[#d8c4b4]">Pilih produk dan lihat detailnya sebelum melakukan pemesanan.</p>
          </div>
          <a href="#productsGrid"
            class="shrink-0 rounded-[5px] bg-white px-5.5 py-3.25 text-[11px] font-bold text-[#3b2416] no-underline transition-all duration-300 hover:-translate-y-0.75 hover:bg-[#eee4da] hover:text-[#3b2416] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
            Lihat Produk
          </a>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="bg-[#2b1b12] text-white">
      <div class="mx-auto grid max-w-300 grid-cols-1 gap-8.75 px-[7%] py-13.75 min-[751px]:grid-cols-[2fr_1fr_1fr] min-[751px]:gap-15">
        <div>
          <img src="/kakao-home/logo-kakao.png" alt="Logo KAKAO"
            class="mb-3.75 block h-15 w-18.75 rounded-[5px] bg-[#fffdf9] object-contain" />
          <p class="max-w-75 text-xs leading-[1.7] text-[#cdb9aa]">Sistem Informasi Manajemen Produsen Kakao.</p>
        </div>
        <div class="flex flex-col gap-2.25">
          <h4 class="mb-1.25 text-[13px] font-bold text-white">Navigasi</h4>
          <a href="/" class="text-xs text-[#cdb9aa] no-underline transition-all duration-300 hover:translate-x-0.75 hover:text-white">Home</a>
          <a href="/products" class="text-xs text-[#cdb9aa] no-underline transition-all duration-300 hover:translate-x-0.75 hover:text-white">Products</a>
          <a href="/checkout" class="text-xs text-[#cdb9aa] no-underline transition-all duration-300 hover:translate-x-0.75 hover:text-white">Checkout</a>
        </div>
        <div class="flex flex-col gap-2.25">
          <h4 class="mb-1.25 text-[13px] font-bold text-white">Informasi</h4>
          <a href="#" class="text-xs text-[#cdb9aa] no-underline transition-all duration-300 hover:translate-x-0.75 hover:text-white">About</a>
          <a href="/traceability" class="text-xs text-[#cdb9aa] no-underline transition-all duration-300 hover:translate-x-0.75 hover:text-white">Traceability</a>
          <a href="/login" class="text-xs text-[#cdb9aa] no-underline transition-all duration-300 hover:translate-x-0.75 hover:text-white">Login</a>
        </div>
      </div>
      <div class="border-t border-white/10 px-[7%] py-5 text-center">
        <p class="text-[10px] text-[#a99384]">© 2026 Sistem Informasi Manajemen Produsen Kakao</p>
      </div>
    </footer>
  </div>
</template>