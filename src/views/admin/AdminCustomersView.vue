
<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const STORAGE_KEY = 'kakao_demo_accounts'

const seedAccounts = [
  { id: 'A001', name: 'Budi Santoso', username: 'budi.santoso', email: 'budi.santoso@example.com', phone_number: '081234560001', status: 'active' },
  { id: 'A002', name: 'Sari Dewi', username: 'sari.dewi', email: 'sari.dewi@example.com', phone_number: '081234560002', status: 'active' },
  { id: 'A003', name: 'Andi Pratama', username: 'andi.pratama', email: 'andi.pratama@example.com', phone_number: '081234560003', status: 'nonactive' },
  { id: 'A004', name: 'Made Adnyana', username: 'made.adnyana', email: 'made.adnyana@example.com', phone_number: '081234560004', status: 'active' },
  { id: 'A005', name: 'Putri Maharani', username: 'putri.maharani', email: 'putri.maharani@example.com', phone_number: '081234560005', status: 'active' },
  { id: 'A006', name: 'Agus Setiawan', username: 'agus.setiawan', email: 'agus.setiawan@example.com', phone_number: '081234560006', status: 'nonactive' },
  { id: 'A007', name: 'Dewi Lestari', username: 'dewi.lestari', email: 'dewi.lestari@example.com', phone_number: '081234560007', status: 'active' },
  { id: 'A008', name: 'Komang Wirawan', username: 'komang.wirawan', email: 'komang.wirawan@example.com', phone_number: '081234560008', status: 'active' },
  { id: 'A009', name: 'Rina Anggraini', username: 'rina.anggraini', email: 'rina.anggraini@example.com', phone_number: '081234560009', status: 'nonactive' },
  { id: 'A010', name: 'Kadek Saputra', username: 'kadek.saputra', email: 'kadek.saputra@example.com', phone_number: '081234560010', status: 'active' },
  { id: 'A011', name: 'Admin Kakao', username: 'admin.kakao', email: 'admin.kakao@example.com', phone_number: '081234560011', status: 'active' },
  { id: 'A012', name: 'Yoga Permana', username: 'yoga.permana', email: 'yoga.permana@example.com', phone_number: '081234560012', status: 'nonactive' }
]

const accounts = ref([])
const search = ref('')
const statusFilter = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const sortColumn = ref('')
const sortDirection = ref('asc')
const notice = ref('')
const errorMessage = ref('')

function loadAccounts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (raw === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAccounts))
      accounts.value = [...seedAccounts]
      return
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      throw new Error('Format data akun tidak sesuai.')
    }

    accounts.value = parsed
  } catch (error) {
    errorMessage.value = 'Data simulasi tidak bisa dibaca dari browser.'
    accounts.value = []
  }
}

function saveAccounts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value))
  } catch (error) {
    errorMessage.value = 'Perubahan belum dapat disimpan di browser.'
  }
}

function handleStorage(event) {
  if (event.key === STORAGE_KEY) loadAccounts()
}

onMounted(() => {
  loadAccounts()
  window.addEventListener('storage', handleStorage)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorage)
})

const stats = computed(() => {
  const total = accounts.value.length
  const active = accounts.value.filter(a => a.status === 'active').length

  return [
    { label: 'Jumlah Akun', value: total },
    { label: 'Akun Aktif', value: active },
    { label: 'Akun Nonaktif', value: total - active },
    {
      label: 'Persentase Akun Aktif',
      value: total ? `${Math.round(active / total * 100)}%` : '0%'
    }
  ]
})

const filteredAccounts = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('id-ID')

  return accounts.value.filter(account => {
    const text = [
      account.username,
      account.name,
      account.email,
      account.phone_number
    ]
      .map(value => String(value ?? ''))
      .join(' ')
      .toLocaleLowerCase('id-ID')

    return text.includes(query) &&
      (!statusFilter.value || account.status === statusFilter.value)
  })
})

const sortedAccounts = computed(() => {
  if (!sortColumn.value) return filteredAccounts.value

  const direction = sortDirection.value === 'asc' ? 1 : -1

  return [...filteredAccounts.value].sort((a, b) =>
    String(a[sortColumn.value] ?? '').localeCompare(
      String(b[sortColumn.value] ?? ''),
      'id',
      { sensitivity: 'base', numeric: true }
    ) * direction
  )
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedAccounts.value.length / itemsPerPage.value))
)

const pageNumbers = computed(() =>
  Array.from({ length: totalPages.value }, (_, index) => index + 1)
)

const pageAccounts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return sortedAccounts.value.slice(start, start + itemsPerPage.value)
})

const startRow = computed(() =>
  sortedAccounts.value.length
    ? (currentPage.value - 1) * itemsPerPage.value + 1
    : 0
)

const endRow = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, sortedAccounts.value.length)
)

watch([search, statusFilter, itemsPerPage], () => {
  currentPage.value = 1
})

watch(totalPages, value => {
  if (currentPage.value > value) currentPage.value = value
})

function changeSort(column) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }

  currentPage.value = 1
}

function sortIndicator(column) {
  return sortColumn.value === column
    ? (sortDirection.value === 'asc' ? '↑' : '↓')
    : '↕'
}

function deleteAccount(account) {
  if (!window.confirm(`Hapus akun contoh ${account.name} (${account.username})?`)) {
    return
  }

  accounts.value = accounts.value.filter(item => item.id !== account.id)
  saveAccounts()

  notice.value = `Akun contoh ${account.username} dihapus dari penyimpanan browser.`
}

</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">

    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#174C35] text-white">
      <div class="border-b border-white/10 px-6 py-6">
        <a href="/" class="text-2xl font-bold tracking-wide">
          KAKAO
        </a>

        <p class="mt-2 text-xs leading-5 tracking-wider text-white/70">
          SISTEM INFORMASI<br />
          PRODUSEN KAKAO
        </p>
      </div>

      <nav class="flex-1 space-y-1 px-4 py-6" aria-label="Navigasi Admin">
        <a
          href="/admin/dashboard"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Dashboard
        </a>

        <a
          href="/admin/customers"
          class="block rounded-lg bg-white/15 px-4 py-3 text-sm font-semibold text-white"
          aria-current="page"
        >
          Pelanggan
        </a>

        <a
          href="/admin/products"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Produk
        </a>

        <a
          href="/admin/orders"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Pesanan
        </a>

        <a
          href="/admin/payments"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Pembayaran
        </a>

        <a
          href="/admin/shipping"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Pengiriman
        </a>
      </nav>

      <div class="border-t border-white/10 px-6 py-4 text-xs text-white/50">
        © 2026 KAKAO
      </div>
    </aside>

    <!-- Topbar -->
    <header class="ml-64 flex min-h-[88px] items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        <p class="text-xs font-semibold tracking-widest text-gray-400">
          ADMIN AREA
        </p>
        <h1 class="mt-1 text-xl font-bold text-gray-800">
          Akun
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#174C35] text-sm font-bold text-white">
          A
        </div>

        <div>
          <p class="text-sm font-semibold text-gray-800">
            Admin KAKAO
          </p>
          <p class="text-xs text-gray-500">
            Akun
          </p>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="ml-64 px-8 py-8">

      <!-- Statistik -->
      <section
        class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Statistik akun"
      >
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-gray-500">
                {{ stat.label }}
              </p>

              <h3 class="mt-3 text-2xl font-bold text-gray-800">
                {{ stat.value }}
              </h3>
            </div>

            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold"
              :class="[
                index === 0 ? 'bg-blue-50 text-blue-600' :
                index === 1 ? 'bg-green-50 text-green-600' :
                index === 2 ? 'bg-red-50 text-red-600' :
                'bg-amber-50 text-amber-600'
              ]"
            >
              {{ index === 0 ? 'A' : index === 1 ? '✓' : index === 2 ? '−' : '%' }}
            </div>
          </div>
        </div>
      </section>

      <!-- Tabel akun -->
      <section class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

        <!-- Heading -->
        <div class="border-b border-gray-100 px-6 py-5">
          <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 class="text-lg font-bold text-gray-800">
                List Akun
              </h2>

              <div class="mt-2 flex items-center gap-2 text-sm text-gray-400">
                <span>Admin</span>
                <span>›</span>
                <span class="font-medium text-[#174C35]">Akun</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Notice -->
        <div v-if="notice" class="mx-6 mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {{ notice }}
        </div>

        <div v-if="errorMessage" class="mx-6 mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {{ errorMessage }}
        </div>

        <!-- Toolbar -->
        <div class="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap items-center gap-3">
            <label class="flex items-center gap-2 text-sm text-gray-500">
              Tampilkan

              <select
                v-model.number="itemsPerPage"
                aria-label="Jumlah baris per halaman"
                class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#174C35] focus:ring-2 focus:ring-[#174C35]/10"
              >
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </label>

            <select
              v-model="statusFilter"
              aria-label="Filter status akun"
              class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#174C35] focus:ring-2 focus:ring-[#174C35]/10"
            >
              <option value="">Semua Status</option>
              <option value="active">Active</option>
              <option value="nonactive">Non Active</option>
            </select>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <label class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" aria-hidden="true">
                ⌕
              </span>

              <input
                v-model="search"
                type="search"
                placeholder="Cari akun..."
                aria-label="Cari akun"
                class="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#174C35] focus:ring-2 focus:ring-[#174C35]/10 sm:w-64"
              />
            </label>

            <a
              href="/admin/customers/form"
              class="inline-flex items-center justify-center rounded-lg bg-[#174C35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#103b29]"
            >
              + Tambah Akun
            </a>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full min-w-[900px] border-collapse text-left">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="column in [
                    { key: 'username', title: 'USERNAME' },
                    { key: 'name', title: 'NAMA LENGKAP' },
                    { key: 'email', title: 'EMAIL' },
                    { key: 'phone_number', title: 'NOMOR TELEPON' },
                  ]"
                  :key="column.key"
                  class="border-y border-gray-100 px-6 py-4"
                >
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 whitespace-nowrap text-xs font-bold tracking-wide text-gray-500 transition hover:text-[#174C35]"
                    @click="changeSort(column.key)"
                  >
                    {{ column.title }}
                    <span class="text-sm text-gray-400">
                      {{ sortIndicator(column.key) }}
                    </span>
                  </button>
                </th>

                <th class="border-y border-gray-100 px-6 py-4 text-xs font-bold tracking-wide text-gray-500">
                  STATUS
                </th>

                <th class="border-y border-gray-100 px-6 py-4 text-center text-xs font-bold tracking-wide text-gray-500">
                  AKSI
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="account in pageAccounts"
                :key="account.id"
                class="border-b border-gray-100 transition hover:bg-gray-50/70"
              >
                <td class="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-800">
                  {{ account.username }}
                </td>

                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {{ account.name }}
                </td>

                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {{ account.email }}
                </td>

                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {{ account.phone_number }}
                </td>

                <td class="whitespace-nowrap px-6 py-4">
                  <span
                    class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                    :class="account.status === 'active'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'"
                  >
                    {{ account.status === 'active' ? 'Active' : 'Non Active' }}
                  </span>
                </td>

                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-center gap-2">
                    <a
                      :href="`/admin/customers/form?id=${account.id}`"
                      class="rounded-md border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      Edit
                    </a>

                    <button
                      type="button"
                      class="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      @click="deleteAccount(account)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="pageAccounts.length === 0">
                <td colspan="6" class="px-6 py-12 text-center">
                  <p class="text-sm font-medium text-gray-500">
                    Tidak ada akun yang sesuai pencarian atau filter.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table footer -->
        <div class="flex flex-col gap-4 border-t border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-gray-500">
            Showing
            <span class="font-semibold text-gray-700">{{ startRow }}</span>
            to
            <span class="font-semibold text-gray-700">{{ endRow }}</span>
            of
            <span class="font-semibold text-gray-700">{{ sortedAccounts.length }}</span>
            items
          </p>

          <div class="flex flex-wrap items-center gap-1" aria-label="Halaman tabel akun">
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              :disabled="currentPage === 1"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              @click="currentPage--"
            >
              ‹
            </button>

            <button
              v-for="page in pageNumbers"
              :key="page"
              type="button"
              :aria-current="currentPage === page ? 'page' : undefined"
              class="flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition"
              :class="currentPage === page
                ? 'border-[#174C35] bg-[#174C35] text-white'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
              @click="currentPage = page"
            >
              {{ page }}
            </button>

            <button
              type="button"
              aria-label="Halaman berikutnya"
              :disabled="currentPage >= totalPages"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              @click="currentPage++"
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="ml-64 flex flex-col gap-2 border-t border-gray-200 bg-white px-8 py-5 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>
  </div>
</template>
