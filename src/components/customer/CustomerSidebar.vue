<script setup>
defineProps({
  activeMenu: {
    type: String,
    default: 'dashboard'
  }
})

const menus = [
  { label: 'Dashboard', path: '/customer/dashboard', key: 'dashboard', icon: '▦' },
  { label: 'Pesanan Saya', path: '/customer/orders', key: 'orders', icon: '▤' },
  { label: 'Riwayat Transaksi', path: '/customer/transactions', key: 'transactions', icon: '↻' },
  { label: 'Profil Akun', path: '/customer/profile', key: 'profile', icon: '♙' }
]
</script>

<template>
  <aside class="flex min-h-screen w-full flex-col border-r border-[#eadfd3] bg-white p-5 md:w-64">
    <a href="/" class="mb-10 text-2xl font-bold tracking-wide text-[#3b2416]">
      KAKAO<span class="text-[#a16b43]">.</span>
      <p class="mt-1 text-xs font-normal tracking-normal text-[#82766c]">Customer Center</p>
    </a>

    <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-[#a3988d]">Menu Utama</p>

    <nav class="space-y-2">
      <a
        v-for="menu in menus"
        :key="menu.key"
        :href="menu.path"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition"
        :class="activeMenu === menu.key
          ? 'bg-[#795238] text-white'
          : 'text-[#65564b] hover:bg-[#f8f2ec]'"
      >
        <span>{{ menu.icon }}</span>
        {{ menu.label }}
      </a>
    </nav>

    <div class="mt-auto border-t border-[#eadfd3] pt-5">
      <a href="/" class="text-sm text-[#795238] hover:underline">← Kembali ke Beranda</a>
    </div>
  </aside>
</template>
