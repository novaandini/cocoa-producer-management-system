
<script setup>
const timeline = [
  {
    number: '01',
    title: 'Pesanan Dibuat',
    description: 'Pesanan customer telah dibuat dan tercatat di dalam sistem.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '02',
    title: 'Verifikasi Pesanan',
    description: 'Pesanan diverifikasi untuk memastikan data dan kebutuhan produk telah sesuai.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '03',
    title: 'Persiapan Produk',
    description: 'Produk kakao disiapkan berdasarkan jumlah dan jenis produk yang dipesan.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '04',
    title: 'Quality Control',
    description: 'Produk diperiksa untuk memastikan kualitasnya sesuai dengan standar yang ditetapkan.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '05',
    title: 'Pengemasan',
    description: 'Produk dikemas dengan aman sebelum dipersiapkan untuk proses pengiriman.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '06',
    title: 'Pengiriman',
    description: 'Produk sedang dipersiapkan untuk dikirim kepada customer.',
    status: 'DALAM PROSES',
    statusClass: 'process'
  }
]

const informationCards = [
  {
    number: '01',
    title: 'Transparansi',
    description: 'Customer dapat mengetahui tahapan perjalanan produk dari pesanan hingga pengiriman.'
  },
  {
    number: '02',
    title: 'Kontrol Kualitas',
    description: 'Setiap produk melalui proses pemeriksaan untuk menjaga kualitas sebelum dikirim.'
  },
  {
    number: '03',
    title: 'Informasi Proses',
    description: 'Informasi setiap tahapan membantu customer memahami bagaimana produk diproses.'
  }
]
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-[#fffdf9] font-[Arial,Helvetica,sans-serif] text-[#2d2118]">

    <!-- NAVBAR -->
    <header class="sticky top-0 z-50 border-b border-[#eadfd3] bg-[#fffdf9]/95 backdrop-blur-md">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 max-[520px]:px-5">
        <a href="/" class="flex items-center">
          <img
            src="/kakao-home/logo-kakao.png"
            alt="Logo KAKAO"
            class="h-11 w-auto object-contain"
          />
        </a>

        <a
          href="/"
          class="rounded-md px-4 py-2 text-sm font-semibold text-[#68452e] transition hover:bg-[#f3e9df] hover:text-[#3b2416]"
        >
          ← Kembali ke Home
        </a>
      </nav>
    </header>

    <main>

      <!-- HERO -->
      <section class="relative overflow-hidden bg-[#3b2416] px-8 py-28 text-white max-[520px]:px-5 max-[520px]:py-20">
        <div class="absolute -right-20 -top-28 h-96 w-96 rounded-full bg-[#75482c]/30 blur-3xl"></div>
        <div class="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-[#a77950]/15 blur-3xl"></div>

        <div class="relative mx-auto max-w-7xl">
          <div class="max-w-2xl">
            <span class="mb-5 inline-block text-xs font-bold tracking-[0.3em] text-[#d9b894]">
              PRODUCT TRACEABILITY
            </span>

            <h1 class="mb-6 text-5xl leading-tight font-bold tracking-tight max-[520px]:text-4xl">
              Transparansi Perjalanan
              <br />
              <span class="text-[#d9b894]">Produk Kakao.</span>
            </h1>

            <p class="max-w-xl text-base leading-8 text-[#e5d7cb] max-[520px]:text-sm">
              Lihat tahapan perjalanan produk kakao mulai dari
              pesanan dibuat hingga proses pengiriman kepada customer.
            </p>
          </div>
        </div>
      </section>

      <!-- TRACEABILITY -->
      <section class="px-8 py-24 max-[520px]:px-5 max-[520px]:py-16">
        <div class="mx-auto max-w-4xl">

          <div class="mb-16 text-center">
            <span class="mb-3 inline-block text-xs font-bold tracking-[0.25em] text-[#9a704e]">
              TRACEABILITY
            </span>

            <h2 class="mb-4 text-3xl font-bold text-[#3b2416] max-[520px]:text-2xl">
              Perjalanan Produk
            </h2>

            <p class="text-sm leading-7 text-[#827469]">
              Setiap tahap dicatat untuk menjaga transparansi dan kualitas produk.
            </p>

            <p
              class="mx-auto mt-6 max-w-2xl rounded-lg border border-[#ead8bd] bg-[#fbf3e7] px-5 py-4 text-left text-xs leading-6 text-[#87613e]"
              role="note"
            >
              <span class="font-bold">Informasi:</span>
              Tampilan ini merupakan contoh alur produksi dan pengiriman.
              Status di bawah belum menunjukkan kondisi pesanan yang sebenarnya.
            </p>
          </div>

          <!-- TIMELINE -->
          <div class="relative space-y-7">
            <div class="absolute top-8 bottom-8 left-6.75 w-px bg-[#e5d4c3] max-[520px]:left-5.75"></div>

            <div
              v-for="item in timeline"
              :key="item.number"
              class="relative flex gap-6 max-[520px]:gap-4"
            >
              <div class="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#fffdf9] bg-[#75482c] text-sm font-bold text-white shadow-sm max-[520px]:h-12 max-[520px]:w-12">
                {{ item.number }}
              </div>

              <div class="mb-1 min-w-0 flex-1 rounded-xl border border-[#eee3d9] bg-white p-6 shadow-[0_4px_20px_rgba(59,36,22,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#d8b99b] hover:shadow-[0_8px_25px_rgba(59,36,22,0.08)] max-[520px]:p-4">
                <div class="mb-4 flex items-start justify-between gap-3 max-[520px]:flex-col">
                  <div>
                    <span class="mb-2 block text-[10px] font-bold tracking-[0.2em] text-[#a17b5b]">
                      TAHAP {{ item.number }}
                    </span>

                    <h3 class="text-lg font-bold text-[#3b2416] max-[520px]:text-base">
                      {{ item.title }}
                    </h3>
                  </div>

                  <span
                    class="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider"
                    :class="item.statusClass === 'done'
                      ? 'bg-[#e7f3e8] text-[#397447]'
                      : 'bg-[#fff0d8] text-[#a36b20]'"
                  >
                    {{ item.status }}
                  </span>
                </div>

                <p class="text-sm leading-7 text-[#827469]">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- INFORMATION -->
      <section class="bg-[#f7f1e9] px-8 py-24 max-[520px]:px-5 max-[520px]:py-16">
        <div class="mx-auto max-w-7xl">

          <div class="mb-14 text-center">
            <span class="mb-3 inline-block text-xs font-bold tracking-[0.25em] text-[#9a704e]">
              INFORMASI
            </span>

            <h2 class="mb-4 text-3xl font-bold text-[#3b2416] max-[520px]:text-2xl">
              Mengapa Traceability Penting?
            </h2>

            <p class="mx-auto max-w-2xl text-sm leading-7 text-[#827469]">
              Sistem traceability membantu memberikan informasi yang jelas mengenai perjalanan produk.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-6 max-[760px]:grid-cols-1">
            <article
              v-for="card in informationCards"
              :key="card.number"
              class="group rounded-xl border border-[#eadfd3] bg-white p-8 shadow-[0_4px_20px_rgba(59,36,22,0.03)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(59,36,22,0.08)]"
            >
              <span class="mb-7 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f3e9df] text-sm font-bold text-[#75482c] transition group-hover:bg-[#75482c] group-hover:text-white">
                {{ card.number }}
              </span>

              <h3 class="mb-3 text-lg font-bold text-[#3b2416]">
                {{ card.title }}
              </h3>

              <p class="text-sm leading-7 text-[#827469]">
                {{ card.description }}
              </p>
            </article>
          </div>

        </div>
      </section>

      <!-- CTA -->
      <section class="bg-white px-8 py-24 text-center max-[520px]:px-5 max-[520px]:py-16">
        <div class="mx-auto max-w-2xl">
          <span class="mb-4 inline-block text-xs font-bold tracking-[0.25em] text-[#9a704e]">
            PRODUK KAKAO
          </span>

          <h2 class="mb-5 text-3xl font-bold text-[#3b2416] max-[520px]:text-2xl">
            Temukan Produk Kakao
          </h2>

          <p class="mb-9 text-sm leading-7 text-[#827469]">
            Lihat produk kakao yang tersedia dan temukan produk yang sesuai dengan kebutuhan Anda.
          </p>

          <a
            href="/products"
            class="inline-flex items-center justify-center rounded-md bg-[#3b2416] px-8 py-3.5 text-sm font-semibold text-white no-underline transition duration-300 hover:-translate-y-1 hover:bg-[#75482c] hover:shadow-lg"
          >
            Lihat Produk →
          </a>
        </div>
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="bg-[#2d1b12] px-8 pt-12 text-white max-[520px]:px-5">
      <div class="mx-auto flex max-w-7xl flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row md:items-center">

        <div>
          <div class="mb-2 text-2xl font-bold tracking-[0.2em] text-[#d9b894]">
            KAKAO
          </div>

          <p class="text-xs text-[#b6a89e]">
            Sistem Informasi Manajemen Produsen Kakao.
          </p>
        </div>

        <nav class="flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#c8b9ad]" aria-label="Navigasi bawah">
          <a href="/" class="transition hover:text-[#d9b894]">Home</a>
          <a href="/products" class="transition hover:text-[#d9b894]">Products</a>
          <a href="/traceability" aria-current="page" class="font-bold text-[#d9b894]">
            Traceability
          </a>
          <a href="/checkout" class="transition hover:text-[#d9b894]">Checkout</a>
          <a href="/login" class="transition hover:text-[#d9b894]">Login</a>
        </nav>

      </div>

      <div class="mx-auto max-w-7xl py-6 text-center text-[11px] text-[#8f7d70]">
        © 2026 KAKAO. Sistem Informasi Manajemen Produsen Kakao.
      </div>
    </footer>

  </div>
</template>
