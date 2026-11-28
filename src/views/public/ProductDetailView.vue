<script setup>
import { computed, ref, watch } from 'vue'
import PublicLayout from '../../components/public/PublicLayout.vue'
import GradeBadge from '../../components/public/GradeBadge.vue'
import QuantitySelector from '../../components/public/QuantitySelector.vue'
import BatchTable from '../../components/public/BatchTable.vue'
import { publicProducts, formatRupiah } from '../../data/publicProducts.js'
import { getProductBatches } from '../../data/publicBatches.js'
import { useCart } from '../../composables/useCart.js'

const id = new URLSearchParams(window.location.search).get('product') || 'a'
const product = publicProducts.find(item => item.id === id)
const batches = product ? getProductBatches(product.id) : []
const { remainingStock, addItem, storageError } = useCart()
const availableBatches = computed(() => batches.filter(batch => batch.passed && batch.stock > 0))
const availableStock = computed(() => availableBatches.value.reduce((total, batch) => total + batch.stock, 0))
const selectableBatchIds = computed(() => availableBatches.value.filter(batch => remainingStock(id, batch.id) > 0).map(batch => batch.id))
const selectedBatchId = ref(selectableBatchIds.value[0] || '')
const selectedBatch = computed(() => batches.find(batch => batch.id === selectedBatchId.value))
const maxQuantity = computed(() => remainingStock(id, selectedBatchId.value))
const quantity = ref(maxQuantity.value > 0 ? 1 : 0)
const subtotal = computed(() => (product?.price || 0) * quantity.value)
const message = ref('')
const added = ref(false)
watch(maxQuantity, max => { quantity.value = Math.min(max, Math.max(max > 0 ? 1 : 0, quantity.value)) })
function chooseBatch(batchId) {
  if (selectedBatchId.value === batchId || !selectableBatchIds.value.includes(batchId)) return
  selectedBatchId.value = batchId
  quantity.value = maxQuantity.value > 0 ? 1 : 0
  message.value = ''
  added.value = false
}
function addToCart() {
  added.value = addItem(id, selectedBatchId.value, quantity.value)
  message.value = added.value ? (storageError.value ? 'Produk ditambahkan, tetapi penyimpanan browser tidak tersedia. Keranjang mungkin hilang saat pindah halaman.' : 'Produk berhasil ditambahkan ke keranjang.') : 'Jumlah melebihi stok batch yang tersedia atau batch tidak valid.'
}
</script>

<template>
  <PublicLayout>
    <div v-if="product" class="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-8 lg:px-10">
      <nav aria-label="Breadcrumb" class="mb-7 flex flex-wrap items-center gap-2 text-xs text-[#756356] sm:mb-10 sm:text-sm">
        <a href="/" class="hover:text-[#3b2416] hover:underline">Beranda</a><span aria-hidden="true">/</span>
        <a href="/products" class="hover:text-[#3b2416] hover:underline">Katalog Produk</a><span aria-hidden="true">/</span>
        <span aria-current="page" class="font-semibold text-[#3b2416]">{{ product.name }}</span>
      </nav>
      <section class="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <!-- Foto produk asli dari katalog, tanpa foto tambahan palsu. -->
        <div>
          <div class="group relative aspect-4/3 overflow-hidden rounded-3xl bg-[#f1e7d8] lg:aspect-square">
            <img :src="product.image" :alt="product.name" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
            <span class="absolute top-4 left-4"><GradeBadge :grade="product.grade" /></span>
          </div>
          <div class="mt-4 flex items-center justify-between border-b border-[#e6d9cb] pb-4 text-xs text-[#756356]">
            <span>01 / Foto produk</span><span class="font-semibold tracking-widest text-[#627447] uppercase">Kakao Jembrana</span>
          </div>
        </div>
        <div class="min-w-0 pt-1">
          <div class="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wide text-[#627447] uppercase"><span class="h-px w-8 bg-[#627447]"></span>{{ product.type }}<span class="text-[#9a7b62]">/</span>{{ product.code }}</div>
          <h1 class="mt-3 text-4xl font-bold tracking-tight text-[#3b2416] sm:text-5xl xl:text-6xl">{{ product.name }}</h1>
          <div class="mt-4 flex flex-wrap items-center gap-3"><GradeBadge :grade="product.grade" /><span class="text-sm font-medium text-[#715645]">{{ availableStock > 0 ? `${availableStock} kg tersedia` : 'Stok Habis' }}</span></div>
          <p class="mt-6 text-3xl font-bold tracking-tight text-[#3b2416] sm:text-4xl">{{ formatRupiah(product.price) }} <span class="text-sm font-normal tracking-normal text-[#756356]">/ kg</span></p>
          <p class="mt-5 text-sm leading-relaxed text-[#715645] sm:text-base">Biji kakao {{ product.type.toLowerCase() }} Grade {{ product.grade }}</p>
          <a href="#batch" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#627447] hover:underline hover:underline-offset-4">Lihat transparansi batch <span aria-hidden="true">↓</span></a>
          <div class="mt-7 border-t border-[#e6d9cb] pt-6">
            <div class="flex items-baseline justify-between gap-3"><h2 class="text-lg font-bold text-[#3b2416]">Atur pesanan</h2><span class="text-xs text-[#756356]">Dalam kilogram</span></div>
            <label for="batch-select" class="mt-4 block text-sm font-semibold">Pilih batch</label>
            <select id="batch-select" :value="selectedBatchId" class="mt-2 w-full rounded-xl border border-[#d9c7b5] bg-white px-4 py-3 text-sm focus:outline-[#627447]" @change="chooseBatch($event.target.value)">
              <option v-if="!selectedBatchId" value="" disabled>{{ availableBatches.length ? 'Tidak ada batch yang dapat ditambahkan' : 'Tidak ada batch tersedia' }}</option>
              <option v-for="batch in batches" :key="batch.id" :value="batch.id" :disabled="!selectableBatchIds.includes(batch.id)">{{ batch.code }} — {{ !batch.passed ? 'Belum lolos uji' : batch.stock === 0 ? 'Stok habis' : remainingStock(id, batch.id) > 0 ? `${remainingStock(id, batch.id)} kg tersedia` : 'Batas stok di keranjang tercapai' }}</option>
            </select>
            <p v-if="selectedBatch" class="mt-2 text-xs text-[#756356]">{{ maxQuantity }} kg tersedia setelah memperhitungkan isi keranjang Anda</p>
            <div class="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div><label for="detail-quantity" class="mb-2 block text-sm font-semibold">Jumlah (kg)</label><QuantitySelector v-model="quantity" :max="maxQuantity" input-id="detail-quantity" /></div>
              <div class="text-right"><p class="text-xs text-[#756356]">Estimasi subtotal</p><p class="mt-1 text-2xl font-bold tracking-tight text-[#3b2416]">{{ formatRupiah(subtotal) }}</p></div>
            </div>
            <button type="button" :disabled="maxQuantity === 0 || quantity === 0" class="mt-5 flex w-full cursor-pointer items-center justify-between rounded-xl bg-[#3b2416] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#75482c] disabled:cursor-not-allowed disabled:opacity-45" @click="addToCart">
              <span>{{ maxQuantity === 0 ? 'Stok batch tidak tersedia' : 'Tambah ke Keranjang' }}</span><span aria-hidden="true">→</span>
            </button>
            <div v-if="message" class="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm" role="status"><span :class="added && !storageError ? 'text-[#43552c]' : 'text-red-700'">{{ message }}</span><a v-if="added" href="/cart" class="font-semibold text-[#3b2416] underline underline-offset-4">Lihat keranjang →</a></div>
            <p class="mt-3 text-xs leading-relaxed text-[#756356]">Belum termasuk ongkos kirim. Anda dapat menambahkan produk sebelum masuk ke akun.</p>
          </div>
        </div>
      </section>
      <section id="batch" class="mt-14 scroll-mt-44 border-t border-[#e6d9cb] pt-10 lg:mt-20 lg:scroll-mt-24">
        <div class="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p class="text-xs font-semibold tracking-widest text-[#627447] uppercase">Transparansi Batch</p><h2 class="mt-2 text-3xl font-bold tracking-tight text-[#3b2416] sm:text-4xl">Kenali Batch Kakao Anda</h2><p class="mt-3 max-w-2xl text-sm leading-relaxed text-[#715645]">Informasi asal, tanggal panen, produksi dan parameter kualitas pada tiap batch. Klik kode batch yang tersedia untuk memilihnya.</p></div>
          <div class="shrink-0 border-l border-[#d9c7b5] pl-4"><p class="text-3xl font-bold text-[#3b2416]">{{ availableBatches.length }} Batch</p><p class="text-xs text-[#756356]">Tersedia</p></div>
        </div>
        <p class="mb-4 text-xs leading-relaxed text-[#715645]">Data batch dan hasil uji kualitas di bawah merupakan contoh demonstrasi, bukan catatan panen atau hasil laboratorium resmi. Tanda — berarti parameter tidak dicantumkan.</p>
        <BatchTable :batches="batches" :selected-id="selectedBatchId" :selectable-ids="selectableBatchIds" @select="chooseBatch" />
        <div class="mt-8 flex flex-wrap justify-between gap-4 text-sm font-semibold text-[#3b2416]"><a href="/products" class="hover:underline hover:underline-offset-4">← Kembali ke Katalog Produk</a><a href="/traceability" class="hover:underline hover:underline-offset-4">Lacak Pesanan →</a></div>
      </section>
    </div>
    <section v-else class="mx-auto max-w-3xl px-5 py-24 text-center"><h1 class="text-3xl font-bold text-[#3b2416]">Produk tidak ditemukan</h1><p class="mt-3 text-sm text-[#756356]">Pilih produk yang tersedia di katalog.</p><a href="/products" class="mt-6 inline-block font-semibold text-[#3b2416] underline underline-offset-4">← Kembali ke Katalog Produk</a></section>
  </PublicLayout>
</template>
