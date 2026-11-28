<script setup>
import PublicLayout from '../../components/public/PublicLayout.vue'
import GradeBadge from '../../components/public/GradeBadge.vue'
import QuantitySelector from '../../components/public/QuantitySelector.vue'
import { useCart } from '../../composables/useCart.js'
import { formatRupiah } from '../../data/publicProducts.js'

const { items, productCount, totalWeight, totalPrice, storageError, updateQuantity, removeItem } = useCart()
</script>

<template>
  <PublicLayout>
    <section class="mx-auto max-w-7xl px-4 pt-7 pb-20 sm:px-8 lg:px-10">
      <nav aria-label="Breadcrumb" class="flex flex-wrap items-center gap-2 text-xs text-[#756356] sm:text-sm">
        <a href="/" class="hover:underline">Beranda</a><span aria-hidden="true">/</span>
        <span aria-current="page" class="font-semibold text-[#3b2416]">Keranjang Belanja</span>
      </nav>

      <!-- Header terbuka, tanpa kartu banner. -->
      <header class="mt-9 flex flex-wrap items-end justify-between gap-6 border-b border-[#ddcdbd] pb-7 sm:mt-12">
        <div>
          <p class="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#627447] uppercase"><span class="h-px w-7 bg-[#627447]" aria-hidden="true"></span>Pesanan Anda</p>
          <h1 class="mt-3 text-4xl leading-tight font-bold tracking-tight text-[#3b2416] sm:text-5xl lg:text-6xl">Keranjang <span class="font-serif font-normal text-[#95613e] italic">Belanja</span></h1>
          <p class="mt-3 max-w-xl text-sm leading-relaxed text-[#715645]">Periksa kembali pilihan biji kakao dan jumlah yang ingin Anda pesan</p>
        </div>
      </header>

      <p v-if="storageError" role="alert" class="mt-5 text-sm text-red-700">Perubahan keranjang belum dapat disimpan. Periksa izin penyimpanan browser sebelum berpindah halaman.</p>

      <div v-if="items.length" class="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px] xl:gap-14">
        <div class="min-w-0">
          <div class="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#ddcdbd] pb-4">
            <h2 class="text-xl font-bold tracking-tight">Daftar produk <span class="ml-1 text-sm font-normal text-[#756356]">({{ items.length }} item)</span></h2>
            <span class="text-xs text-[#756356]">Satuan berat: kg</span>
          </div>
          <div class="hidden grid-cols-[minmax(0,1fr)_160px_132px] gap-4 border-b border-[#e6d9cb] py-4 text-xs font-semibold tracking-wide text-[#756356] uppercase xl:grid">
            <span>Produk</span><span>Jumlah</span><span class="text-right">Subtotal</span>
          </div>
          <div class="divide-y divide-[#e6d9cb]">
            <article v-for="item in items" :key="`${item.productId}-${item.batchId}`" class="grid grid-cols-[80px_minmax(0,1fr)] items-start gap-x-4 gap-y-4 py-6 sm:grid-cols-[100px_minmax(0,1fr)_auto] sm:items-center xl:grid-cols-[minmax(0,1fr)_160px_132px]">
              <div class="col-span-2 flex min-w-0 items-start gap-4 sm:col-span-2 xl:col-span-1">
                <a :href="`/detail-product?product=${encodeURIComponent(item.productId)}`" :aria-label="`Lihat detail ${item.product.name}`" class="group size-20 shrink-0 overflow-hidden rounded-xl bg-[#f1e7d8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b2416] sm:size-25">
                  <img :src="item.product.image" :alt="item.product.name" loading="lazy" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none" />
                </a>
                <div class="min-w-0 flex-1">
                  <p class="text-xs font-semibold text-[#627447]">{{ item.product.code }}</p>
                  <h3 class="mt-1 text-lg leading-tight font-bold text-[#3b2416]">{{ item.product.name }}</h3>
                  <div class="mt-2 flex flex-wrap items-center gap-2"><GradeBadge :grade="item.product.grade" /><span class="text-xs text-[#715645]">{{ item.product.type }}</span></div>
                  <p class="mt-2 text-xs text-[#756356]">Batch: <span class="font-semibold text-[#3b2416]">{{ item.batch.code }}</span></p>
                  <p class="mt-1 text-sm font-semibold">{{ formatRupiah(item.product.price) }} <span class="text-xs font-normal text-[#756356]">/ kg</span></p>
                  <button type="button" :aria-label="`Hapus ${item.product.name}, ${item.batch.code}`" class="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#8b4937] hover:underline hover:underline-offset-4" @click="removeItem(item.productId, item.batchId)">
                    <svg aria-hidden="true" class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M5 6l1 14h12l1-14M10 10v6m4-6v6"/></svg>Hapus item
                  </button>
                </div>
              </div>
              <div class="col-span-2 flex flex-wrap items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end xl:items-start">
                <div>
                  <label :for="`cart-${item.batchId}`" class="mb-1.5 block text-xs font-medium text-[#756356] xl:sr-only">Jumlah (kg)</label>
                  <QuantitySelector :model-value="item.quantity" :max="item.batch.stock" :input-id="`cart-${item.batchId}`" @update:model-value="updateQuantity(item.productId, item.batchId, $event)" />
                  <p class="mt-2 text-xs text-[#756356]">Maks. {{ item.batch.stock }} kg</p>
                </div>
                <div class="text-right xl:hidden"><p class="text-xs text-[#756356]">Subtotal</p><p class="mt-1 font-bold tabular-nums">{{ formatRupiah(item.subtotal) }}</p></div>
              </div>
              <p class="hidden text-right text-base font-bold tabular-nums xl:block">{{ formatRupiah(item.subtotal) }}</p>
            </article>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3 border-t border-[#ddcdbd] pt-5 text-xs text-[#756356]">
            <span>Produk yang sama dari batch berbeda dicatat sebagai item terpisah</span>
            <a href="/products" class="font-semibold text-[#627447] hover:underline">Tambah produk lain →</a>
          </div>
        </div>

        <!-- Ringkasan belanja, satu bidang kontras untuk fokus aksi utama. -->
        <aside aria-labelledby="cart-summary" class="border-t-4 border-[#95613e] bg-[#f1e7d8] p-6 sm:p-7 lg:sticky lg:top-28">
          <h2 id="cart-summary" class="text-xl font-bold tracking-tight text-[#3b2416]">Ringkasan belanja</h2>
          <dl class="mt-6 space-y-4 text-sm text-[#715645]">
            <div class="flex items-baseline justify-between gap-3"><dt>Jenis produk</dt><dd class="font-bold text-[#3b2416]">{{ productCount }}</dd></div>
            <div class="flex items-baseline justify-between gap-3"><dt>Jumlah item batch</dt><dd class="font-bold text-[#3b2416]">{{ items.length }}</dd></div>
            <div class="flex items-baseline justify-between gap-3"><dt>Total berat</dt><dd class="font-bold text-[#3b2416]">{{ totalWeight }} kg</dd></div>
          </dl>
          <div class="mt-6 border-t border-[#d9c7b5] pt-5">
            <p class="text-sm font-semibold text-[#715645]">Estimasi total</p>
            <p aria-live="polite" class="mt-2 text-3xl font-bold tracking-tight text-[#3b2416] tabular-nums">{{ formatRupiah(totalPrice) }}</p>
            <p class="mt-2 text-xs text-[#756356]">Belum termasuk ongkos kirim</p>
          </div>
          <!-- Checkout multi-item belum dapat dikirim ke CheckoutView lama. -->
          <button type="button" disabled aria-describedby="checkout-note" class="mt-7 flex w-full cursor-not-allowed items-center justify-center rounded-lg bg-[#3b2416] px-4 py-4 text-sm font-bold text-white opacity-55">Lanjut ke Checkout</button>
          <p id="checkout-note" class="mt-3 text-xs leading-relaxed text-[#715645]">Checkout beberapa item belum terhubung. Anda tetap dapat mengatur keranjang.</p>
        </aside>
      </div>

      <div v-else class="mx-auto grid max-w-4xl items-center gap-8 py-12 sm:grid-cols-[1fr_1fr] sm:py-16">
        <div class="relative aspect-4/3 overflow-hidden rounded-t-full bg-[#e8eedc]">
          <img src="/kakao-home/hero-kakao.jpg" alt="Buah dan biji kakao" class="h-full w-full object-cover" />
        </div>
        <div class="sm:py-8">
          <p class="text-xs font-semibold tracking-widest text-[#627447] uppercase">Mulai belanja</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-[#3b2416] sm:text-4xl">Keranjang masih kosong.</h2>
          <p class="mt-4 text-sm leading-relaxed text-[#715645]">Jelajahi katalog, pilih batch kakao yang sesuai, lalu tambahkan produk ke keranjang Anda.</p>
          <a href="/products" class="group mt-6 inline-flex items-center gap-3 border-b border-[#95613e] pb-2 text-sm font-bold text-[#3b2416] hover:text-[#95613e]">Jelajahi katalog <span aria-hidden="true" class="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span></a>
        </div>
      </div>
    </section>
  </PublicLayout>
</template>
