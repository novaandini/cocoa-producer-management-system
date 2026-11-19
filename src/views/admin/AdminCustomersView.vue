<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

// Data simulasi untuk migrasi frontend. Tidak menggunakan API Laravel.
// Gunakan key yang sama saat membuat AdminCustomerFormView.vue nanti.
const STORAGE_KEY = 'kakao_demo_accounts'
const seedAccounts = [
  {"id": "A001", "name": "Budi Santoso", "username": "budi.santoso", "email": "budi.santoso@example.com", "phone_number": "081234560001", "status": "active"},
  {"id": "A002", "name": "Sari Dewi", "username": "sari.dewi", "email": "sari.dewi@example.com", "phone_number": "081234560002", "status": "active"},
  {"id": "A003", "name": "Andi Pratama", "username": "andi.pratama", "email": "andi.pratama@example.com", "phone_number": "081234560003", "status": "nonactive"},
  {"id": "A004", "name": "Made Adnyana", "username": "made.adnyana", "email": "made.adnyana@example.com", "phone_number": "081234560004", "status": "active"},
  {"id": "A005", "name": "Putri Maharani", "username": "putri.maharani", "email": "putri.maharani@example.com", "phone_number": "081234560005", "status": "active"},
  {"id": "A006", "name": "Agus Setiawan", "username": "agus.setiawan", "email": "agus.setiawan@example.com", "phone_number": "081234560006", "status": "nonactive"},
  {"id": "A007", "name": "Dewi Lestari", "username": "dewi.lestari", "email": "dewi.lestari@example.com", "phone_number": "081234560007", "status": "active"},
  {"id": "A008", "name": "Komang Wirawan", "username": "komang.wirawan", "email": "komang.wirawan@example.com", "phone_number": "081234560008", "status": "active"},
  {"id": "A009", "name": "Rina Anggraini", "username": "rina.anggraini", "email": "rina.anggraini@example.com", "phone_number": "081234560009", "status": "nonactive"},
  {"id": "A010", "name": "Kadek Saputra", "username": "kadek.saputra", "email": "kadek.saputra@example.com", "phone_number": "081234560010", "status": "active"},
  {"id": "A011", "name": "Admin Kakao", "username": "admin.kakao", "email": "admin.kakao@example.com", "phone_number": "081234560011", "status": "active"},
  {"id": "A012", "name": "Yoga Permana", "username": "yoga.permana", "email": "yoga.permana@example.com", "phone_number": "081234560012", "status": "nonactive"}
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
      // Isi contoh hanya pada pemakaian pertama; jangan menimpa perubahan pengguna.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAccounts))
      accounts.value = [...seedAccounts]
      return
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) throw new Error('Format data akun tidak sesuai.')
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
onUnmounted(() => window.removeEventListener('storage', handleStorage))

const stats = computed(() => {
  const total = accounts.value.length
  const active = accounts.value.filter(a => a.status === 'active').length
  return [
    { label: 'Jumlah Akun', value: total },
    { label: 'Akun Aktif', value: active },
    { label: 'Akun Nonaktif', value: total - active },
    { label: 'Persentase Akun Aktif', value: total ? `${Math.round(active / total * 100)}%` : '0%' },
  ]
})

const filteredAccounts = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('id-ID')
  return accounts.value.filter(account => {
    const text = [account.username, account.name, account.email, account.phone_number]
      .map(value => String(value ?? '')).join(' ').toLocaleLowerCase('id-ID')
    return text.includes(query) && (!statusFilter.value || account.status === statusFilter.value)
  })
})

const sortedAccounts = computed(() => {
  if (!sortColumn.value) return filteredAccounts.value
  const direction = sortDirection.value === 'asc' ? 1 : -1
  return [...filteredAccounts.value].sort((a, b) =>
    String(a[sortColumn.value] ?? '').localeCompare(
      String(b[sortColumn.value] ?? ''), 'id', { sensitivity: 'base', numeric: true }
    ) * direction
  )
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedAccounts.value.length / itemsPerPage.value)))
const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, index) => index + 1))
const pageAccounts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return sortedAccounts.value.slice(start, start + itemsPerPage.value)
})
const startRow = computed(() => sortedAccounts.value.length ? (currentPage.value - 1) * itemsPerPage.value + 1 : 0)
const endRow = computed(() => Math.min(currentPage.value * itemsPerPage.value, sortedAccounts.value.length))

watch([search, statusFilter, itemsPerPage], () => { currentPage.value = 1 })
watch(totalPages, value => { if (currentPage.value > value) currentPage.value = value })

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
  return sortColumn.value === column ? (sortDirection.value === 'asc' ? '↑' : '↓') : '↕'
}

function formPending(action) {
  notice.value = `Halaman ${action} Akun belum dipindahkan ke Vue.js. Kita lanjutkan setelah halaman List Akun selesai.`
}

function deleteAccount(account) {
  // Ini hanya menghapus data contoh di localStorage, bukan akun sungguhan.
  if (!window.confirm(`Hapus akun contoh ${account.name} (${account.username})?`)) return
  accounts.value = accounts.value.filter(item => item.id !== account.id)
  saveAccounts()
  notice.value = `Akun contoh ${account.username} dihapus dari penyimpanan browser.`
}

function pendingMenu(event, title) {
  event.preventDefault()
  notice.value = `Halaman ${title} belum dipindahkan ke Vue.js.`
}
</script>

<template>
  <div class="admin-customers-page">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <a href="/">KAKAO</a>
        <p>SISTEM INFORMASI<br />PRODUSEN KAKAO</p>
      </div>
      <nav class="sidebar-menu" aria-label="Navigasi Admin">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/customers" class="active" aria-current="page">Pelanggan</a>
        <a href="/admin/products">Produk</a>
        <a href="/admin/orders">Pesanan</a>
        <a href="/admin/payments">Pembayaran</a>
        <a href="/admin/shipping">Pengiriman</a>
      </nav>
    </aside>

    <header class="topbar">
      <div>
        <p class="topbar-label">ADMIN AREA</p>
        <h1>Akun</h1>
      </div>
      <div class="admin-info"><strong>Admin KAKAO</strong><span>Akun</span></div>
    </header>

    <main class="main-content">
      <section class="stats" aria-label="Statistik akun">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <p>{{ stat.label }}</p>
          <h3>{{ stat.value }}</h3>
        </div>
      </section>

      <section class="table-card">
        <div class="page-heading">
          <div>
            <h2>Akun</h2>
            <div class="breadcrumb"><span>Admin</span><span>›</span><strong>Akun</strong></div>
          </div>
        </div>

        <p v-if="notice" class="notice" role="status">{{ notice }}</p>
        <p v-if="errorMessage" class="notice error" role="alert">{{ errorMessage }}</p>

        <section class="toolbar" aria-label="Filter akun">
          <div class="filters">
            <label class="filter-label">Tampilkan
              <select v-model.number="itemsPerPage" aria-label="Jumlah baris per halaman">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </label>
            <select v-model="statusFilter" aria-label="Filter status akun">
              <option value="">Semua Status</option>
              <option value="active">Active</option>
              <option value="nonactive">Non Active</option>
            </select>
          </div>
          <div class="toolbar-actions">
            <label class="product-search"><span aria-hidden="true">⌕</span>
              <input v-model="search" type="search" placeholder="Search" aria-label="Cari akun" />
            </label>
            <a href="/admin/customers/form" class="add-button"
            style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">
            + Tambah Akun
           </a>
          </div>
        </section>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th v-for="column in [
                      { key: 'username', title: 'USERNAME' },
                      { key: 'name', title: 'NAMA LENGKAP' },
                      { key: 'email', title: 'EMAIL' },
                      { key: 'phone_number', title: 'NOMOR TELEPON' },
                    ]" :key="column.key">
                  <button type="button" class="sort-button" @click="changeSort(column.key)">
                    {{ column.title }} <span class="sort">{{ sortIndicator(column.key) }}</span>
                  </button>
                </th>
                <th>STATUS</th>
                <th class="action-cell">AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in pageAccounts" :key="account.id">
                <td class="account-name">{{ account.username }}</td>
                <td class="muted">{{ account.name }}</td>
                <td class="muted">{{ account.email }}</td>
                <td class="muted">{{ account.phone_number }}</td>
                <td><span :class="['status', account.status === 'active' ? 'active-status' : 'inactive-status']">
                  {{ account.status === 'active' ? 'Active' : 'Non Active' }}
                </span></td>
                <td class="action-cell">
                  <div class="row-actions">
                      <a
                        :href="`/admin/customers/form?id=${account.id}`"
                        class="action edit"
                      >
                        Edit
                      </a>
                    <button type="button" class="action delete" @click="deleteAccount(account)">Delete</button>
                  </div>
                </td>
              </tr>
              <tr v-if="pageAccounts.length === 0">
                <td class="empty-message" colspan="6">Tidak ada akun yang sesuai pencarian atau filter.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-footer">
          <span>Showing {{ startRow }} to {{ endRow }} of {{ sortedAccounts.length }} items</span>
          <div class="pagination" aria-label="Halaman tabel akun">
            <button type="button" aria-label="Halaman sebelumnya"
                    :disabled="currentPage === 1" @click="currentPage--">‹</button>
            <button v-for="page in pageNumbers" :key="page" type="button"
                    :class="{ 'current-page': currentPage === page }"
                    :aria-current="currentPage === page ? 'page' : undefined"
                    @click="currentPage = page">{{ page }}</button>
            <button type="button" aria-label="Halaman berikutnya"
                    :disabled="currentPage >= totalPages" @click="currentPage++">›</button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>
  </div>
</template>

<style scoped src="./AdminCustomersView.css"></style>
