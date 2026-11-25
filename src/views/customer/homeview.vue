<template>
  <div class="min-h-screen overflow-x-clip bg-[#fffdf9] font-[Arial,Helvetica,sans-serif] text-[#2d2118]">

    <!-- HEADER / NAVBAR -->
    <header class="sticky top-0 z-1000 w-full border-b border-[#eadfd3] bg-[rgba(255,253,249,0.97)]">
      <nav class="flex h-20 items-center justify-between bg-[#fffdf9] px-[max(7%,45px)] max-[1100px]:px-[4%] max-[800px]:h-auto max-[800px]:min-h-19 max-[800px]:flex-wrap max-[800px]:px-6 max-[520px]:px-4.5">

        <a href="#home" class="flex items-center justify-center no-underline">
          <img
            src="/kakao-home/logo-kakao.png"
            alt="Logo KAKAO"
            class="block h-17.5 w-22.5 object-contain max-[800px]:h-16.25 max-[800px]:w-20"
          >
        </a>

        <!-- MENU NAVIGASI -->
        <div class="flex items-center gap-20 max-[1100px]:gap-8 max-[800px]:order-3 max-[800px]:w-full max-[800px]:justify-between max-[800px]:gap-3 max-[800px]:overflow-x-auto max-[520px]:gap-4">

          <a
            href="#home"
            class="relative whitespace-nowrap py-7.5 text-[13px] font-semibold text-[#8c5432] transition after:absolute after:bottom-5.25 after:left-0 after:h-0.5 after:w-full after:bg-[#8c5432] after:transition-all max-[800px]:py-3.25 max-[800px]:text-xs max-[800px]:after:bottom-1.5"
          >
            Beranda
          </a>

          <a
            href="/products/"
            class="relative whitespace-nowrap py-7.5 text-[13px] font-semibold text-[#59483c] transition hover:text-[#8c5432] after:absolute after:bottom-5.25 after:left-0 after:h-0.5 after:w-0 after:bg-[#8c5432] after:transition-all hover:after:w-full max-[800px]:py-3.25 max-[800px]:text-xs max-[800px]:after:bottom-1.5"
          >
            Produk
          </a>

          <a
            href="/traceability"
            class="relative whitespace-nowrap py-7.5 text-[13px] font-semibold text-[#59483c] transition hover:text-[#8c5432] after:absolute after:bottom-5.25 after:left-0 after:h-0.5 after:w-0 after:bg-[#8c5432] after:transition-all hover:after:w-full max-[800px]:py-3.25 max-[800px]:text-xs max-[800px]:after:bottom-1.5"
          >
            Telusuri
          </a>

          <a
            href="#about"
            class="relative whitespace-nowrap py-7.5 text-[13px] font-semibold text-[#59483c] transition hover:text-[#8c5432] after:absolute after:bottom-5.25 after:left-0 after:h-0.5 after:w-0 after:bg-[#8c5432] after:transition-all hover:after:w-full max-[800px]:py-3.25 max-[800px]:text-xs max-[800px]:after:bottom-1.5"
          >
            Tentang
          </a>
        </div>

        <div class="ml-auto flex items-center gap-4.5">
       <a
          href="/login"
          class="rounded-md bg-[#3b2416] px-5.5 py-2.75 text-xs font-semibold text-white no-underline transition hover:-translate-y-px hover:bg-[#75482c] max-[520px]:px-4 max-[520px]:py-2.5"
        >
          Daftar
      </a>
        </div>

      </nav>
    </header>

    <main>

      <!-- HERO -->
      <section
        id="home"
        class="mx-auto flex min-h-[calc(100vh-78px)] max-w-325 items-center justify-between gap-20 px-13.75 py-15 max-[1100px]:gap-11.25 max-[1100px]:px-[4%] max-[800px]:min-h-0 max-[800px]:flex-col max-[800px]:items-stretch max-[800px]:gap-11.25 max-[800px]:px-6 max-[800px]:py-16.25 max-[520px]:px-4.5 max-[520px]:py-11.25"
      >

        <div class="max-w-142.5 flex-1 max-[800px]:max-w-full">

          <p class="mb-4.5 text-[10px] font-bold tracking-[3px] text-[#a15f36]">
            PLATFORM PENJUALAN DAN PEMESANAN KAKAO
          </p>

          <h1 class="font-serif text-[62px] font-normal leading-[1.08] text-[#302117] max-[1100px]:text-[51px] max-[800px]:text-[clamp(36px,7vw,56px)] max-[520px]:text-[39px]">
            Kakao Berkualitas
            <span class="block italic text-[#8a5332]">
              Proses Transparan
            </span>
          </h1>

          <p class="mt-6.25 max-w-130 text-sm leading-[1.9] text-[#6e5c50]">
            Temukan berbagai pilihan biji kakao berkualitas sesuai kebutuhan Anda. Melalui platform KAKAO, anda dapat melihat informasi produk, melakukan pemesanan dan pembayaran secara online, serta memantau setiap tahapan pesanan hingga proses pengiriman.
          </p>

          <div class="mt-8 flex items-center gap-7 max-[520px]:flex-wrap max-[520px]:gap-4.5">

            <a
              href="#products"
              class="inline-block bg-[#3b2416] px-6 py-3.5 text-[11px] font-bold tracking-[0.5px] text-white transition hover:-translate-y-0.5 hover:bg-[#75482c]"
            >
              Lihat Produk
            </a>

            <a
              href="/traceability"
              class="text-xs font-bold text-[#3b2416] transition hover:text-[#9b5d36]"
            >
              Lihat Proses →
            </a>

          </div>
        </div>

        <div class="h-125 flex-[0_0_44%] overflow-hidden rounded-t-[180px] rounded-b-lg shadow-[0_15px_30px_rgba(0,0,0,0.30)] max-[1100px]:h-112.5 max-[800px]:h-105 max-[800px]:w-full max-[800px]:flex-none max-[520px]:h-77.5">
          <img
            src="/kakao-home/hero-kakao.jpg"
            alt="Buah dan biji kakao"
            class="h-full w-full object-cover object-center transition duration-500 hover:scale-[1.03]"
          >
        </div>

      </section>

      <!-- ABOUT -->
      <section
        id="about"
        class="bg-[#f4ede4] px-[max(7%,45px)] py-25 max-[1100px]:px-[4%] max-[800px]:px-6 max-[800px]:py-18.75 max-[520px]:px-4.5 max-[520px]:py-15"
      >

        <div class="mx-auto grid max-w-300 grid-cols-[1.2fr_1fr] items-center gap-22.5 max-[1100px]:gap-12.5 max-[800px]:grid-cols-1 max-[800px]:gap-7.5">

          <div>
            <p class="mb-4.5 text-[10px] font-bold tracking-[3px] text-[#a15f36]">
              TENTANG SISTEM
            </p>

            <h2 class="font-serif text-[45px] font-normal leading-[1.2] text-[#302117] max-[800px]:text-[38px] max-[520px]:text-[32px]">
              Pemesanan kakao yang
              <span class="italic text-[#9a5d37]">
                Mudah dan Transparan
              </span>
            </h2>
          </div>

          <div class="border-l border-[#d7c5b5] pl-8.75 max-[800px]:pl-5">
            <p class="mb-4.25 text-justify text-sm leading-[1.9] text-[#6c5a4d] last:mb-0">
              KAKAO merupakan platform penjualan dan pemesanan produk kakao berbasis web yang dirancang untuk memudahkan proses transaksi secara lebih terstruktur, efisien, dan transparan.
            </p>

            <p class="mb-4.25 text-justify text-sm leading-[1.9] text-[#6c5a4d] last:mb-0">
              Melalui platform ini, pelanggan dapat melihat informasi produk, melakukan pemesanan, memilih metode pembayaran, serta memantau perkembangan pesanan hingga tahap pengiriman. Sementara itu, admin dapat mengelola data produk, stok, pesanan, pembayaran, dan proses pengiriman agar kegiatan penjualan berjalan lebih terorganisir.
            </p>
          </div>

        </div>
      </section>

      <!-- PRODUCTS -->
      <section
        id="products"
        class="bg-[#fffdf9] px-[max(7%,45px)] pt-25 pb-8.75 max-[1100px]:px-[4%] max-[800px]:px-6 max-[800px]:py-18.75 max-[520px]:px-4.5 max-[520px]:py-15"
      >

        <div class="mx-auto mb-11.25 flex max-w-300 items-end justify-between max-[520px]:flex-col max-[520px]:items-start max-[520px]:gap-4.5">

          <div>
            <p class="mb-4.5 text-[10px] font-bold tracking-[3px] text-[#a15f36]">
              PRODUK KAKAO
            </p>

            <h2 class="font-serif text-[42px] font-normal text-[#302117] max-[800px]:text-[36px] max-[520px]:text-[32px]">
              Pilihan Produk Kami
            </h2>
          </div>

          <a
            href="/products"
            class="border-b border-[#3b2416] pb-1.25 text-[11px] font-bold text-[#3b2416] transition hover:border-[#9b5d36] hover:text-[#9b5d36]"
          >
            Lihat Semua Produk →
          </a>

        </div>

        <div class="mx-auto grid max-w-300 grid-cols-3 gap-6.25 max-[800px]:grid-cols-2 max-[520px]:grid-cols-1">

          <!-- PRODUCT A -->
          <article class="group overflow-hidden rounded-[10px] border border-[#eadfd5] bg-white transition duration-300 hover:-translate-y-1.25 hover:shadow-[0_16px_35px_rgba(65,40,24,0.10)]">

            <div class="relative h-55 overflow-hidden">
              <img
                src="/kakao-home/cocoa-bean-a.jpg"
                alt="Cocoa Bean A"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
              >

              <span class="absolute top-4 left-4 bg-[#3b2416] px-2.5 py-1.75 text-[8px] font-bold tracking-[1px] text-white">
                GRADE A
              </span>
            </div>

            <div class="px-6 py-5">
              <p class="mb-2.25 text-[9px] font-bold tracking-[2px] text-[#a16038]">
                FERMENTASI
              </p>

              <h3 class="mb-2.5 font-serif text-xl text-[#38271c]">
                Cocoa Bean A
              </h3>

              <p class="min-h-8.75 text-xs leading-[1.7] text-[#806e62]">
                Biji kakao fermentasi dengan kualitas Grade A
              </p>

              <div class="mt-4.5 flex justify-between border-y border-[#eee4da] py-3 text-[11px] text-[#6e5c50]">
                <span class="font-bold text-[#8a5332]">Grade A</span>
                <span>Stok: 500 kg</span>
              </div>

              <div class="mt-4.5 flex items-center justify-between gap-2.5">
                <span class="text-[11px] font-bold text-[#66764a]">Tersedia</span>
                <a
                  href="/detail-product?product=a"
                  class="text-[10px] font-bold text-[#8b5433] transition hover:text-[#3b2416]"
                >
                  Lihat Detail →
                </a>
              </div>
            </div>
          </article>

          <!-- PRODUCT B -->
          <article class="group overflow-hidden rounded-[10px] border border-[#eadfd5] bg-white transition duration-300 hover:-translate-y-1.25 hover:shadow-[0_16px_35px_rgba(65,40,24,0.10)]">

            <div class="relative h-55 overflow-hidden">
              <img
                src="/kakao-home/cocoa-bean-b.jpg"
                alt="Cocoa Bean B"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
              >

              <span class="absolute top-4 left-4 bg-[#3b2416] px-2.5 py-1.75 text-[8px] font-bold tracking-[1px] text-white">
                GRADE B
              </span>
            </div>

            <div class="px-6 py-5">
              <p class="mb-2.25 text-[9px] font-bold tracking-[2px] text-[#a16038]">
                FERMENTASI
              </p>

              <h3 class="mb-2.5 font-serif text-xl text-[#38271c]">
                Cocoa Bean B
              </h3>

              <p class="min-h-8.75 text-xs leading-[1.7] text-[#806e62]">
                Biji kakao fermentasi dengan kualitas Grade B
              </p>

              <div class="mt-4.5 flex justify-between border-y border-[#eee4da] py-3 text-[11px] text-[#6e5c50]">
                <span class="font-bold text-[#8a5332]">Grade B</span>
                <span>Stok: 800 kg</span>
              </div>

              <div class="mt-4.5 flex items-center justify-between gap-2.5">
                <span class="text-[11px] font-bold text-[#66764a]">Tersedia</span>
                <a
                  href="/detail-product?product=b"
                  class="text-[10px] font-bold text-[#8b5433] transition hover:text-[#3b2416]"
                >
                  Lihat Detail →
                </a>
              </div>
            </div>
          </article>

          <!-- PRODUCT C -->
          <article class="group overflow-hidden rounded-[10px] border border-[#eadfd5] bg-white transition duration-300 hover:-translate-y-1.25 hover:shadow-[0_16px_35px_rgba(65,40,24,0.10)]">

            <div class="relative h-55 overflow-hidden">
              <img
                src="/kakao-home/cocoa-bean-c.jpg"
                alt="Cocoa Bean C"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
              >

              <span class="absolute top-4 left-4 bg-[#3b2416] px-2.5 py-1.75 text-[8px] font-bold tracking-[1px] text-white">
                GRADE C
              </span>
            </div>

            <div class="px-6 py-5">
              <p class="mb-2.25 text-[9px] font-bold tracking-[2px] text-[#a16038]">
                NON-FERMENTASI
              </p>

              <h3 class="mb-2.5 font-serif text-xl text-[#38271c]">
                Cocoa Bean C
              </h3>

              <p class="min-h-8.75 text-xs leading-[1.7] text-[#806e62]">
                Biji kakao non-fermentasi dengan kualitas Grade C
              </p>

              <div class="mt-4.5 flex justify-between border-y border-[#eee4da] py-3 text-[11px] text-[#6e5c50]">
                <span class="font-bold text-[#8a5332]">Grade C</span>
                <span>Stok: 300 kg</span>
              </div>

              <div class="mt-4.5 flex items-center justify-between gap-2.5">
                <span class="text-[11px] font-bold text-[#66764a]">Tersedia</span>
                <a
                  href="/detail-product?product=c"
                  class="text-[10px] font-bold text-[#8b5433] transition hover:text-[#3b2416]"
                >
                  Lihat Detail →
                </a>
              </div>
            </div>
          </article>

        </div>
      </section>

      <!-- TRACEABILITY / PROSES PEMESANAN -->
      <section
        id="process"
        class="bg-[#332116] px-[max(7%,45px)] py-26.25 text-white max-[1100px]:px-[4%] max-[800px]:px-6 max-[800px]:py-18.75 max-[520px]:px-4.5 max-[520px]:py-15"
      >

        <div class="mx-auto max-w-175 text-center">

          <p class="mb-4.5 text-[10px] font-bold tracking-[3px] text-[#d6a77e]">
            PROSES PEMESANAN
          </p>

          <h2 class="font-serif text-[44px] font-normal leading-[1.2] max-[520px]:text-[32px]">
            Pantau Proses
            <span class="italic text-[#d5a274]">
              Pesanan Kakao.
            </span>
          </h2>

          <p class="mx-auto mt-5.5 max-w-140 text-[13px] leading-[1.8] text-[#c5b6ab]">
            Setiap tahapan pesanan dicatat sehingga customer dapat mengetahui perkembangan pesanannya dengan jelas.
          </p>

        </div>

        <div class="mx-auto mt-16.25 flex max-w-300 items-start justify-center max-[800px]:flex-wrap max-[800px]:gap-x-3 max-[800px]:gap-y-7.5">

          <!-- 01 -->
          <div class="flex-1 text-center max-[800px]:flex-[0_0_calc(33.33%-14px)] max-[520px]:flex-[0_0_calc(50%-10px)]">
            <span class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#9c765a] font-serif text-xs text-[#ddb086] transition hover:border-[#d5a274] hover:bg-[#d5a274] hover:text-[#332116]">
              01
            </span>
            <strong class="mt-4.25 block font-serif text-sm">Pemesanan</strong>
            <p class="mx-auto mt-2 max-w-32.5 text-[10px] leading-[1.6] text-[#aa9a8f]">
              Pelanggan melakukan pemesanan produk.
            </p>
          </div>

          <div class="mt-5.5 h-px w-7.5 bg-[#71543f] max-[800px]:hidden"></div>

          <!-- 02 -->
          <div class="flex-1 text-center max-[800px]:flex-[0_0_calc(33.33%-14px)] max-[520px]:flex-[0_0_calc(50%-10px)]">
            <span class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#9c765a] font-serif text-xs text-[#ddb086] transition hover:border-[#d5a274] hover:bg-[#d5a274] hover:text-[#332116]">
              02
            </span>
            <strong class="mt-4.25 block font-serif text-sm">Verifikasi</strong>
            <p class="mx-auto mt-2 max-w-32.5 text-[10px] leading-[1.6] text-[#aa9a8f]">
              Pesanan dan pembayaran diverifikasi.
            </p>
          </div>

          <div class="mt-5.5 h-px w-7.5 bg-[#71543f] max-[800px]:hidden"></div>

          <!-- 03 -->
          <div class="flex-1 text-center max-[800px]:flex-[0_0_calc(33.33%-14px)] max-[520px]:flex-[0_0_calc(50%-10px)]">
            <span class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#9c765a] font-serif text-xs text-[#ddb086] transition hover:border-[#d5a274] hover:bg-[#d5a274] hover:text-[#332116]">
              03
            </span>
            <strong class="mt-4.25 block font-serif text-sm">Persiapan</strong>
            <p class="mx-auto mt-2 max-w-32.5 text-[10px] leading-[1.6] text-[#aa9a8f]">
              Produk dipersiapkan sesuai pesanan.
            </p>
          </div>

          <div class="mt-5.5 h-px w-7.5 bg-[#71543f] max-[800px]:hidden"></div>

          <!-- 04 -->
          <div class="flex-1 text-center max-[800px]:flex-[0_0_calc(33.33%-14px)] max-[520px]:flex-[0_0_calc(50%-10px)]">
            <span class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#9c765a] font-serif text-xs text-[#ddb086] transition hover:border-[#d5a274] hover:bg-[#d5a274] hover:text-[#332116]">
              04
            </span>
            <strong class="mt-4.25 block font-serif text-sm">Quality Control</strong>
            <p class="mx-auto mt-2 max-w-32.5 text-[10px] leading-[1.6] text-[#aa9a8f]">
              Kualitas produk diperiksa sebelum dikemas.
            </p>
          </div>

          <div class="mt-5.5 h-px w-7.5 bg-[#71543f] max-[800px]:hidden"></div>

          <!-- 05 -->
          <div class="flex-1 text-center max-[800px]:flex-[0_0_calc(33.33%-14px)] max-[520px]:flex-[0_0_calc(50%-10px)]">
            <span class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#9c765a] font-serif text-xs text-[#ddb086] transition hover:border-[#d5a274] hover:bg-[#d5a274] hover:text-[#332116]">
              05
            </span>
            <strong class="mt-4.25 block font-serif text-sm">Pengemasan</strong>
            <p class="mx-auto mt-2 max-w-32.5 text-[10px] leading-[1.6] text-[#aa9a8f]">
              Produk dikemas dengan aman.
            </p>
          </div>

          <div class="mt-5.5 h-px w-7.5 bg-[#71543f] max-[800px]:hidden"></div>

          <!-- 06 -->
          <div class="flex-1 text-center max-[800px]:flex-[0_0_calc(33.33%-14px)] max-[520px]:flex-[0_0_calc(50%-10px)]">
            <span class="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#9c765a] font-serif text-xs text-[#ddb086] transition hover:border-[#d5a274] hover:bg-[#d5a274] hover:text-[#332116]">
              06
            </span>
            <strong class="mt-4.25 block font-serif text-sm">Pengiriman</strong>
            <p class="mx-auto mt-2 max-w-32.5 text-[10px] leading-[1.6] text-[#aa9a8f]">
              Pesanan dikirim kepada pelanggan.
            </p>
          </div>

        </div>
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="mt-21.25 bg-[#24170f] px-[max(7%,45px)] pt-16.25 pb-6.25 text-white max-[1100px]:px-[4%] max-[800px]:mt-12.5 max-[800px]:px-6 max-[800px]:pt-13.75 max-[520px]:px-4.5 max-[520px]:pt-12.5 max-[520px]:pb-6">

      <div class="mx-auto flex max-w-300 justify-between gap-20 max-[800px]:flex-col max-[800px]:gap-8.75">

        <!-- FOOTER BRAND -->
        <div class="max-w-85">
          <a
            href="#home"
            class="font-serif text-[22px] font-bold text-white no-underline"
          >
            KAKAO
          </a>

          <p class="mt-4.5 text-xs leading-[1.8] text-[#a99b91]">
            Platform penjualan dan pemesanan produk kakao yang memudahkan pelanggan dalam memilih produk, melakukan transaksi, dan memantau proses pesanan secara transparan.
          </p>
        </div>

        <!-- FOOTER LINKS -->
        <div class="flex gap-18.75 max-[800px]:flex-wrap max-[800px]:justify-between max-[800px]:gap-7.5 max-[520px]:gap-6.5">

          <div class="flex flex-col gap-2.75">
            <h4 class="mb-1.75 text-[10px] tracking-[2px] text-[#d6a67c] uppercase">
              Menu
            </h4>

            <a class="text-[11px] text-[#b6a89e] transition hover:text-white" href="#home">
              Beranda
            </a>

            <a class="text-[11px] text-[#b6a89e] transition hover:text-white" href="#products">
              Produk
            </a>

            <a class="text-[11px] text-[#b6a89e] transition hover:text-white" href="#about">
              Tentang
            </a>
          </div>

          <div class="flex flex-col gap-2.75">
            <h4 class="mb-1.75 text-[10px] tracking-[2px] text-[#d6a67c] uppercase">
              Informasi
            </h4>

            <a class="text-[11px] text-[#b6a89e] transition hover:text-white" href="/traceability">
              Telusuri
            </a>

          <a class="text-[11px] text-[#b6a89e] transition hover:text-white" href="/login">
              Daftar
            </a>
          </div>

          <div class="flex flex-col gap-2.75">
            <h4 class="mb-1.75 text-[10px] tracking-[2px] text-[#d6a67c] uppercase">
              Kontak
            </h4>

            <p class="text-[11px] text-[#b6a89e]">
              info@kakao.com
            </p>

            <p class="text-[11px] text-[#b6a89e]">
              Indonesia
            </p>
          </div>

        </div>
      </div>

      <!-- FOOTER BOTTOM -->
      <div class="mx-auto mt-12.5 flex max-w-300 justify-between border-t border-[#49362a] pt-5 text-[9px] tracking-[1px] text-[#77695f] max-[520px]:flex-col max-[520px]:gap-3">

        <p>© 2026 KAKAO</p>

        <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>

      </div>
    </footer>

  </div>
</template>