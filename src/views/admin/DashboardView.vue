
<script setup>
import { ref } from 'vue'

const stats = [
  { label: 'Total Produk', value: '12' },
  { label: 'Total Pesanan', value: '28' },
  { label: 'Customer', value: '18' },
  { label: 'Total Penjualan', value: '8,5 Juta' }
]

const latestOrders = [
  {
    customer: 'Customer 01',
    product: 'Cocoa Bean A',
    status: 'Diproses',
    statusClass: 'process'
  },
  {
    customer: 'Customer 02',
    product: 'Cocoa Bean B',
    status: 'Selesai',
    statusClass: 'done'
  },
  {
    customer: 'Customer 03',
    product: 'Cocoa Bean C',
    status: 'Diproses',
    statusClass: 'process'
  }
]

const notice = ref('')

function belumTersedia(namaHalaman) {
  notice.value = `Halaman ${namaHalaman} belum dipindahkan ke Vue.js.`
}
</script>

<template>
  <div class="min-h-screen bg-[#fffdf9] font-sans text-[#332116]">

    <!-- DASHBOARD LAYOUT -->
    <div class="flex min-h-screen flex-col md:flex-row">

      <!-- SIDEBAR -->
      <aside class="w-full shrink-0 bg-[#332116] px-6 py-8 text-white md:w-64">
        <div class="mb-10">
          <a
            href="/"
            class="font-serif text-3xl font-bold tracking-wide text-[#d5a274]"
          >
            KAKAO
          </a>

          <p class="mt-2 text-xs leading-5 tracking-wider text-[#d6c3b1]">
            SISTEM INFORMASI<br />
            PRODUSEN KAKAO
          </p>
        </div>

        <nav
          class="flex flex-col gap-2"
          aria-label="Navigasi Admin"
        >
          <a
            href="/admin/dashboard"
            class="rounded-md bg-[#a16038] px-4 py-3 text-sm font-medium text-white"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="/admin/customers"
            class="rounded-md px-4 py-3 text-sm text-[#e8d8c9] transition hover:bg-[#493222] hover:text-white"
          >
            Pelanggan
          </a>

          <a
            href="/admin/products/form"
            class="rounded-md px-4 py-3 text-sm text-[#e8d8c9] transition hover:bg-[#493222] hover:text-white"
          >
            Produk
          </a>

          <a
            href="/admin/orders"
            class="rounded-md px-4 py-3 text-sm text-[#e8d8c9] transition hover:bg-[#493222] hover:text-white"
          >
            Pesanan
          </a>

          <a
            href="/admin/payments"
            class="rounded-md px-4 py-3 text-sm text-[#e8d8c9] transition hover:bg-[#493222] hover:text-white"
          >
            Pembayaran
          </a>

          <a
            href="/admin/shipping"
            class="rounded-md px-4 py-3 text-sm text-[#e8d8c9] transition hover:bg-[#493222] hover:text-white"
          >
            Pengiriman
          </a>
        </nav>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="min-w-0 flex-1 p-5 sm:p-8">

        <!-- TOPBAR -->
        <header class="mb-8 flex flex-col justify-between gap-4 border-b border-[#eadfd5] pb-6 sm:flex-row sm:items-center">
          <div>
            <p class="mb-1 text-xs font-semibold tracking-[0.2em] text-[#a16038]">
              AREA ADMIN
            </p>

            <h1 class="font-serif text-3xl font-bold text-[#332116]">
              Dashboard
            </h1>
          </div>

          <div class="flex flex-col sm:items-end">
            <strong class="text-sm text-[#332116]">
              Admin KAKAO
            </strong>

            <span class="mt-1 text-xs text-[#8b7766]">
              Administrator
            </span>
          </div>
        </header>

        <!-- NOTICE -->
        <div
          v-if="notice"
          class="mb-6 flex items-center justify-between gap-4 rounded-md border border-[#ead0b5] bg-[#fff4e8] px-4 py-3 text-sm text-[#80502e]"
          role="status"
        >
          <span>{{ notice }}</span>

          <button
            type="button"
            aria-label="Tutup pemberitahuan"
            class="text-xl leading-none hover:text-[#332116]"
            @click="notice = ''"
          >
            ×
          </button>
        </div>

        <!-- WELCOME -->
        <section class="mb-8 rounded-lg bg-[#f3e7d9] p-6 sm:p-8">
          <p class="mb-3 text-xs font-semibold tracking-[0.2em] text-[#a16038]">
            DASHBOARD ADMIN
          </p>

          <h2 class="mb-3 font-serif text-2xl font-bold leading-snug text-[#332116] sm:text-3xl">
            Kelola data kakao
            <span class="text-[#a16038]">
              lebih terstruktur.
            </span>
          </h2>

          <p class="max-w-2xl text-sm leading-6 text-[#705b49]">
            Pantau produk, pesanan, dan data customer
            melalui sistem informasi manajemen produsen kakao.
          </p>
        </section>

        <!-- STATISTICS -->
        <section
          class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Statistik Dashboard"
        >
          <div
            v-for="item in stats"
            :key="item.label"
            class="rounded-lg border border-[#eadfd5] bg-white p-5 shadow-sm"
          >
            <p class="mb-3 text-sm text-[#8b7766]">
              {{ item.label }}
            </p>

            <h3 class="font-serif text-2xl font-bold text-[#332116]">
              {{ item.value }}
            </h3>
          </div>
        </section>

        <!-- DASHBOARD CONTENT -->
        <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">

          <!-- LATEST ORDERS -->
          <div class="rounded-lg border border-[#eadfd5] bg-white p-5 sm:p-6 xl:col-span-2">
            <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p class="mb-2 text-xs font-semibold tracking-[0.2em] text-[#a16038]">
                  PESANAN
                </p>

                <h2 class="font-serif text-xl font-bold text-[#332116]">
                  Pesanan Terbaru
                </h2>
              </div>

              <a
                href="/admin/orders"
                class="text-sm font-medium text-[#a16038] transition hover:text-[#332116]"
                @click.prevent="belumTersedia('Pesanan')"
              >
                Lihat Semua →
              </a>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full min-w-[500px] text-left text-sm">
                <thead>
                  <tr class="border-b border-[#eadfd5] text-xs text-[#8b7766]">
                    <th class="px-3 py-3 font-medium">Customer</th>
                    <th class="px-3 py-3 font-medium">Produk</th>
                    <th class="px-3 py-3 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="order in latestOrders"
                    :key="order.customer"
                    class="border-b border-[#f1e9e2] last:border-0"
                  >
                    <td class="px-3 py-4 text-[#493222]">
                      {{ order.customer }}
                    </td>

                    <td class="px-3 py-4 text-[#705b49]">
                      {{ order.product }}
                    </td>

                    <td class="px-3 py-4">
                      <span
                        class="inline-block rounded-full px-3 py-1 text-xs font-medium"
                        :class="
                          order.statusClass === 'process'
                            ? 'bg-[#fff0d9] text-[#9a6428]'
                            : 'bg-[#e5f2e5] text-[#477747]'
                        "
                      >
                        {{ order.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- QUICK MENU -->
          <div class="rounded-lg border border-[#eadfd5] bg-white p-5 sm:p-6">
            <p class="mb-2 text-xs font-semibold tracking-[0.2em] text-[#a16038]">
              MENU
            </p>

            <h2 class="mb-6 font-serif text-xl font-bold text-[#332116]">
              Akses Cepat
            </h2>

            <div class="flex flex-col">
              <a
                href="/admin/products/form"
                class="flex items-center justify-between border-b border-[#eadfd5] py-4 text-sm text-[#493222] transition hover:text-[#a16038]"
              >
                <span>
                  <span class="mr-3 text-xs text-[#b49a82]">01</span>
                  Tambah Produk
                </span>
                <span>→</span>
              </a>

              <a
                href="/admin/products"
                class="flex items-center justify-between border-b border-[#eadfd5] py-4 text-sm text-[#493222] transition hover:text-[#a16038]"
              >
                <span>
                  <span class="mr-3 text-xs text-[#b49a82]">02</span>
                  Lihat Produk
                </span>
                <span>→</span>
              </a>

              <a
                href="/admin/orders"
                class="flex items-center justify-between py-4 text-sm text-[#493222] transition hover:text-[#a16038]"
                @click.prevent="belumTersedia('Pesanan')"
              >
                <span>
                  <span class="mr-3 text-xs text-[#b49a82]">03</span>
                  Lihat Pesanan
                </span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        <!-- DEMO NOTE -->
        <p class="mt-6 text-xs leading-5 text-[#9b8877]">
          * Statistik dan pesanan di atas masih menggunakan data contoh
          dari halaman HTML lama.
        </p>
      </main>
    </div>

    <!-- FOOTER -->
    <footer class="bg-[#24170f] px-5 py-8 text-[#e8d8c9] sm:px-8">

      <div class="mx-auto flex max-w-7xl flex-col gap-8 border-b border-[#493222] pb-8 lg:flex-row lg:justify-between">

        <!-- FOOTER BRAND -->
        <div class="max-w-sm">
          <a
            href="/"
            class="font-serif text-2xl font-bold tracking-wide text-[#d5a274]"
          >
            KAKAO
          </a>

          <p class="mt-4 text-sm leading-6 text-[#c7b4a2]">
            Sistem informasi untuk membantu pengelolaan
            penjualan kakao secara terstruktur,
            transparan, dan mudah dipantau.
          </p>
        </div>

        <!-- FOOTER LINKS -->
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">

          <div class="flex flex-col gap-3">
            <h4 class="mb-1 text-sm font-semibold text-white">
              Menu
            </h4>

            <a
              href="/admin/dashboard"
              class="text-sm text-[#c7b4a2] transition hover:text-white"
            >
              Dashboard
            </a>

            <a
              href="/admin/products"
              class="text-sm text-[#c7b4a2] transition hover:text-white"
            >
              Produk
            </a>
          </div>

          <div class="flex flex-col gap-3">
            <h4 class="mb-1 text-sm font-semibold text-white">
              Admin
            </h4>

            <a
              href="/admin/products/form"
              class="text-sm text-[#c7b4a2] transition hover:text-white"
            >
              Tambah Produk
            </a>

            <a
              href="/admin/orders"
              class="text-sm text-[#c7b4a2] transition hover:text-white"
              @click.prevent="belumTersedia('Pesanan')"
            >
              Pesanan
            </a>
          </div>

          <div class="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <h4 class="mb-1 text-sm font-semibold text-white">
              Informasi
            </h4>

            <p class="text-sm text-[#c7b4a2]">
              Indonesia
            </p>

            <p class="text-sm text-[#c7b4a2]">
              info@kakao.com
            </p>
          </div>
        </div>
      </div>

      <!-- FOOTER BOTTOM -->
      <div class="mx-auto flex max-w-7xl flex-col gap-2 pt-6 text-xs text-[#a99583] sm:flex-row sm:justify-between">
        <p>© 2026 KAKAO</p>

        <p>
          Sistem Informasi Manajemen Produsen Kakao
        </p>
      </div>
    </footer>
  </div>
</template>
