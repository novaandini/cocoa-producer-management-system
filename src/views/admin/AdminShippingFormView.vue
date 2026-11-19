<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

// Sama persis dengan penyimpanan pada List Pengiriman Admin.
const STORAGE_KEY = 'kakao_demo_shipments'
const shipmentId = new URLSearchParams(window.location.search).get('id')
const isEditMode = computed(() => Boolean(shipmentId))
const pageTitle = computed(() => isEditMode.value ? 'Edit Pengiriman' : 'Tambah Pengiriman')

// Data contoh asli List Pengiriman dipakai jika form dibuka lebih dulu.
const seedShipments = [
    {
        id: "SHP001",
        order_id: "ORD001",
        customer_name: "Budi Santoso",
        origin: "Jembrana, Bali",
        destination: "Denpasar, Bali",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140001",
        shipping_cost: 25000,
        weight: 10,
        status: "delivered",
        shipped_date: "2026-10-01",
        estimated_delivery: "2026-10-03"
    },
    {
        id: "SHP002",
        order_id: "ORD002",
        customer_name: "Sari Dewi",
        origin: "Jembrana, Bali",
        destination: "Surabaya, Jawa Timur",
        courier: "JNE",
        service: "YES",
        tracking_number: "JNE202610140002",
        shipping_cost: 45000,
        weight: 15,
        status: "in_transit",
        shipped_date: "2026-10-12",
        estimated_delivery: "2026-10-14"
    },
    {
        id: "SHP003",
        order_id: "ORD003",
        customer_name: "Andi Pratama",
        origin: "Jembrana, Bali",
        destination: "Jakarta Selatan, DKI Jakarta",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140003",
        shipping_cost: 65000,
        weight: 20,
        status: "shipped",
        shipped_date: "2026-10-13",
        estimated_delivery: "2026-10-17"
    },
    {
        id: "SHP004",
        order_id: "ORD004",
        customer_name: "Made Adnyana",
        origin: "Jembrana, Bali",
        destination: "Bandung, Jawa Barat",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140004",
        shipping_cost: 55000,
        weight: 12,
        status: "processing",
        shipped_date: null,
        estimated_delivery: null
    },
    {
        id: "SHP005",
        order_id: "ORD005",
        customer_name: "Putri Maharani",
        origin: "Jembrana, Bali",
        destination: "Yogyakarta, DI Yogyakarta",
        courier: "JNE",
        service: "YES",
        tracking_number: "JNE202610140005",
        shipping_cost: 50000,
        weight: 8,
        status: "delivered",
        shipped_date: "2026-10-08",
        estimated_delivery: "2026-10-09"
    },
    {
        id: "SHP006",
        order_id: "ORD006",
        customer_name: "Agus Setiawan",
        origin: "Jembrana, Bali",
        destination: "Malang, Jawa Timur",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140006",
        shipping_cost: 40000,
        weight: 18,
        status: "in_transit",
        shipped_date: "2026-10-13",
        estimated_delivery: "2026-10-16"
    },
    {
        id: "SHP007",
        order_id: "ORD007",
        customer_name: "Dewi Lestari",
        origin: "Jembrana, Bali",
        destination: "Makassar, Sulawesi Selatan",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140007",
        shipping_cost: 85000,
        weight: 25,
        status: "shipped",
        shipped_date: "2026-10-12",
        estimated_delivery: "2026-10-18"
    },
    {
        id: "SHP008",
        order_id: "ORD008",
        customer_name: "Komang Wirawan",
        origin: "Jembrana, Bali",
        destination: "Gianyar, Bali",
        courier: "JNE",
        service: "JTR",
        tracking_number: "JNE202610140008",
        shipping_cost: 120000,
        weight: 100,
        status: "processing",
        shipped_date: null,
        estimated_delivery: null
    },
    {
        id: "SHP009",
        order_id: "ORD009",
        customer_name: "Rina Anggraini",
        origin: "Jembrana, Bali",
        destination: "Semarang, Jawa Tengah",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140009",
        shipping_cost: 60000,
        weight: 16,
        status: "cancelled",
        shipped_date: null,
        estimated_delivery: null
    },
    {
        id: "SHP010",
        order_id: "ORD010",
        customer_name: "Kadek Saputra",
        origin: "Jembrana, Bali",
        destination: "Denpasar, Bali",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140010",
        shipping_cost: 20000,
        weight: 5,
        status: "delivered",
        shipped_date: "2026-10-10",
        estimated_delivery: "2026-10-12"
    },
    {
        id: "SHP011",
        order_id: "ORD011",
        customer_name: "Yoga Permana",
        origin: "Jembrana, Bali",
        destination: "Tangerang, Banten",
        courier: "JNE",
        service: "YES",
        tracking_number: "JNE202610140011",
        shipping_cost: 70000,
        weight: 22,
        status: "in_transit",
        shipped_date: "2026-10-13",
        estimated_delivery: "2026-10-15"
    },
    {
        id: "SHP012",
        order_id: "ORD012",
        customer_name: "Budi Santoso",
        origin: "Jembrana, Bali",
        destination: "Denpasar, Bali",
        courier: "JNE",
        service: "REG",
        tracking_number: "JNE202610140012",
        shipping_cost: 30000,
        weight: 10,
        status: "pending",
        shipped_date: null,
        estimated_delivery: null
    }
]

function blankForm() {
  return {
    order_id: '', name: '', email: '', phone_number: '',
    tracking_number: '', status: '', shipped_date: '', estimated_delivery: ''
  }
}

const form = reactive(blankForm())
const originalForm = ref(blankForm())
const existingShipment = ref(null)
const error = ref('')
const saving = ref(false)

function readShipments() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) {
    // Inisialisasi dengan 12 data yang juga ditampilkan pada List Pengiriman.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedShipments))
    return JSON.parse(JSON.stringify(seedShipments))
  }
  const data = JSON.parse(raw)
  if (!Array.isArray(data)) throw new Error('Data pengiriman lokal tidak valid.')
  return data
}

function loadShipment(shipment) {
  form.order_id = shipment.order_id ?? ''
  form.name = shipment.customer_name ?? shipment.name ?? ''
  form.email = shipment.email ?? ''
  form.phone_number = shipment.phone_number ?? ''
  form.tracking_number = shipment.tracking_number ?? ''
  form.status = shipment.status ?? ''
  form.shipped_date = shipment.shipped_date ?? ''
  form.estimated_delivery = shipment.estimated_delivery ?? ''
  originalForm.value = { ...form }
}

onMounted(() => {
  if (!isEditMode.value) return
  try {
    const shipment = readShipments().find(item => String(item.id) === String(shipmentId))
    if (!shipment) {
      error.value = 'Data pengiriman untuk diedit tidak ditemukan. Kembali ke Daftar Pengiriman.'
      return
    }
    existingShipment.value = shipment
    loadShipment(shipment)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Data tidak dapat dibaca.'
  }
})

function resetForm() {
  Object.assign(form, isEditMode.value ? originalForm.value : blankForm())
  if (!isEditMode.value || existingShipment.value) error.value = ''
}

function nextShipmentId(records) {
  const max = records.reduce((previous, item) => {
    const match = /^SHP(\d+)$/.exec(String(item.id ?? ''))
    return match ? Math.max(previous, Number(match[1])) : previous
  }, 0)
  return `SHP${String(max + 1).padStart(3, '0')}`
}

function saveShipment() {
  if (saving.value) return
  error.value = ''

  if (isEditMode.value && !existingShipment.value) {
    error.value = 'Data pengiriman yang ingin diedit tidak ditemukan.'
    return
  }

  const fields = {
    order_id: form.order_id.trim(),
    customer_name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    phone_number: form.phone_number.trim(),
    tracking_number: form.tracking_number.trim(),
    status: form.status,
    shipped_date: form.shipped_date || null,
    estimated_delivery: form.estimated_delivery || null
  }

  if (!fields.order_id || !fields.customer_name || !fields.email ||
      !fields.phone_number || !fields.tracking_number || !fields.status) {
    error.value = 'Lengkapi semua informasi pemesan, nomor pelacakan, dan status pengiriman.'
    return
  }
  if (fields.shipped_date && fields.estimated_delivery &&
      fields.estimated_delivery < fields.shipped_date) {
    error.value = 'Estimasi selesai tidak boleh lebih awal dari tanggal pengiriman.'
    return
  }

  saving.value = true
  try {
    const shipments = readShipments()
    const duplicateTracking = shipments.some(shipment =>
      String(shipment.id) !== String(shipmentId) &&
      String(shipment.tracking_number ?? '').trim().toLowerCase() ===
        fields.tracking_number.toLowerCase()
    )
    if (duplicateTracking) throw new Error('Nomor pelacakan sudah digunakan untuk pengiriman lain.')

    if (isEditMode.value) {
      const index = shipments.findIndex(item => String(item.id) === String(shipmentId))
      if (index === -1) throw new Error('Data pengiriman sudah tidak ditemukan.')
      // Pertahankan atribut pengiriman lain dari List (asal, tujuan, kurir, biaya, berat).
      shipments[index] = { ...shipments[index], ...fields }
    } else {
      shipments.push({
        id: nextShipmentId(shipments), ...fields,
        origin: '', destination: '', courier: '', service: '',
        shipping_cost: null, weight: null
      })
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments))
    window.location.href = '/admin/shipping'
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Gagal menyimpan pengiriman.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="admin-shipping-form-page">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <a href="/">KAKAO</a>
        <p>SISTEM INFORMASI<br />PRODUSEN KAKAO</p>
      </div>
      <nav class="sidebar-menu" aria-label="Navigasi Admin">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/customers">Pelanggan</a>
        <a href="/admin/products">Produk</a>
        <a href="/admin/orders">Pesanan</a>
        <a href="/admin/payments">Pembayaran</a>
        <a href="/admin/shipping" class="active" aria-current="page">Pengiriman</a>
      </nav>
    </aside>

    <header class="topbar">
      <div>
        <p class="topbar-label">ADMIN AREA</p>
        <h1>{{ isEditMode ? 'Edit Pengiriman' : 'Form' }}</h1>
      </div>
      <div class="admin-info">
        <strong>Admin KAKAO</strong>
        <span>Administrator</span>
      </div>
    </header>

    <main class="form-main">
      <section class="form-card">
        <div class="page-heading">
          <div>
            <h2>{{ pageTitle }}</h2>
            <div class="breadcrumb"><span>Admin</span><span>›</span><strong>Pengiriman</strong></div>
          </div>
          <a href="/admin/shipping" class="back-link">← Kembali ke Daftar</a>
        </div>

        <p class="demo-note">Mode demo frontend — data disimpan di browser, belum terhubung ke Laravel.</p>
        <p v-if="error" class="form-message error" role="alert">{{ error }}</p>

        <form id="shippingForm" class="form" @submit.prevent="saveShipment" @reset.prevent="resetForm">
          <div class="form-group">
            <label for="order_id">ID Pemesanan</label>
            <input id="order_id" v-model="form.order_id" type="text" name="order_id" placeholder="Contoh: ORD013" required />
          </div>

          <div class="input-text">
            <label for="name">Nama Pemesan</label>
            <input id="name" v-model="form.name" type="text" name="name" placeholder="Nama lengkap" required />
          </div>

          <div class="input-text">
            <label for="email">Email Pemesan</label>
            <input id="email" v-model="form.email" type="email" name="email" placeholder="nama@email.com" required />
          </div>

          <div class="input-text">
            <label for="phone_number">Nomor Telepon Pemesan</label>
            <input id="phone_number" v-model="form.phone_number" type="tel" name="phone_number" placeholder="08xxxxxxxxxx" required />
          </div>

          <div class="input-text">
            <label for="tracking_number">Nomor Pelacakan</label>
            <input id="tracking_number" v-model="form.tracking_number" type="text" name="tracking_number" placeholder="Nomor resi pengiriman" required />
          </div>

          <div class="form-group">
            <label for="shipping_status">Status Pengiriman</label>
            <select id="shipping_status" v-model="form.status" name="status" required>
              <option value="" disabled>-- Pilih Status Pengiriman --</option>
              <option value="pending">Menunggu</option>
              <option value="processing">Proses Pengemasan</option>
              <option value="shipped">Diserahkan ke Kurir</option>
              <option value="in_transit">Dalam Transit</option>
              <option value="delivered">Terkirim ke Pelanggan</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>

          <div class="input-date">
            <label for="shipped_date">Tanggal Pengiriman</label>
            <input id="shipped_date" v-model="form.shipped_date" type="date" name="shipped_date" />
          </div>

          <div class="input-date">
            <label for="estimated_delivery">Estimasi Selesai</label>
            <input id="estimated_delivery" v-model="form.estimated_delivery" type="date" name="estimated_delivery" />
          </div>

          <div class="form-buttons">
            <button type="submit" :disabled="saving || (isEditMode && !existingShipment)">
              {{ saving ? 'Menyimpan...' : 'Submit' }}
            </button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </section>
    </main>

    <footer>
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>
  </div>
</template>

<style scoped src="./AdminShippingFormView.css"></style>
