
<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const DEMO_STORAGE_KEY = 'kakao_demo_products'

const demoSeed = [
  {
    id: 'demo-a',
    product_code: 'KAKAO-A',
    product_name: 'Cocoa Bean A',
    product_type: 'fermented',
    grade: 'A',
    stock: 500,
    price_per_kg: '',
    description: 'Biji kakao fermentasi dengan kualitas Grade A',
    is_active: 1
  },
  {
    id: 'demo-b',
    product_code: 'KAKAO-B',
    product_name: 'Cocoa Bean B',
    product_type: 'fermented',
    grade: 'B',
    stock: 800,
    price_per_kg: '',
    description: 'Biji kakao fermentasi dengan kualitas Grade B',
    is_active: 1
  },
  {
    id: 'demo-c',
    product_code: 'KAKAO-C',
    product_name: 'Cocoa Bean C',
    product_type: 'non_fermented',
    grade: 'C',
    stock: 300,
    price_per_kg: '',
    description: 'Biji kakao non-fermentasi dengan kualitas Grade C',
    is_active: 1
  }
]

const products = ref([])
const search = ref('')
const gradeFilter = ref('')
const categoryFilter = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const sortColumn = ref('')
const sortDirection = ref('asc')
const errorMessage = ref('')

function getDemoProducts() {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY)

    if (raw === null) {
      localStorage.setItem(
        DEMO_STORAGE_KEY,
        JSON.stringify(demoSeed)
      )

      return demoSeed
    }

    const data = JSON.parse(raw)

    if (!Array.isArray(data)) {
      throw new Error('Format data produk tidak sesuai.')
    }

    return data
  } catch (error) {
    errorMessage.value =
      'Data demo di browser tidak bisa dibaca. Periksa penyimpanan browser.'

    return []
  }
}

function loadProducts() {
  products.value = getDemoProducts()
}

function formatProductType(type) {
  if (type === 'fermented') return 'Fermentasi'
  if (type === 'non_fermented') return 'Non-Fermentasi'

  return '-'
}

function displayStock(stock) {
  return stock === null || stock === undefined || stock === ''
    ? '-'
    : `${Number(stock).toLocaleString('id-ID')} kg`
}

const stats = computed(() => [
  {
    category: 'Total Produk',
    value: products.value.length
  },
  ...['A', 'B', 'C'].map(grade => ({
    category: `Total Produk Grade ${grade}`,
    value: products.value.filter(
      product =>
        String(product.grade ?? '').toUpperCase() === grade
    ).length
  }))
])

function normalizeForSort(product, column) {
  if (column === 'name') {
    return product.product_name ?? product.name ?? ''
  }

  if (column === 'type') {
    return product.product_type ?? product.type ?? ''
  }

  return product[column] ?? ''
}

const filteredProducts = computed(() => {
  const query = search.value.trim().toLowerCase()
  const grade = gradeFilter.value.toLowerCase()
  const type = categoryFilter.value.toLowerCase()

  const filtered = products.value.filter(product => {
    const productType = String(
      product.product_type ?? product.type ?? ''
    ).toLowerCase()

    const productGrade = String(
      product.grade ?? ''
    ).toLowerCase()

    const searchable = [
      product.id,
      product.product_code,
      product.product_name ?? product.name,
      productType,
      formatProductType(productType),
      product.grade,
      product.description,
      product.stock
    ]
      .filter(value => value !== null && value !== undefined)
      .join(' ')
      .toLowerCase()

    return (
      searchable.includes(query) &&
      (!grade || productGrade === grade) &&
      (!type || productType === type)
    )
  })

  if (!sortColumn.value) return filtered

  return [...filtered].sort((a, b) => {
    const aValue = normalizeForSort(a, sortColumn.value)
    const bValue = normalizeForSort(b, sortColumn.value)

    let comparison = 0

    if (sortColumn.value === 'stock') {
      const aNumber = aValue === '' ? -Infinity : Number(aValue)
      const bNumber = bValue === '' ? -Infinity : Number(bValue)

      comparison =
        (Number.isNaN(aNumber) ? -Infinity : aNumber) -
        (Number.isNaN(bNumber) ? -Infinity : bNumber)
    } else {
      comparison = String(aValue).localeCompare(
        String(bValue),
        'id-ID',
        {
          numeric: true,
          sensitivity: 'base'
        }
      )
    }

    return sortDirection.value === 'asc'
      ? comparison
      : -comparison
  })
})

const totalItems = computed(() => filteredProducts.value.length)

const totalPages = computed(() =>
  Math.ceil(totalItems.value / Number(itemsPerPage.value))
)

const startIndex = computed(() =>
  (currentPage.value - 1) * Number(itemsPerPage.value)
)

const pagedProducts = computed(() =>
  filteredProducts.value.slice(
    startIndex.value,
    startIndex.value + Number(itemsPerPage.value)
  )
)

const startItem = computed(() =>
  totalItems.value === 0 ? 0 : startIndex.value + 1
)

const endItem = computed(() =>
  Math.min(
    startIndex.value + Number(itemsPerPage.value),
    totalItems.value
  )
)

const pageNumbers = computed(() =>
  Array.from(
    { length: totalPages.value },
    (_, index) => index + 1
  )
)

watch(
  [search, gradeFilter, categoryFilter, itemsPerPage],
  () => {
    currentPage.value = 1
  }
)

watch(totalPages, newTotal => {
  if (currentPage.value > newTotal) {
    currentPage.value = Math.max(1, newTotal)
  }
})

function toggleSort(column) {
  if (sortColumn.value === column) {
    sortDirection.value =
      sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

function sortSymbol(column) {
  return sortColumn.value === column
    ? sortDirection.value === 'asc'
      ? '↑'
      : '↓'
    : '↕'
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function deleteProduct(product) {
  const productName =
    product.product_name ?? product.name ?? 'produk'

  if (
    !window.confirm(
      `Hapus produk "${productName}" dari data demo?`
    )
  ) {
    return
  }

  try {
    const next = products.value.filter(
      item => String(item.id) !== String(product.id)
    )

    localStorage.setItem(
      DEMO_STORAGE_KEY,
      JSON.stringify(next)
    )

    products.value = next
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value =
      'Gagal menghapus data demo dari browser.'
  }
}

function belumTersedia(menu) {
  window.alert(
    `Halaman Admin ${menu} belum dipindahkan ke Vue.js.`
  )
}

function onStorage(event) {
  if (event.key === DEMO_STORAGE_KEY) {
    loadProducts()
  }
}

onMounted(() => {
  loadProducts()
  window.addEventListener('storage', onStorage)
})

onUnmounted(() => {
  window.removeEventListener('storage', onStorage)
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f7f2] text-gray-800">

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#173f35] text-white lg:flex"
    >
      <div class="border-b border-white/10 px-6 py-7">
        <a
          href="/"
          class="text-2xl font-bold tracking-widest"
        >
          KAKAO
        </a>

        <p class="mt-2 text-xs leading-5 tracking-wide text-white/70">
          SISTEM INFORMASI<br />
          PRODUSEN KAKAO
        </p>
      </div>

      <nav
        class="flex-1 space-y-2 px-4 py-6"
        aria-label="Navigasi Admin"
      >
        <a
          href="/admin/dashboard"
          class="block rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Dashboard
        </a>

        <a
          href="/admin/customers"
          class="block rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Pelanggan
        </a>

        <a
          href="/admin/products"
          class="block rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold text-white"
          aria-current="page"
        >
          Produk
        </a>

        <a
          href="/admin/orders"
          class="block rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Pesanan
        </a>

        <a
          href="/admin/payments"
          class="block rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Pembayaran
        </a>

        <a
          href="/admin/shipping"
          class="block rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Pengiriman
        </a>
      </nav>

      <div class="border-t border-white/10 px-6 py-5">
        <p class="text-xs text-white/50">
          © 2026 KAKAO
        </p>
      </div>
    </aside>

    <!-- Main content -->
    <div class="lg:pl-64">

      <!-- Topbar -->
      <header
        class="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-5 sm:px-8"
      >
        <div>
          <p class="text-xs font-semibold tracking-widest text-[#688477]">
            ADMIN AREA
          </p>

          <h1 class="mt-1 text-xl font-bold text-[#173f35] sm:text-2xl">
            Produk
          </h1>
        </div>

        <div class="text-right">
          <p class="text-sm font-semibold text-gray-800">
            Admin KAKAO
          </p>

          <p class="mt-1 text-xs text-gray-500">
            Produk
          </p>
        </div>
      </header>

      <main class="mx-auto max-w-7xl px-4 py-8 sm:px-8">

        <!-- Demo notice -->
        <div
          class="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
          role="note"
        >
          Mode demo frontend — data daftar produk tersimpan di
          browser ini, belum terhubung ke Laravel.
        </div>

        <!-- Error message -->
        <div
          v-if="errorMessage"
          class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          role="alert"
        >
          {{ errorMessage }}
        </div>

        <!-- Statistics -->
        <section
          class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Statistik Produk"
        >
          <div
            v-for="stat in stats"
            :key="stat.category"
            class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p class="text-sm text-gray-500">
              {{ stat.category }}
            </p>

            <h3 class="mt-3 text-3xl font-bold text-[#173f35]">
              {{ stat.value }}
            </h3>
          </div>
        </section>

        <!-- Product table -->
        <section
          class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >

          <!-- Heading -->
          <div class="border-b border-gray-100 px-5 py-6 sm:px-8">
            <h2 class="text-xl font-bold text-[#173f35]">
              Produk
            </h2>

            <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <span>Admin</span>
              <span>›</span>
              <strong class="font-medium text-gray-700">
                Produk
              </strong>
            </div>
          </div>

          <!-- Toolbar -->
          <section
            class="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:px-8"
            aria-label="Filter Produk"
          >
            <div
              class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
            >

              <!-- Filters -->
              <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">

                <label
                  class="flex items-center gap-2 text-sm text-gray-600"
                >
                  Tampilkan

                  <select
                    v-model.number="itemsPerPage"
                    aria-label="Jumlah baris per halaman"
                    class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                  >
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                  </select>
                </label>

                <select
                  v-model="categoryFilter"
                  aria-label="Filter tipe produk"
                  class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                >
                  <option value="">Semua Kategori</option>
                  <option value="fermented">Fermentasi</option>
                  <option value="non_fermented">Non-Fermentasi</option>
                </select>

                <select
                  v-model="gradeFilter"
                  aria-label="Filter grade produk"
                  class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                >
                  <option value="">Semua Grade</option>
                  <option value="a">Grade A</option>
                  <option value="b">Grade B</option>
                  <option value="c">Grade C</option>
                </select>
              </div>

              <!-- Search and add -->
              <div class="flex flex-col gap-3 sm:flex-row">

                <label
                  class="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 focus-within:border-[#386b50] focus-within:ring-2 focus-within:ring-[#386b50]/20"
                >
                  <span
                    class="text-lg text-gray-400"
                    aria-hidden="true"
                  >
                    ⌕
                  </span>

                  <input
                    v-model="search"
                    type="search"
                    placeholder="Cari produk"
                    aria-label="Cari produk"
                    class="min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400 sm:w-40"
                  />
                </label>

                <a
                  href="/admin/products/form"
                  class="inline-flex items-center justify-center rounded-lg bg-[#386b50] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#28533d]"
                  aria-label="Tambah produk"
                >
                  + Tambah Produk
                </a>
              </div>
            </div>
          </section>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px] border-collapse text-left text-sm">

              <thead class="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th
                    v-for="column in [
                      { key: 'id', label: 'ID' },
                      { key: 'name', label: 'Nama Produk' },
                      { key: 'type', label: 'Tipe' },
                      { key: 'grade', label: 'Grade' },
                      { key: 'stock', label: 'Stok' }
                    ]"
                    :key="column.key"
                    class="px-5 py-4 font-semibold"
                  >
                    <button
                      class="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-[#173f35]"
                      type="button"
                      :aria-label="`Urutkan ${column.label}`"
                      @click="toggleSort(column.key)"
                    >
                      {{ column.label }}

                      <span class="text-gray-400">
                        {{ sortSymbol(column.key) }}
                      </span>
                    </button>
                  </th>

                  <th class="px-5 py-4 font-semibold">
                    Deskripsi
                  </th>

                  <th class="px-5 py-4 text-center font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-100">

                <tr
                  v-for="product in pagedProducts"
                  :key="product.id"
                  class="transition hover:bg-gray-50/70"
                >
                  <td class="whitespace-nowrap px-5 py-4 text-gray-500">
                    {{ product.id }}
                  </td>

                  <td class="whitespace-nowrap px-5 py-4 font-semibold text-gray-800">
                    {{ product.product_name ?? product.name ?? '-' }}
                  </td>

                  <td class="whitespace-nowrap px-5 py-4 text-gray-600">
                    {{ formatProductType(product.product_type ?? product.type) }}
                  </td>

                  <td class="whitespace-nowrap px-5 py-4">
                    <span
                      class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      :class="{
                        'bg-green-100 text-green-700': String(product.grade).toUpperCase() === 'A',
                        'bg-blue-100 text-blue-700': String(product.grade).toUpperCase() === 'B',
                        'bg-amber-100 text-amber-700': String(product.grade).toUpperCase() === 'C',
                        'bg-gray-100 text-gray-600': !['A', 'B', 'C'].includes(String(product.grade ?? '').toUpperCase())
                      }"
                    >
                      Grade {{ product.grade || '-' }}
                    </span>
                  </td>

                  <td class="whitespace-nowrap px-5 py-4 text-gray-600">
                    {{ displayStock(product.stock) }}
                  </td>

                  <td
                    class="max-w-xs px-5 py-4 text-gray-600"
                    :title="product.description || ''"
                  >
                    <p class="line-clamp-2">
                      {{ product.description || '-' }}
                    </p>
                  </td>

                  <td class="px-5 py-4">
                    <div class="flex items-center justify-center gap-2">

                      <a
                        class="rounded-lg border border-[#386b50]/30 px-3 py-1.5 text-xs font-semibold text-[#386b50] transition hover:bg-[#386b50]/10"
                        :href="`/admin/products/form?id=${encodeURIComponent(product.id)}`"
                      >
                        Edit
                      </a>

                      <button
                        class="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        type="button"
                        @click="deleteProduct(product)"
                      >
                        Hapus
                      </button>

                    </div>
                  </td>
                </tr>

                <!-- Empty state -->
                <tr v-if="pagedProducts.length === 0">
                  <td
                    colspan="7"
                    class="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    Tidak ada produk ditemukan.
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div
            class="flex flex-col gap-4 border-t border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <p class="text-sm text-gray-500">
              Menampilkan
              <span class="font-semibold text-gray-700">
                {{ startItem }}
              </span>
              sampai
              <span class="font-semibold text-gray-700">
                {{ endItem }}
              </span>
              dari
              <span class="font-semibold text-gray-700">
                {{ totalItems }}
              </span>
              produk
            </p>

            <div
              class="flex flex-wrap items-center gap-1"
              aria-label="Navigasi halaman"
            >
              <button
                type="button"
                aria-label="Halaman sebelumnya"
                :disabled="currentPage <= 1"
                class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                @click="goToPage(currentPage - 1)"
              >
                ‹
              </button>

              <button
                v-for="page in pageNumbers"
                :key="page"
                type="button"
                :class="page === currentPage
                  ? 'border-[#386b50] bg-[#386b50] text-white'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
                class="flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition"
                :aria-current="page === currentPage ? 'page' : undefined"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>

              <button
                type="button"
                aria-label="Halaman selanjutnya"
                :disabled="currentPage >= totalPages"
                class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                @click="goToPage(currentPage + 1)"
              >
                ›
              </button>
            </div>
          </div>

        </section>
      </main>

      <!-- Footer -->
      <footer
        class="flex flex-col gap-2 border-t border-gray-200 bg-white px-5 py-5 text-center text-xs text-gray-500 sm:flex-row sm:justify-between sm:px-8"
      >
        <p>© 2026 KAKAO</p>

        <p>
          Sistem Informasi Penjualan dan Pemesanan Kakao
        </p>
      </footer>

    </div>
  </div>
</template>
