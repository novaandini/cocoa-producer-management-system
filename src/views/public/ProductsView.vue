<script setup>
import { computed, ref, watch } from 'vue'
import PublicLayout from '../../components/public/PublicLayout.vue'
import ProductCard from '../../components/public/ProductCard.vue'
import ProductFilter from '../../components/public/ProductFilter.vue'
import { publicProducts, filterCatalog } from '../../data/publicProducts.js'

const params = new URLSearchParams(window.location.search)
const allowedType = ['all', 'fermentasi', 'non-fermentasi']
const allowedGrade = ['all', 'A', 'B', 'C']
const sortOptions = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga Terendah' },
  { value: 'price-desc', label: 'Harga Tertinggi' },
  { value: 'stock', label: 'Stok Terbanyak' },
]
const search = ref(params.get('q') || '')
const selectedType = ref(allowedType.includes(params.get('type')) ? params.get('type') : 'all')
const selectedGrade = ref(allowedGrade.includes(params.get('grade')) ? params.get('grade') : 'all')
const sort = ref(sortOptions.some(option => option.value === params.get('sort')) ? params.get('sort') : 'newest')

const categories = [
  { value: 'all', label: 'Semua kakao', image: '/kakao-home/hero-kakao.jpg', color: 'bg-[#f1e7d8]' },
  { value: 'fermentasi', label: 'Fermentasi', image: '/kakao-home/cocoa-bean-a.jpg', color: 'bg-[#e7ecd9]' },
  { value: 'non-fermentasi', label: 'Non-Fermentasi', image: '/kakao-home/cocoa-bean-c.jpg', color: 'bg-[#f3dfbe]' },
]
const filteredProducts = computed(() => filterCatalog(publicProducts, {
  search: search.value, type: selectedType.value, grade: selectedGrade.value, sort: sort.value,
}))
// Jumlah di masing-masing filter memperhitungkan pencarian dan filter lain.
const typeCounts = computed(() => Object.fromEntries(allowedType.map(type => [type,
  filterCatalog(publicProducts, { search: search.value, type, grade: selectedGrade.value }).length,
])))
const gradeCounts = computed(() => Object.fromEntries(allowedGrade.map(grade => [grade,
  filterCatalog(publicProducts, { search: search.value, type: selectedType.value, grade }).length,
])))
const hasFilters = computed(() => Boolean(search.value.trim() || selectedType.value !== 'all' || selectedGrade.value !== 'all' || sort.value !== 'newest'))

function resetFilters() {
  search.value = ''
  selectedType.value = 'all'
  selectedGrade.value = 'all'
  sort.value = 'newest'
}

// Pertahankan pilihan saat tautan katalog dibagikan atau halaman dimuat ulang.
watch([search, selectedType, selectedGrade, sort], () => {
  const url = new URL(window.location.href)
  const values = { q: search.value.trim(), type: selectedType.value === 'all' ? '' : selectedType.value,
    grade: selectedGrade.value === 'all' ? '' : selectedGrade.value, sort: sort.value === 'newest' ? '' : sort.value }
  for (const [key, value] of Object.entries(values)) {
    if (value) url.searchParams.set(key, value)
    else url.searchParams.delete(key)
  }
  window.history.replaceState(window.history.state, '', url)
})
</script>

<template>
  <PublicLayout>
    <div class="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-8 sm:pt-8 lg:px-10">
      <nav aria-label="Breadcrumb" class="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#756356]">
        <a href="/" class="hover:text-[#3b2416] hover:underline">Beranda</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page" class="font-semibold text-[#3b2416]">Katalog Produk</span>
      </nav>

      <!-- Editorial storefront: kategori visual menyatu dengan judul katalog. -->
      <section aria-labelledby="catalog-title" class="border-b border-[#e6d9cb] pb-7 sm:pb-9">
        <div class="grid items-end gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div class="min-w-0 self-center py-2 sm:py-4">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold tracking-widest text-[#627447] uppercase">
              <span class="h-2 w-2 rounded-full bg-[#627447]" aria-hidden="true"></span>
              Dari Jembrana, Bali
              <span class="hidden h-px w-12 bg-[#c7b49d] sm:block" aria-hidden="true"></span>
            </div>
            <h1 id="catalog-title" class="mt-4 text-[clamp(2.65rem,5.7vw,5.25rem)] leading-[0.99] font-black tracking-[-0.055em] text-[#3b2416]">
              Katalog<br class="hidden lg:block" /> <span class="font-serif font-normal italic tracking-[-0.045em] text-[#95613e]">biji kakao</span>
            </h1>
            <p class="mt-4 max-w-md text-sm leading-relaxed text-[#715645] sm:text-base">Pilih biji kakao fermentasi dan non-fermentasi sesuai karakter, grade, dan kebutuhan pengolahan Anda.</p>
            <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#715645] sm:text-sm">
              <span><strong class="text-lg font-bold text-[#3b2416]">{{ publicProducts.length }}</strong> pilihan produk</span>
              <span class="h-1 w-1 rounded-full bg-[#b09a85]" aria-hidden="true"></span>
              <span>Grade A, B &amp; C</span>
            </div>
          </div>

          <!-- Foto kategori berpotongan lengkung dan komposisi asimetris. -->
          <div class="min-w-0">
            <div class="mb-4 flex items-center justify-between gap-3">
              <h2 class="text-xs font-bold tracking-widest text-[#627447] uppercase">Pilih kategori</h2>
              <span class="h-px flex-1 bg-[#e6d9cb]" aria-hidden="true"></span>
            </div>
            <div class="grid grid-cols-[1.1fr_1fr_1fr] items-end gap-3 sm:gap-5" role="group" aria-label="Kategori produk">
              <button v-for="(category, index) in categories" :key="category.value" type="button" :aria-pressed="selectedType === category.value" @click="selectedType = category.value" class="group flex min-w-0 cursor-pointer flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b2416]">
                <div class="relative w-full overflow-hidden rounded-t-full rounded-b-lg transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none" :class="[category.color, index === 0 ? 'aspect-3/4' : 'aspect-4/5']">
                  <img :src="category.image" alt="" class="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />
                  <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" aria-hidden="true"></div>
                  <span class="absolute bottom-2 left-2 text-xs font-semibold text-white sm:bottom-3 sm:left-3" aria-hidden="true">0{{ index + 1 }}</span>
                </div>
                <div class="mt-3 flex min-h-12 w-full flex-col justify-start gap-1 border-b-2 pb-2 transition-colors sm:min-h-14" :class="selectedType === category.value ? 'border-[#627447] text-[#3b2416]' : 'border-[#e6d9cb] text-[#715645] group-hover:border-[#95613e]'">
                  <span class="text-xs leading-tight font-bold wrap-break-word sm:text-sm">{{ category.label }}</span>
                  <span class="text-[11px] text-[#627447]">{{ typeCounts[category.value] ?? 0 }} produk</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Katalog: filter samping di desktop, di atas produk pada layar kecil. -->
      <section class="grid gap-8 pt-8 lg:grid-cols-[215px_minmax(0,1fr)] lg:gap-10" aria-label="Daftar produk kakao">
        <ProductFilter v-model:type="selectedType" v-model:grade="selectedGrade" :type-counts="typeCounts" :grade-counts="gradeCounts" @reset="resetFilters" />
        <div class="min-w-0">
          <div class="flex flex-col gap-3 border-b border-[#e6d9cb] pb-4 sm:flex-row sm:items-center">
            <form role="search" @submit.prevent class="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[#dfcdbb] bg-white px-4 py-3 focus-within:border-[#627447] focus-within:ring-1 focus-within:ring-[#627447]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" class="size-5 shrink-0 text-[#756356]"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg>
              <label for="catalog-search" class="sr-only">Cari nama atau kode produk</label>
              <input id="catalog-search" v-model="search" type="search" placeholder="Cari nama atau kode produk..." class="min-w-0 flex-1 bg-transparent text-sm text-[#3b2416] outline-none placeholder:text-[#8b796a]" />
            </form>
            <div class="flex items-center justify-between gap-2 text-sm sm:justify-start">
              <label for="catalog-sort" class="shrink-0 text-[#756356]">Urutkan:</label>
              <select id="catalog-sort" v-model="sort" class="min-w-0 cursor-pointer rounded-lg border border-[#dfcdbb] bg-white px-3 py-3 text-sm font-medium text-[#3b2416] focus:outline-2 focus:outline-[#627447]">
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3 py-5">
            <p class="text-sm text-[#756356]" aria-live="polite"><strong class="font-bold text-[#3b2416]">{{ filteredProducts.length }}</strong> dari {{ publicProducts.length }} produk</p>
            <button v-if="hasFilters" type="button" class="cursor-pointer text-xs font-semibold text-[#627447] underline underline-offset-4 hover:text-[#3b2416]" @click="resetFilters">Hapus pencarian &amp; filter</button>
          </div>
          <div v-if="filteredProducts.length" id="productsGrid" class="grid grid-cols-1 gap-x-5 gap-y-8 min-[480px]:grid-cols-2 xl:grid-cols-3">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" photo-only detail-label="Lihat detail produk" />
          </div>
          <div v-else class="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#dfcdbb] px-6 py-12 text-center">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" class="mb-4 size-10 text-[#95613e]"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5M7.5 10h5"/></svg>
            <h2 class="text-xl font-bold text-[#3b2416]">Produk tidak ditemukan</h2>
            <p class="mt-2 max-w-sm text-sm leading-relaxed text-[#756356]">Coba nama atau kode lainnya, atau sesuaikan filter yang dipilih.</p>
            <button type="button" @click="resetFilters" class="group mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-[#3b2416] underline underline-offset-4">Lihat semua produk <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span></button>
          </div>
        </div>
      </section>
      <section class="mt-12 flex flex-col justify-between gap-4 border-t border-[#e6d9cb] pt-7 sm:flex-row sm:items-center" aria-label="Pelacakan pesanan">
        <div><h2 class="text-lg font-bold text-[#3b2416]">Sudah melakukan pemesanan?</h2><p class="mt-1 text-sm text-[#756356]">Pantau perkembangan pesanan dan pengiriman Anda</p></div>
        <a href="/traceability" class="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#3b2416] underline underline-offset-4">Lacak Pesanan <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span></a>
      </section>
    </div>
  </PublicLayout>
</template>
