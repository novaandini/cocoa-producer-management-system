
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

const STORAGE_KEY = 'kakao_demo_shipments'
const shipmentId = new URLSearchParams(window.location.search).get('id')
const isEditMode = computed(() => Boolean(shipmentId))
const pageTitle = computed(() =>
  isEditMode.value ? 'Edit Pengiriman' : 'Tambah Pengiriman'
)

const seedShipments = [
  {
    id: 'SHP001',
    order_id: 'ORD001',
    customer_name: 'Budi Santoso',
    origin: 'Jembrana, Bali',
    destination: 'Denpasar, Bali',
    courier: 'JNE',
    service: 'REG',
    tracking_number: 'JNE202610140001',
    shipping_cost: 25000,
    weight: 10,
    status: 'delivered',
    shipped_date: '2026-10-01',
    estimated_delivery: '2026-10-03'
  },
  {
    id: 'SHP002',
    order_id: 'ORD002',
    customer_name: 'Sari Dewi',
    origin: 'Jembrana, Bali',
    destination: 'Surabaya, Jawa Timur',
    courier: 'JNE',
    service: 'YES',
    tracking_number: 'JNE202610140002',
    shipping_cost: 45000,
    weight: 15,
    status: 'in_transit',
    shipped_date: '2026-10-12',
    estimated_delivery: '2026-10-14'
  },
  {
    id: 'SHP003',
    order_id: 'ORD003',
    customer_name: 'Andi Pratama',
    origin: 'Jembrana, Bali',
    destination: 'Jakarta Selatan, DKI Jakarta',
    courier: 'JNE',
    service: 'REG',
    tracking_number: 'JNE202610140003',
    shipping_cost: 65000,
    weight: 20,
    status: 'shipped',
    shipped_date: '2026-10-13',
    estimated_delivery: '2026-10-17'
  },
  {
    id: 'SHP004',
    order_id: 'ORD004',
    customer_name: 'Made Adnyana',
    origin: 'Jembrana, Bali',
    destination: 'Bandung, Jawa Barat',
    courier: 'JNE',
    service: 'REG',
    tracking_number: 'JNE202610140004',
    shipping_cost: 55000,
    weight: 12,
    status: 'processing',
    shipped_date: null,
    estimated_delivery: null
  },
  {
    id: 'SHP005',
    order_id: 'ORD005',
    customer_name: 'Putri Maharani',
    origin: 'Jembrana, Bali',
    destination: 'Yogyakarta, DI Yogyakarta',
    courier: 'JNE',
    service: 'YES',
    tracking_number: 'JNE202610140005',
    shipping_cost: 50000,
    weight: 8,
    status: 'delivered',
    shipped_date: '2026-10-08',
    estimated_delivery: '2026-10-09'
  },
  {
    id: 'SHP006',
    order_id: 'ORD006',
    customer_name: 'Agus Setiawan',
    origin: 'Jembrana, Bali',
    destination: 'Malang, Jawa Timur',
    courier: 'JNE',
    service: 'REG',
    tracking_number: 'JNE202610140006',
    shipping_cost: 40000,
    weight: 18,
    status: 'in_transit',
    shipped_date: '2026-10-13',
    estimated_delivery: '2026-10-16'
  },
  {
    id: 'SHP007',
    order_id: 'ORD007',
    customer_name: 'Dewi Lestari',
    origin: 'Jembrana, Bali',
    destination: 'Makassar, Sulawesi Selatan',
    courier: 'JNE',
    service: 'REG',
    tracking_number: 'JNE202610140007',
    shipping_cost: 85000,
    weight: 25,
    status: 'shipped',
    shipped_date: '2026-10-12',
    estimated_delivery: '2026-10-18'
  },
  {
    id: 'SHP008',
    order_id: 'ORD008',
    customer_name: 'Komang Wirawan',
    origin: 'Jembrana, Bali',
    destination: 'Gianyar, Bali',
    courier: 'JNE',
    service: 'JTR',
    tracking_number: 'JNE202610140008',
    shipping_cost: 120000,
    weight: 100,
    status: 'processing',
    shipped_date: null,
    estimated_delivery: null
  },
  {
    id: 'SHP009',
    order_id: 'ORD009',
    customer_name: 'Rina Anggraini',
    origin: 'Jembrana, Bali',
    destination: 'Semarang, Jawa Tengah',
    courier: 'JNE',
    service: 'REG',
    tracking_number: 'JNE202610140009',
    shipping_cost: 60000,
    weight: 16,
    status: 'cancelled',
    shipped_date: null,
    estimated_delivery: null
  },
  {
    id: 'SHP010',
    order_id: 'ORD010',
    customer_name: 'Kadek Saputra',
    origin: 'Jembrana, Bali',
    destination: 'Denpasar, Bali',
    courier: 'JNE',
    service: 'REG',
    tracking_number: 'JNE202610140010',
    shipping_cost: 20000,
    weight: 5,
    status: 'delivered',
    shipped_date: '2026-10-10',
    estimated_delivery: '2026-10-12'
  },
  {
    id: 'SHP011',
    order_id: 'ORD011',
    customer_name: 'Yoga Permana',
    origin: 'Jembrana, Bali',
    destination: 'Tangerang, Banten',
    courier: 'JNE',
    service: 'YES',
    tracking_number: 'JNE202610140011',
    shipping_cost: 70000,
    weight: 22,
    status: 'in_transit',
    shipped_date: '2026-10-13',
    estimated_delivery: '2026-10-15'
  },
  {
    id: 'SHP012',
    order_id: 'ORD012',
    customer_name: 'Budi Santoso',
    origin: 'Jembrana, Bali',
    destination: 'Denpasar, Bali',
    courier: 'JNE',
    service: 'REG',
    tracking_number: 'JNE202610140012',
    shipping_cost: 30000,
    weight: 10,
    status: 'pending',
    shipped_date: null,
    estimated_delivery: null
  }
]

function blankForm() {
  return {
    order_id: '',
    name: '',
    email: '',
    phone_number: '',
    tracking_number: '',
    status: '',
    shipped_date: '',
    estimated_delivery: ''
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
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(seedShipments)
    )

    return JSON.parse(JSON.stringify(seedShipments))
  }

  const data = JSON.parse(raw)

  if (!Array.isArray(data)) {
    throw new Error('Data pengiriman lokal tidak valid.')
  }

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
    const shipment = readShipments().find(
      item => String(item.id) === String(shipmentId)
    )

    if (!shipment) {
      error.value =
        'Data pengiriman untuk diedit tidak ditemukan. Kembali ke Daftar Pengiriman.'
      return
    }

    existingShipment.value = shipment
    loadShipment(shipment)
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : 'Data tidak dapat dibaca.'
  }
})

function resetForm() {
  Object.assign(
    form,
    isEditMode.value ? originalForm.value : blankForm()
  )

  if (!isEditMode.value || existingShipment.value) {
    error.value = ''
  }
}

function nextShipmentId(records) {
  const max = records.reduce((previous, item) => {
    const match = /^SHP(\d+)$/.exec(String(item.id ?? ''))

    return match
      ? Math.max(previous, Number(match[1]))
      : previous
  }, 0)

  return `SHP${String(max + 1).padStart(3, '0')}`
}

function saveShipment() {
  if (saving.value) return

  error.value = ''

  if (isEditMode.value && !existingShipment.value) {
    error.value =
      'Data pengiriman yang ingin diedit tidak ditemukan.'
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

  if (
    !fields.order_id ||
    !fields.customer_name ||
    !fields.email ||
    !fields.phone_number ||
    !fields.tracking_number ||
    !fields.status
  ) {
    error.value =
      'Lengkapi semua informasi pemesan, nomor pelacakan, dan status pengiriman.'
    return
  }

  if (
    fields.shipped_date &&
    fields.estimated_delivery &&
    fields.estimated_delivery < fields.shipped_date
  ) {
    error.value =
      'Estimasi selesai tidak boleh lebih awal dari tanggal pengiriman.'
    return
  }

  saving.value = true

  try {
    const shipments = readShipments()

    const duplicateTracking = shipments.some(shipment =>
      String(shipment.id) !== String(shipmentId) &&
      String(shipment.tracking_number ?? '')
        .trim()
        .toLowerCase() === fields.tracking_number.toLowerCase()
    )

    if (duplicateTracking) {
      throw new Error(
        'Nomor pelacakan sudah digunakan untuk pengiriman lain.'
      )
    }

    if (isEditMode.value) {
      const index = shipments.findIndex(
        item => String(item.id) === String(shipmentId)
      )

      if (index === -1) {
        throw new Error('Data pengiriman sudah tidak ditemukan.')
      }

      shipments[index] = {
        ...shipments[index],
        ...fields
      }
    } else {
      shipments.push({
        id: nextShipmentId(shipments),
        ...fields,
        origin: '',
        destination: '',
        courier: '',
        service: '',
        shipping_cost: null,
        weight: null
      })
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(shipments)
    )

    window.location.href = '/admin/shipping'
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : 'Gagal menyimpan pengiriman.'
  } finally {
    saving.value = false
  }
}
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
          class="block rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
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
          class="block rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold text-white"
          aria-current="page"
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

    <!-- Main area -->
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
            {{ isEditMode ? 'Edit Pengiriman' : 'Form' }}
          </h1>
        </div>

        <div class="text-right">
          <p class="text-sm font-semibold text-gray-800">
            Admin KAKAO
          </p>

          <p class="mt-1 text-xs text-gray-500">
            Administrator
          </p>
        </div>
      </header>

      <!-- Form content -->
      <main class="mx-auto max-w-5xl px-4 py-8 sm:px-8">

        <section
          class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >

          <!-- Heading -->
          <div
            class="flex flex-col gap-5 border-b border-gray-100 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <div>
              <h2 class="text-xl font-bold text-[#173f35]">
                {{ pageTitle }}
              </h2>

              <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span>Admin</span>
                <span>›</span>
                <a
                  href="/admin/shipping"
                  class="hover:text-[#173f35]"
                >
                  Pengiriman
                </a>
                <span>›</span>
                <span class="text-gray-700">
                  {{ isEditMode ? 'Edit' : 'Tambah' }}
                </span>
              </div>
            </div>

            <a
              href="/admin/shipping"
              class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              ← Kembali ke Daftar
            </a>
          </div>

          <div class="px-5 py-6 sm:px-8">

            <!-- Demo information -->
            <div
              class="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
            >
              Mode demo frontend — data disimpan di browser,
              belum terhubung ke Laravel.
            </div>

            <!-- Error message -->
            <div
              v-if="error"
              class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              role="alert"
            >
              {{ error }}
            </div>

            <form
              id="shippingForm"
              class="space-y-6"
              @submit.prevent="saveShipment"
              @reset.prevent="resetForm"
            >

              <!-- Order ID -->
              <div>
                <label
                  for="order_id"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  ID Pemesanan
                </label>

                <input
                  id="order_id"
                  v-model="form.order_id"
                  type="text"
                  name="order_id"
                  placeholder="Contoh: ORD013"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                />
              </div>

              <!-- Customer name -->
              <div>
                <label
                  for="name"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Nama Pemesan
                </label>

                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="Nama lengkap"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                />
              </div>

              <!-- Customer email -->
              <div>
                <label
                  for="email"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Pemesan
                </label>

                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="nama@email.com"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                />
              </div>

              <!-- Phone number -->
              <div>
                <label
                  for="phone_number"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Nomor Telepon Pemesan
                </label>

                <input
                  id="phone_number"
                  v-model="form.phone_number"
                  type="tel"
                  name="phone_number"
                  placeholder="08xxxxxxxxxx"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                />
              </div>

              <!-- Tracking number -->
              <div>
                <label
                  for="tracking_number"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Nomor Pelacakan
                </label>

                <input
                  id="tracking_number"
                  v-model="form.tracking_number"
                  type="text"
                  name="tracking_number"
                  placeholder="Nomor resi pengiriman"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                />
              </div>

              <!-- Shipping status -->
              <div>
                <label
                  for="shipping_status"
                  class="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Status Pengiriman
                </label>

                <select
                  id="shipping_status"
                  v-model="form.status"
                  name="status"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                >
                  <option value="" disabled>
                    -- Pilih Status Pengiriman --
                  </option>

                  <option value="pending">
                    Menunggu
                  </option>

                  <option value="processing">
                    Proses Pengemasan
                  </option>

                  <option value="shipped">
                    Diserahkan ke Kurir
                  </option>

                  <option value="in_transit">
                    Dalam Transit
                  </option>

                  <option value="delivered">
                    Terkirim ke Pelanggan
                  </option>

                  <option value="cancelled">
                    Dibatalkan
                  </option>
                </select>
              </div>

              <!-- Dates -->
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div>
                  <label
                    for="shipped_date"
                    class="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Tanggal Pengiriman
                  </label>

                  <input
                    id="shipped_date"
                    v-model="form.shipped_date"
                    type="date"
                    name="shipped_date"
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                  />
                </div>

                <div>
                  <label
                    for="estimated_delivery"
                    class="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Estimasi Selesai
                  </label>

                  <input
                    id="estimated_delivery"
                    v-model="form.estimated_delivery"
                    type="date"
                    name="estimated_delivery"
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#386b50] focus:ring-2 focus:ring-[#386b50]/20"
                  />
                </div>

              </div>

              <!-- Buttons -->
              <div
                class="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end"
              >
                <button
                  type="reset"
                  class="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  :disabled="saving || (isEditMode && !existingShipment)"
                  class="rounded-lg bg-[#386b50] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#28533d] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {{ saving ? 'Menyimpan...' : 'Submit' }}
                </button>
              </div>

            </form>
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
