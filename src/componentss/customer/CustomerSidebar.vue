
<script setup>
const props = defineProps({
  activeMenu: {
    type: String,
    default: 'dashboard'
  }
})

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '⌂', path: '/customer/dashboard' },
  { key: 'orders', label: 'Pesanan Saya', icon: '▤', path: '/customer/orders' },
  { key: 'transactions', label: 'Riwayat Transaksi', icon: '↻', path: '/customer/transactions' },
  { key: 'profile', label: 'Profil Akun', icon: '♙', path: '/customer/profile' }
]
</script>

<template>
  <aside class="flex min-h-screen w-full flex-col border-r border-[#eadfd3] bg-[#fffdf9] md:w-64 md:shrink-0">

    <!-- LOGO -->
    <div class="border-b border-[#eadfd3] px-7 py-7">
      <a href="/" class="inline-block">
        <h2 class="font-[Georgia,serif] text-2xl font-bold tracking-wide text-[#3b2416]">
          KAKAO
        </h2>
        <p class="mt-1 text-[9px] font-semibold tracking-[2px] text-[#a16b43]">
          CUSTOMER PANEL
        </p>
      </a>
    </div>

    <!-- NAVIGASI -->
    <div class="flex-1 px-4 py-7">
      <p class="mb-5 px-3 text-[10px] font-bold tracking-[2px] text-[#a99a8d]">
        MENU UTAMA
      </p>

      <nav class="space-y-2">
        <a
          v-for="item in menuItems"
          :key="item.key"
          :href="item.path"
          :class="[
            'flex items-center gap-3 rounded-lg px-4 py-3.5 text-[13px] font-semibold transition',
            props.activeMenu === item.key
              ? 'bg-[#3b2416] text-white shadow-sm'
              : 'text-[#6e5c50] hover:bg-[#f4ede4] hover:text-[#795238]'
          ]"
        >
          <span class="flex h-6 w-6 items-center justify-center text-lg">
            {{ item.icon }}
          </span>

          <span>{{ item.label }}</span>

          <span
            v-if="props.activeMenu === item.key"
            class="ml-auto h-1.5 w-1.5 rounded-full bg-[#d6a77e]"
          ></span>
        </a>
      </nav>
    </div>

    <!-- BANTUAN -->
    <div class="border-t border-[#eadfd3] p-5">
      <div class="rounded-lg bg-[#f4ede4] p-4">
        <p class="font-[Georgia,serif] text-sm font-semibold text-[#3b2416]">
          Butuh Bantuan?
        </p>
        <p class="mt-2 text-[11px] leading-5 text-[#82766c]">
          Hubungi tim KAKAO jika mengalami kendala terkait pesanan.
        </p>
      </div>

      <a
        href="/"
        class="mt-5 block text-xs font-semibold text-[#795238] transition hover:text-[#a16b43]"
      >
        ← Kembali ke Beranda
      </a>
    </div>

  </aside>
</template>
