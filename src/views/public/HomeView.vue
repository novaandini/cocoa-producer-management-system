<script setup>
import PublicLayout from '../../components/public/PublicLayout.vue'
import ProductCard from '../../components/public/ProductCard.vue'
import SectionHeading from '../../components/public/SectionHeading.vue'
import { publicProducts } from '../../data/publicProducts.js'

const featured = publicProducts.slice(0, 3)
const categories = [
  { title: 'Fermentasi', subtitle: 'Jelajahi produk', image: '/kakao-home/cocoa-bean-a.jpg', href: '/products?type=fermentasi', color: 'bg-[#e7ecd9]' },
  { title: 'Non-Fermentasi', subtitle: 'Jelajahi produk', image: '/kakao-home/cocoa-bean-c.jpg', href: '/products?type=non-fermentasi', color: 'bg-[#f3dfbe]' },
  { title: 'Grade B', subtitle: 'Jelajahi produk', image: '/kakao-home/cocoa-bean-b.jpg', href: '/products?grade=B', color: 'bg-[#e6d4bf]' },
]
const advantages = [
  { title: 'Fermentasi terkontrol', description: 'Informasi metode pengolahan.', icon: 'leaf' },
  { title: 'Uji kualitas terstandar', description: 'Kenali parameter mutu biji.', icon: 'shield' },
  { title: 'Batch transparan', description: 'Telusuri asal dan pengolahan.', icon: 'trace' },
  { title: 'Pasokan langsung', description: 'Dari unit pengolahan produsen.', icon: 'box' },
]
// Nama fiktif untuk prototipe; ganti dengan mitra yang menyetujui publikasi.
const partners = [
  { name: 'Nusa Kakao Studio', type: 'Pengolahan cokelat', initials: 'NK' },
  { name: 'Rasa Bumi Cokelat', type: 'UMKM pangan', initials: 'RB' },
  { name: 'Sari Biji Nusantara', type: 'Usaha bahan baku', initials: 'SB' },
  { name: 'Teras Cokelat Bali', type: 'Produk artisan', initials: 'TC' },
]
const steps = [
  { title: 'Pilih produk & batch', description: 'Tentukan jenis dan mutu yang Anda perlukan.' },
  { title: 'Daftar akun pembeli', description: 'Daftar sebagai individu atau perusahaan.' },
  { title: 'Checkout & bayar', description: 'Periksa pesanan dan selesaikan pembayaran.' },
  { title: 'Terima pesanan', description: 'Produk dikirim ke alamat tujuan.' },
]
</script>

<template>
  <PublicLayout>
    <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
      <!-- Editorial hero: satu foto dominan, satu CTA -->
      <section id="home" class="pt-5 sm:pt-7" aria-label="Kakao dari Jembrana">
        <div class="relative isolate min-h-120 overflow-hidden rounded-3xl bg-[#3b2416] text-white sm:min-h-130 lg:min-h-140">
          <img src="/kakao-home/hero-kakao.jpg" alt="Buah kakao di perkebunan" fetchpriority="high" class="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div class="absolute inset-0 -z-10 bg-linear-to-r from-[#2b180f]/95 via-[#2b180f]/55 to-transparent"></div>
          <div class="absolute inset-0 -z-10 bg-linear-to-t from-[#2b180f]/70 via-transparent to-[#2b180f]/15 sm:hidden"></div>
          <div class="relative flex min-h-120 max-w-2xl flex-col items-start justify-between p-7 sm:min-h-130 sm:p-12 lg:min-h-140 lg:p-14">
            <p class="flex items-center gap-2 text-xs font-semibold tracking-widest text-white uppercase"><span class="size-2 rounded-full bg-[#a8b882]"></span> Jembrana, Bali</p>
            <div class="my-8">
              <p class="mb-3 text-sm font-medium text-[#f6e7cf] sm:text-base">Dari Jembrana, untuk kebutuhan usaha Anda</p>
              <h1 class="text-5xl leading-[0.98] font-black tracking-tight sm:text-6xl lg:text-7xl">Kakao Lokal<br /><span class="text-[#f1d59f]">Mutu Pilihan</span></h1>
              <p class="mt-6 max-w-sm text-sm leading-relaxed text-white sm:text-base">Temukan biji kakao fermentasi dan non-fermentasi, kenali mutunya, dan pilih sesuai kebutuhan</p>
            </div>
            <a href="/products" class="group inline-flex items-center gap-4 border-b border-white/50 pb-2 text-sm font-bold text-white transition hover:border-[#f1d59f] hover:text-[#f1d59f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Lihat Katalog Produk <span class="inline-block text-xl leading-none text-[#f1d59f] transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span></a>
          </div>
          <p class="absolute right-7 bottom-7 hidden text-right text-xs font-medium tracking-widest text-white sm:block">BIJI KAKAO <span class="mx-2 text-[#f1d59f]">/</span> JEMBRANA</p>
        </div>
      </section>

      <!-- Jelajah kategori: foto bundar, bukan tombol kotak -->
      <section class="py-9 sm:py-12" aria-labelledby="category-title">
        <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p class="mb-1 text-xs font-semibold tracking-widest text-[#627447] uppercase">Kenali pilihanmu</p><h2 id="category-title" class="text-2xl font-bold tracking-tight text-[#3b2416] sm:text-3xl">Jelajahi kakao</h2></div>
          <a href="/products" class="text-sm font-semibold text-[#3b2416] underline decoration-[#a8b882] underline-offset-4 hover:decoration-[#3b2416]">Semua produk <span aria-hidden="true">→</span></a>
        </div>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <a v-for="category in categories" :key="category.title" :href="category.href" class="group flex flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b2416]">
            <div class="flex aspect-square w-full max-w-32 items-center justify-center rounded-full p-3 transition-transform duration-300 group-hover:-translate-y-1 sm:max-w-40 sm:p-4" :class="category.color">
              <img :src="category.image" :alt="category.title" loading="lazy" class="size-full rounded-full object-cover shadow-sm" />
            </div>
            <h3 class="mt-3 text-sm font-bold text-[#38271c] group-hover:underline group-hover:underline-offset-4 sm:text-base">{{ category.title }}</h3><p class="mt-1 text-xs text-[#756356]">{{ category.subtitle }}</p>
          </a>
          <a href="/products" class="group flex flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b2416]">
            <div class="flex aspect-square w-full max-w-32 items-center justify-center rounded-full border border-[#dfcdbb] bg-[#f1e7da] text-[#3b2416] transition-transform duration-300 group-hover:-translate-y-1 sm:max-w-40">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" class="size-12"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 14v7M14 17.5h7"/></svg>
            </div>
            <h3 class="mt-3 text-sm font-bold text-[#38271c] group-hover:underline group-hover:underline-offset-4 sm:text-base">Katalog lengkap</h3><p class="mt-1 text-xs text-[#756356]">Lihat pilihan lainnya</p>
          </a>
        </div>
      </section>

      <!-- Keunggulan: garis pembatas, ikon tanpa kartu berulang -->
      <section id="about" aria-label="Keunggulan produk dan mutu" class="scroll-mt-36 border-y border-[#e6d9cb] py-6 sm:py-8">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <article v-for="(item, index) in advantages" :key="item.title" class="flex items-center gap-3 lg:px-4" :class="index > 0 ? 'lg:border-l lg:border-[#e6d9cb]' : 'lg:pl-0'">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-8 shrink-0 text-[#627447]">
              <template v-if="item.icon === 'leaf'"><path d="M20 4C10 4 5 8 5 15a5 5 0 0 0 5 5c7 0 11-5 10-16Z"/><path d="m4 21 10-10"/></template>
              <template v-else-if="item.icon === 'shield'"><path d="M12 3 4 6v6c0 4 4 7 8 9 4-2 8-5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></template>
              <template v-else-if="item.icon === 'trace'"><path d="M4 5h16v14H4zM8 9h8M8 13h5M8 16h3"/></template>
              <template v-else><path d="m3 7 9-4 9 4v10l-9 4-9-4V7Zm0 0 9 4 9-4M12 11v10M7 5l9 4"/></template>
            </svg>
            <div><h3 class="text-sm font-bold text-[#38271c]">{{ item.title }}</h3><p class="mt-1 text-xs leading-relaxed text-[#756356]">{{ item.description }}</p></div>
          </article>
        </div>
      </section>

      <!-- Etalase: seluruh kartu menjadi tautan, tidak ada tombol besar berulang -->
      <section class="py-10 sm:py-14">
        <SectionHeading eyebrow="Dari produsen" title="Produk unggulan" description="Pilihan biji kakao berdasarkan jenis pengolahan dan grade.">
          <a href="/products" class="text-sm font-semibold text-[#3b2416] underline decoration-[#a8b882] underline-offset-4 hover:decoration-[#3b2416]">Lihat semua <span aria-hidden="true">→</span></a>
        </SectionHeading>
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6" :class="featured.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'">
          <ProductCard v-for="product in featured" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- Panduan pembelian: alur angka editorial, bukan grid kartu tombol -->
      <section class="relative overflow-hidden rounded-3xl bg-[#ede4d5] px-6 py-9 sm:p-10 lg:p-12">
        <div class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p class="text-xs font-semibold tracking-widest text-[#627447] uppercase">Panduan pembelian</p>
            <h2 class="mt-3 text-3xl leading-tight font-black tracking-tight text-[#3b2416] sm:text-5xl">Empat langkah<br />Lebih mudah</h2>
            <p class="mt-4 max-w-xs text-sm leading-relaxed text-[#715645]">Pesan kakao sesuai kebutuhan, mulai dari memilih produk hingga pengiriman</p>
            <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="/products" class="text-sm font-bold text-[#3b2416] underline underline-offset-4">Mulai belanja <span aria-hidden="true">→</span></a>
              <a href="/traceability" class="group inline-flex items-center gap-2 text-sm font-bold text-[#627447] transition hover:text-[#3b2416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#627447]">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-5"><path d="M3 5h12v12H3zM15 9h4l3 4v4h-7"/><circle cx="7.5" cy="18" r="2" fill="#ede4d5"/><circle cx="18.5" cy="18" r="2" fill="#ede4d5"/></svg>
                Lacak pesanan <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </div>
          <ol class="grid gap-5 sm:grid-cols-2">
            <li v-for="(step, index) in steps" :key="step.title" class="border-t border-[#d7c5b2] pt-4">
              <span class="text-4xl font-light tracking-tight text-[#95613e]">0{{ index + 1 }}</span><h3 class="mt-2 text-sm font-bold text-[#38271c]">{{ step.title }}</h3><p class="mt-1 text-sm leading-relaxed text-[#715645]">{{ step.description }}</p>
            </li>
          </ol>
        </div>
      </section>

      <section class="py-10 sm:py-14">
        <div class="flex flex-wrap items-end justify-between gap-3 border-b border-[#e6d9cb] pb-5">
          <div><p class="mb-2 text-xs font-semibold tracking-widest text-[#627447] uppercase">Mitra pembeli</p><h2 class="text-2xl font-bold tracking-tight text-[#3b2416] sm:text-3xl">Tumbuh bersama</h2></div>
          <p class="max-w-sm text-sm leading-relaxed text-[#756356]">Beragam jenis usaha, satu semangat untuk mengembangkan kakao lokal.</p>
        </div>
        <div class="grid grid-cols-2 divide-y divide-[#e6d9cb] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <article v-for="partner in partners" :key="partner.name" class="flex min-w-0 flex-col items-center px-3 py-6 text-center sm:px-4 sm:py-8">
            <span aria-hidden="true" class="mb-3 font-serif text-3xl font-bold tracking-tight text-[#95613e]">{{ partner.initials }}<span class="text-[#627447]">.</span></span>
            <h3 class="text-sm font-bold text-[#3b2416] sm:text-base">{{ partner.name }}</h3>
            <p class="mt-1 text-xs text-[#756356]">{{ partner.type }}</p>
          </article>
        </div>
        <p class="mt-3 text-xs text-[#756356]">Contoh mitra</p>
      </section>
    </div>
  </PublicLayout>
</template>
