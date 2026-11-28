<script setup>
import { ref } from 'vue'
import PublicLayout from '../../components/public/PublicLayout.vue'
import FaqAccordion from '../../components/public/FaqAccordion.vue'

// Informasi edukasi umum. Sesuaikan dengan SOP dan profil resmi produsen.
const processSteps = [
  { title: 'Panen & sortasi', description: 'Buah yang matang dipilih, dibuka, dan bijinya disortir sebelum pengolahan.' },
  { title: 'Fermentasi', description: 'Untuk kakao fermentasi, biji melalui proses yang membantu membentuk karakter rasa dan aroma.' },
  { title: 'Pengeringan', description: 'Biji dikeringkan untuk menurunkan kadar air sebelum penyimpanan.' },
  { title: 'Pemeriksaan mutu', description: 'Kadar air, tingkat fermentasi (jika relevan), dan cacat biji menjadi informasi penting dalam penilaian batch.' },
]
const grades = [
  { grade: 'A', color: 'bg-[#e7ecd9] text-[#455637]', description: 'Kategori mutu A dalam katalog.' },
  { grade: 'B', color: 'bg-[#f1e7d8] text-[#785438]', description: 'Kategori mutu B dalam katalog.' },
  { grade: 'C', color: 'bg-[#ecd9c5] text-[#67432e]', description: 'Kategori mutu C dalam katalog.' },
]
const buyingSteps = [
  { title: 'Pilih produk', description: 'Temukan jenis dan grade yang sesuai kebutuhan.', href: '/products', linkLabel: 'Katalog produk' },
  { title: 'Periksa batch', description: 'Baca informasi asal, stok dan mutu pada detail produk.' },
  { title: 'Buat pesanan', description: 'Masuk atau daftar, lalu lanjutkan dari keranjang.', href: '/cart', linkLabel: 'Keranjang' },
  { title: 'Pantau pengiriman', description: 'Lihat perkembangan pesanan melalui fitur pelacakan.', href: '/traceability', linkLabel: 'Lacak pesanan' },
]
const faqs = [
  { question: 'Siapa saja yang dapat membeli produk kakao?', answer: 'Individu, UMKM, maupun perusahaan dapat mendaftar sebagai pelanggan. Perusahaan dapat mengisi informasi usaha pada formulir pendaftaran.', href: '/register', linkLabel: 'Buat akun' },
  { question: 'Apa perbedaan kakao fermentasi dan non-fermentasi?', answer: 'Kakao fermentasi melalui tahapan fermentasi yang membantu membentuk karakter rasa dan aroma. Kakao non-fermentasi tidak melalui tahapan tersebut. Pilih berdasarkan kebutuhan pengolahan.', href: '/products', linkLabel: 'Lihat jenis produk' },
  { question: 'Apakah saya bisa memilih batch produk?', answer: 'Anda dapat melihat informasi batch pada detail produk dan memilih batch yang masih tersedia. Ketersediaan aktual mengikuti data stok produsen.', href: '/products', linkLabel: 'Lihat katalog' },
  { question: 'Berapa minimum pembelian?', answer: 'Produk ditampilkan dengan harga per kilogram. Ketentuan minimum pembelian resmi masih menunggu konfirmasi produsen.' },
  { question: 'Bagaimana cara melakukan pembayaran?', answer: 'Alur pembelian dirancang melalui keranjang dan checkout. Metode pembayaran, biaya, serta instruksi resmi perlu dikonfirmasi pada tahap pembayaran setelah integrasi sistem selesai.' },
  { question: 'Apakah tersedia pengiriman ke luar Bali?', answer: 'Jangkauan pengiriman, biaya, dan estimasi waktu belum dikonfirmasi. Ketersediaannya perlu disesuaikan dengan alamat tujuan dan layanan pengiriman produsen.' },
  { question: 'Bagaimana cara melacak pesanan?', answer: 'Gunakan menu Lacak Pesanan. Informasi status pesanan dan pengiriman aktual akan mengikuti data yang terhubung dengan sistem.', href: '/traceability', linkLabel: 'Lacak pesanan' },
  { question: 'Apakah nama perusahaan otomatis menjadi mitra di Beranda?', answer: 'Tidak. Publikasi nama perusahaan memerlukan persetujuan pelanggan serta verifikasi admin bahwa perusahaan benar-benar merupakan mitra pembeli.' },
]
const showMap = ref(false)
const mapLink = 'https://www.google.com/maps/search/?api=1&query=Kabupaten%20Jembrana%2C%20Bali%2C%20Indonesia'
const mapEmbed = 'https://maps.google.com/maps?q=Kabupaten%20Jembrana%2C%20Bali%2C%20Indonesia&z=10&output=embed'
</script>

<template>
  <PublicLayout>
    <div class="mx-auto max-w-7xl px-4 pt-6 sm:px-8 sm:pt-8 lg:px-10">
      <nav aria-label="Breadcrumb" class="mb-6 flex items-center gap-2 text-xs text-[#756356]">
        <a href="/" class="hover:text-[#3b2416] hover:underline">Beranda</a><span aria-hidden="true">/</span><span aria-current="page" class="font-semibold text-[#3b2416]">Tentang Kami</span>
      </nav>
      <!-- Editorial hero: mengikuti tipografi halaman katalog. -->
      <section aria-labelledby="about-title" class="grid items-center gap-10 border-b border-[#e6d9cb] pb-12 sm:pb-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div class="py-3 sm:py-8">
          <p class="flex items-center gap-3 text-xs font-bold tracking-widest text-[#627447] uppercase"><span class="size-2 rounded-full bg-[#627447]" aria-hidden="true"></span> Tentang kami <span class="h-px w-12 bg-[#c7b49d]" aria-hidden="true"></span></p>
          <h1 id="about-title" class="mt-5 text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.98] font-black tracking-[-0.055em] text-[#3b2416]">Berawal dari<br class="hidden sm:block" /> <span class="font-serif font-normal italic tracking-[-0.045em] text-[#95613e]">biji kakao</span></h1>
          <p class="mt-6 max-w-lg text-base leading-relaxed text-[#715645]">Mengenal kakao dari Jembrana, Bali. Dari buah yang tumbuh di kebun hingga biji yang siap dipilih untuk kebutuhan pengolahan Anda.</p>
          <p class="mt-4 max-w-lg text-sm leading-relaxed text-[#715645]">KAKAO dirancang untuk mempertemukan produsen dan pembeli melalui katalog produk, informasi batch, serta pemantauan pesanan dalam satu platform.</p>
          <div class="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <a href="/products" class="group inline-flex items-center gap-3 border-b border-[#b9a78e] pb-2 text-[#3b2416] hover:border-[#3b2416]">Jelajahi produk <span class="transition group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span></a>
            <a href="#faq" class="border-b border-[#b9a78e] pb-2 text-[#627447] hover:border-[#627447]">Panduan pembelian <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <figure class="relative mx-auto w-full max-w-xl pr-4 pb-4 sm:pr-6 sm:pb-6">
          <div class="absolute inset-0 top-5 left-5 rounded-t-full rounded-br-[5rem] rounded-bl-2xl bg-[#e7ecd9]" aria-hidden="true"></div>
          <img src="/kakao-home/login-kakao-matang.jpg" alt="Ilustrasi buah kakao matang pada pohon" class="relative aspect-4/3 w-full rounded-t-full rounded-br-[5rem] rounded-bl-2xl object-cover" fetchpriority="high" />
          <figcaption class="relative mt-3 flex items-center gap-3 text-xs text-[#715645]"><span class="h-px w-8 bg-[#b9a78e]" aria-hidden="true"></span> Jembrana, Bali · Ilustrasi buah kakao</figcaption>
        </figure>
      </section>

      <section aria-labelledby="process-title" class="py-12 sm:py-18 lg:py-20">
        <div class="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p class="text-xs font-bold tracking-widest text-[#627447] uppercase">Dari kebun ke pembeli</p>
            <h2 id="process-title" class="mt-3 text-4xl leading-tight font-black tracking-tight text-[#3b2416] sm:text-5xl">Kenali setiap <span class="font-serif font-normal italic text-[#95613e]">prosesnya</span></h2>
            <p class="mt-4 max-w-sm text-sm leading-relaxed text-[#715645]">Gambaran umum pengolahan kakao, bukan SOP produsen yang telah diverifikasi.</p>
            <img src="/kakao-home/cocoa-bean-a.jpg" alt="Ilustrasi biji kakao" loading="lazy" class="mt-6 aspect-16/10 w-full max-w-md rounded-tr-[4rem] rounded-bl-[4rem] object-cover" />
          </div>
          <ol class="border-t border-[#e6d9cb]">
            <li v-for="(step, index) in processSteps" :key="step.title" class="grid grid-cols-[3rem_1fr] gap-4 border-b border-[#e6d9cb] py-5 sm:grid-cols-[4rem_1fr] sm:py-6">
              <span class="font-serif text-3xl italic text-[#95613e] sm:text-4xl">{{ String(index + 1).padStart(2, '0') }}</span>
              <div><h3 class="text-lg font-bold text-[#3b2416]">{{ step.title }}</h3><p class="mt-2 text-sm leading-relaxed text-[#715645]">{{ step.description }}</p></div>
            </li>
          </ol>
        </div>
      </section>
    </div>

    <section aria-labelledby="quality-title" class="bg-[#f1e7d8] py-12 sm:py-16 lg:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div class="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16">
          <div><p class="text-xs font-bold tracking-widest text-[#627447] uppercase">Jenis &amp; kualitas</p><h2 id="quality-title" class="mt-3 text-4xl font-black tracking-tight text-[#3b2416] sm:text-5xl">Kenali <span class="font-serif font-normal italic text-[#95613e]">mutu kakao</span></h2></div>
          <p class="max-w-lg text-sm leading-relaxed text-[#715645]">Grade adalah kategori produk dalam katalog. Periksa hasil uji tiap batch sebelum menentukan pilihan.</p>
        </div>
        <div class="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-8">
          <article class="border-t border-[#bba68f] pt-5"><h3 class="text-xl font-bold text-[#3b2416]">Fermentasi</h3><p class="mt-2 text-sm leading-relaxed text-[#715645]">Melalui proses fermentasi untuk mengembangkan karakter rasa dan aroma biji kakao.</p><a href="/products?type=fermentasi" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3b2416] underline underline-offset-4">Lihat produk <span aria-hidden="true">→</span></a></article>
          <article class="border-t border-[#bba68f] pt-5"><h3 class="text-xl font-bold text-[#3b2416]">Non-fermentasi</h3><p class="mt-2 text-sm leading-relaxed text-[#715645]">Biji tidak melalui fermentasi. Pilihan penggunaannya bergantung pada kebutuhan pengolahan.</p><a href="/products?type=non-fermentasi" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3b2416] underline underline-offset-4">Lihat produk <span aria-hidden="true">→</span></a></article>
        </div>
        <div class="mt-10 overflow-x-auto rounded-xl border border-[#ddcbb7] bg-[#fbf8f3]">
          <table class="w-full min-w-[40rem] text-left text-sm">
            <caption class="px-5 py-4 text-left text-sm font-bold text-[#3b2416]">Indikator mutu berdasarkan grade katalog</caption>
            <thead class="border-y border-[#e6d9cb] bg-[#f6efe5] text-xs font-semibold text-[#715645]"><tr><th scope="col" class="px-5 py-4">Grade</th><th scope="col" class="px-5 py-4">Kategori</th><th scope="col" class="px-5 py-4">Kadar air</th><th scope="col" class="px-5 py-4">Fermentasi*</th><th scope="col" class="px-5 py-4">Cacat biji</th></tr></thead>
            <tbody class="divide-y divide-[#e6d9cb] text-[#715645]"><tr v-for="item in grades" :key="item.grade"><th scope="row" class="px-5 py-4"><a :href="`/products?grade=${item.grade}`" :class="item.color" class="inline-flex rounded-full px-3 py-1.5 text-xs font-bold hover:underline">Grade {{ item.grade }}</a></th><td class="px-5 py-4">{{ item.description }}</td><td class="px-5 py-4">Per batch</td><td class="px-5 py-4">Per batch</td><td class="px-5 py-4">Per batch</td></tr></tbody>
          </table>
        </div>
        <p class="mt-4 text-xs leading-relaxed text-[#715645]">* Untuk jenis fermentasi. Batas mutu numerik Grade A, B, dan C belum dikonfirmasi oleh produsen. Angka pada data demonstrasi batch bukan standar mutu resmi.</p>
      </div>
    </section>

    <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
      <section aria-labelledby="buy-title" class="border-b border-[#e6d9cb] py-12 sm:py-16 lg:py-20">
        <p class="text-xs font-bold tracking-widest text-[#627447] uppercase">Panduan pembelian</p><h2 id="buy-title" class="mt-3 text-4xl font-black tracking-tight text-[#3b2416] sm:text-5xl">Dari pilihan <span class="font-serif font-normal italic text-[#95613e]">ke pesanan</span></h2>
        <ol class="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <li v-for="(step, index) in buyingSteps" :key="step.title" class="border-t border-[#c7b49d] pt-5"><span class="font-serif text-4xl italic text-[#95613e]">0{{ index + 1 }}</span><h3 class="mt-4 text-lg font-bold text-[#3b2416]">{{ step.title }}</h3><p class="mt-2 text-sm leading-relaxed text-[#715645]">{{ step.description }}</p><a v-if="step.href" :href="step.href" class="mt-4 inline-flex gap-2 text-xs font-semibold text-[#627447] hover:underline">{{ step.linkLabel }} <span aria-hidden="true">→</span></a></li>
        </ol>
      </section>
      <section id="faq" aria-labelledby="faq-title" class="grid scroll-mt-44 gap-8 border-b border-[#e6d9cb] py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
        <div><p class="text-xs font-bold tracking-widest text-[#627447] uppercase">FAQ</p><h2 id="faq-title" class="mt-3 text-4xl leading-tight font-black tracking-tight text-[#3b2416] sm:text-5xl">Temukan<br/><span class="font-serif font-normal italic text-[#95613e]">jawaban Anda</span></h2><p class="mt-4 max-w-xs text-sm leading-relaxed text-[#715645]">Informasi yang membantu Anda mengenal produk dan memahami alur pembelian.</p></div>
        <FaqAccordion :items="faqs" />
      </section>
      <section aria-labelledby="contact-title" class="grid items-start gap-8 py-12 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
        <div><p class="text-xs font-bold tracking-widest text-[#627447] uppercase">Lokasi &amp; kontak</p><h2 id="contact-title" class="mt-3 text-4xl font-black tracking-tight text-[#3b2416] sm:text-5xl">Temui <span class="font-serif font-normal italic text-[#95613e]">kami</span></h2>
          <dl class="mt-7 divide-y divide-[#e6d9cb] border-y border-[#e6d9cb] text-sm"><div class="py-4"><dt class="font-semibold text-[#3b2416]">Wilayah produksi</dt><dd class="mt-1 text-[#715645]">Jembrana, Bali, Indonesia</dd></div><div class="py-4"><dt class="font-semibold text-[#3b2416]">Alamat unit pengolahan</dt><dd class="mt-1 text-[#715645]">Menunggu data resmi produsen</dd></div><div class="py-4"><dt class="font-semibold text-[#3b2416]">WhatsApp &amp; email</dt><dd class="mt-1 text-[#715645]">Menunggu data kontak resmi</dd></div><div class="py-4"><dt class="font-semibold text-[#3b2416]">Jam operasional</dt><dd class="mt-1 text-[#715645]">Menunggu konfirmasi</dd></div></dl>
        </div>
        <div class="overflow-hidden rounded-2xl border border-[#e6d9cb] bg-[#f1e7d8]">
          <iframe v-if="showMap" :src="mapEmbed" title="Peta wilayah Kabupaten Jembrana, bukan titik unit pengolahan" class="aspect-4/3 w-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div v-else class="relative flex aspect-4/3 flex-col items-center justify-center gap-4 overflow-hidden p-6 text-center">
            <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true" class="absolute inset-0 size-full text-[#d9c9b3]"><g fill="none" stroke="currentColor" stroke-width="1"><path d="M-25 75Q125 5 230 80T425 60M-30 105Q120 35 225 110T425 90M-35 135Q115 65 220 140T425 120M-40 165Q110 95 215 170T425 150M-45 195Q105 125 210 200T425 180M-50 225Q100 155 205 230T425 210M-55 255Q95 185 200 260T425 240"/></g></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" class="relative size-10 text-[#627447]"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg><p class="relative text-2xl font-bold text-[#3b2416]">Jembrana, Bali</p><button type="button" @click="showMap = true" class="relative cursor-pointer rounded-full bg-[#3b2416] px-5 py-3 text-xs font-semibold text-white hover:bg-[#95613e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b2416]">Tampilkan peta wilayah</button>
          </div>
          <div class="border-t border-[#ddcbb7] bg-[#fbf8f3] p-5"><p class="text-xs leading-relaxed text-[#715645]">Peta hanya menunjukkan wilayah Jembrana, bukan alamat pasti unit pengolahan. Peta membutuhkan koneksi internet.</p><a :href="mapLink" target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex gap-2 text-sm font-semibold text-[#3b2416] hover:underline">Buka Google Maps <span aria-hidden="true">→</span></a></div>
        </div>
      </section>
    </div>
  </PublicLayout>
</template>
