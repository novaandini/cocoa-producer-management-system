<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

// Sama dengan key yang digunakan AdminProductFormView.vue sebelumnya.
// Data hanya untuk simulasi frontend; belum terhubung ke Laravel/MySQL.
const DEMO_STORAGE_KEY = 'kakao_demo_products'

const demoSeed = [
  {
    id: 'demo-a', product_code: 'KAKAO-A', product_name: 'Cocoa Bean A',
    product_type: 'fermented', grade: 'A', stock: 500, price_per_kg: '',
    description: 'Biji kakao fermentasi dengan kualitas Grade A', is_active: 1
  },
  {
    id: 'demo-b', product_code: 'KAKAO-B', product_name: 'Cocoa Bean B',
    product_type: 'fermented', grade: 'B', stock: 800, price_per_kg: '',
    description: 'Biji kakao fermentasi dengan kualitas Grade B', is_active: 1
  },
  {
    id: 'demo-c', product_code: 'KAKAO-C', product_name: 'Cocoa Bean C',
    product_type: 'non_fermented', grade: 'C', stock: 300, price_per_kg: '',
    description: 'Biji kakao non-fermentasi dengan kualitas Grade C', is_active: 1
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
    // Seed data contoh SEKALI saja untuk browser yang belum memiliki data.
    // Jika data sudah ada, jangan ditimpa agar hasil simpan dari Form tetap aman.
    if (raw === null) {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoSeed))
      return demoSeed
    }
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) throw new Error('Format data produk tidak sesuai.')
    return data
  } catch (error) {
    errorMessage.value = 'Data demo di browser tidak bisa dibaca. Periksa penyimpanan browser.'
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
  { category: 'Total Produk', value: products.value.length },
  ...['A', 'B', 'C'].map(grade => ({
    category: `Total Produk Grade ${grade}`,
    value: products.value.filter(product =>
      String(product.grade ?? '').toUpperCase() === grade
    ).length
  }))
])

function normalizeForSort(product, column) {
  if (column === 'name') return product.product_name ?? product.name ?? ''
  if (column === 'type') return product.product_type ?? product.type ?? ''
  return product[column] ?? ''
}

const filteredProducts = computed(() => {
  const query = search.value.trim().toLowerCase()
  const grade = gradeFilter.value.toLowerCase()
  const type = categoryFilter.value.toLowerCase()

  const filtered = products.value.filter(product => {
    const productType = String(product.product_type ?? product.type ?? '').toLowerCase()
    const productGrade = String(product.grade ?? '').toLowerCase()
    const searchable = [
      product.id, product.product_code,
      product.product_name ?? product.name,
      productType, formatProductType(productType),
      product.grade, product.description, product.stock
    ].filter(value => value !== null && value !== undefined).join(' ').toLowerCase()

    return searchable.includes(query) &&
      (!grade || productGrade === grade) &&
      (!type || productType === type)
  })

  if (!sortColumn.value) return filtered

  return [...filtered].sort((a, b) => {
    const aValue = normalizeForSort(a, sortColumn.value)
    const bValue = normalizeForSort(b, sortColumn.value)
    let comparison = 0

    if (sortColumn.value === 'stock') {
      // Produk dari form lama bisa belum memiliki atribut stok.
      const aNumber = aValue === '' ? -Infinity : Number(aValue)
      const bNumber = bValue === '' ? -Infinity : Number(bValue)
      comparison = (Number.isNaN(aNumber) ? -Infinity : aNumber) -
                   (Number.isNaN(bNumber) ? -Infinity : bNumber)
    } else {
      // numeric:true mengurutkan ID teks/angka dengan benar (demo-2 sebelum demo-10).
      comparison = String(aValue).localeCompare(String(bValue), 'id-ID', {
        numeric: true, sensitivity: 'base'
      })
    }
    return sortDirection.value === 'asc' ? comparison : -comparison
  })
})

const totalItems = computed(() => filteredProducts.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / Number(itemsPerPage.value)))
const startIndex = computed(() => (currentPage.value - 1) * Number(itemsPerPage.value))
const pagedProducts = computed(() => filteredProducts.value.slice(
  startIndex.value, startIndex.value + Number(itemsPerPage.value)
))
const startItem = computed(() => totalItems.value === 0 ? 0 : startIndex.value + 1)
const endItem = computed(() => Math.min(startIndex.value + Number(itemsPerPage.value), totalItems.value))
const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

watch([search, gradeFilter, categoryFilter, itemsPerPage], () => {
  currentPage.value = 1
})
watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) currentPage.value = Math.max(1, newTotal)
})

function toggleSort(column) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

function sortSymbol(column) {
  return sortColumn.value === column
    ? (sortDirection.value === 'asc' ? '↑' : '↓')
    : '↕'
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

function deleteProduct(product) {
  if (!window.confirm(`Hapus produk "${product.product_name ?? product.name}" dari data demo?`)) return
  try {
    const next = products.value.filter(p => String(p.id) !== String(product.id))
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(next))
    products.value = next
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Gagal menghapus data demo dari browser.'
  }
}

function belumTersedia(menu) {
  window.alert(`Halaman Admin ${menu} belum dipindahkan ke Vue.js.`)
}

function onStorage(event) {
  if (event.key === DEMO_STORAGE_KEY) loadProducts()
}

onMounted(() => {
  loadProducts()
  window.addEventListener('storage', onStorage)
})
onUnmounted(() => window.removeEventListener('storage', onStorage))
</script>

<template>
  <div class="admin-products-page">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <a href="/">KAKAO</a>
        <p>SISTEM INFORMASI<br>PRODUSEN KAKAO</p>
      </div>

      <nav class="sidebar-menu" aria-label="Navigasi Admin">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/customers">Pelanggan</a>
        <a href="/admin/products" class="active" aria-current="page">Produk</a>
        <a href="/admin/orders">Pesanan</a>
        <a href="/admin/payments">Pembayaran</a>
        <a href="/admin/shipping">Pengiriman</a>
      </nav>
    </aside>

    <header class="topbar">
      <div>
        <p class="topbar-label">ADMIN AREA</p>
        <h1>Produk</h1>
      </div>
      <div class="admin-info">
        <strong>Admin KAKAO</strong>
        <span>Produk</span>
      </div>
    </header>

    <main>
      <p class="demo-note" role="note">
        Mode demo frontend — data daftar produk tersimpan di browser ini, belum terhubung ke Laravel.
      </p>
      <p v-if="errorMessage" class="error-note" role="alert">{{ errorMessage }}</p>

      <section class="stats" aria-label="Statistik Produk">
        <div v-for="stat in stats" :key="stat.category" class="stat-card">
          <p>{{ stat.category }}</p>
          <h3>{{ stat.value }}</h3>
        </div>
      </section>

      <section class="table-card">
        <div class="page-heading">
          <div>
            <h1>Produk</h1>
            <div class="breadcrumb"><span>Admin</span><span>›</span><strong>Produk</strong></div>
          </div>
        </div>

        <section class="toolbar" aria-label="Filter Produk">
          <div class="filters">
            <label class="filter-label">Tampilkan
              <select v-model.number="itemsPerPage" aria-label="Jumlah baris per halaman">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </label>
            <select v-model="categoryFilter" aria-label="Filter tipe produk">
              <option value="">Semua Kategori</option>
              <option value="fermented">Fermentasi</option>
              <option value="non_fermented">Non-Fermentasi</option>
            </select>
            <select v-model="gradeFilter" aria-label="Filter grade produk">
              <option value="">Semua Grade</option>
              <option value="a">Grade A</option>
              <option value="b">Grade B</option>
              <option value="c">Grade C</option>
            </select>
          </div>
          <div class="table-actions">
            <label class="product-search">
              <span aria-hidden="true">⌕</span>
              <input v-model="search" type="search" placeholder="Search" aria-label="Cari produk">
            </label>
            <a href="/admin/products/form" class="add-button" aria-label="Tambah produk">+ Tambah Produk</a>
          </div>
        </section>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th v-for="column in [
                  { key: 'id', label: 'ID' },
                  { key: 'name', label: 'NAMA PRODUK' },
                  { key: 'type', label: 'TIPE' },
                  { key: 'grade', label: 'GRADE' },
                  { key: 'stock', label: 'STOK' }
                ]" :key="column.key">
                  <button class="sort-button" type="button" :aria-label="`Urutkan ${column.label}`"
                    @click="toggleSort(column.key)">
                    {{ column.label }} <span class="sort">{{ sortSymbol(column.key) }}</span>
                  </button>
                </th>
                <th>DESKRIPSI</th>
                <th class="action-cell">AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in pagedProducts" :key="product.id">
                <td>{{ product.id }}</td>
                <td class="product-name">{{ product.product_name ?? product.name ?? '-' }}</td>
                <td>{{ formatProductType(product.product_type ?? product.type) }}</td>
                <td><span class="grade" :class="`grade-${String(product.grade ?? '').toLowerCase()}`">Grade {{ product.grade || '-' }}</span></td>
                <td>{{ displayStock(product.stock) }}</td>
                <td class="description-cell" :title="product.description || ''">{{ product.description || '-' }}</td>
                <td class="action-cell">
                  <div class="table-actions">
                    <a class="action edit" :href="`/admin/products/form?id=${encodeURIComponent(product.id)}`">Edit</a>
                    <button class="action delete" type="button" @click="deleteProduct(product)">Hapus</button>
                  </div>
                </td>
              </tr>
              <tr v-if="pagedProducts.length === 0">
                <td colspan="7" class="empty-row">Tidak ada produk ditemukan.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-footer">
          <span>Menampilkan {{ startItem }} sampai {{ endItem }} dari {{ totalItems }} produk</span>
          <div class="pagination" aria-label="Navigasi halaman">
            <button type="button" aria-label="Halaman sebelumnya" :disabled="currentPage <= 1" @click="goToPage(currentPage - 1)">‹</button>
            <button v-for="page in pageNumbers" :key="page" type="button"
              :class="{ 'current-page': page === currentPage }"
              :aria-current="page === currentPage ? 'page' : undefined"
              @click="goToPage(page)">{{ page }}</button>
            <button type="button" aria-label="Halaman selanjutnya" :disabled="currentPage >= totalPages" @click="goToPage(currentPage + 1)">›</button>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>
  </div>
</template>

<style scoped src="./AdminProductsView.css"></style>
