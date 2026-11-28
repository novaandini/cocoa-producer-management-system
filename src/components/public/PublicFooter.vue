<script setup>
defineProps({ aboutHref: { type: String, default: '/about' } })
</script>

<template>
  <footer class="bg-[#302016] text-[#fbf8f3]">
    <div class="mx-auto grid max-w-7xl gap-9 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1.25fr] lg:px-16 lg:py-16">
      <div>
        <a href="/" class="text-3xl font-extrabold tracking-wide text-white">KAKAO<span class="text-[#d8b480]"></span></a>
        <p class="mt-4 max-w-xs text-sm leading-relaxed text-[#e9d9cb]">Biji kakao Jembrana untuk kebutuhan individu, usaha, dan perusahaan. Kenali produk dan prosesnya sebelum membeli.</p>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-bold text-white">Navigasi cepat</h2>
        <div class="grid gap-3 text-sm text-[#e9d9cb]">
          <a href="/" class="hover:text-white">Beranda</a>
          <a href="/products" class="hover:text-white">Katalog Produk</a>
          <a href="/traceability" class="hover:text-white">Lacak Pesanan</a>
          <a :href="aboutHref" class="hover:text-white">Tentang Kami</a>
          <a href="/login" class="hover:text-white">Masuk</a>
          <a href="/register" class="hover:text-white">Daftar</a>
        </div>
      </div>
      <div>
        <h2 class="mb-4 text-sm font-bold text-white">Informasi produsen</h2>
        <dl class="grid gap-3 text-sm text-[#e9d9cb]">
          <div><dt class="font-semibold text-white">Wilayah produksi</dt><dd>Jembrana, Bali, Indonesia</dd></div>
          <div><dt class="font-semibold text-white">Alamat unit & kontak admin</dt><dd>Menunggu data resmi produsen.</dd></div>
          <div><dt class="font-semibold text-white">Jam operasional</dt><dd>Menunggu konfirmasi.</dd></div>
        </dl>
      </div>
    </div>
    <div class="border-t border-white/15"><div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 py-5 text-xs text-[#e9d9cb] sm:px-8 lg:px-10"><p>© {{ new Date().getFullYear() }} KAKAO.</p><p>Sistem Informasi Manajemen Produsen Kakao</p></div></div>
  </footer>
</template>
