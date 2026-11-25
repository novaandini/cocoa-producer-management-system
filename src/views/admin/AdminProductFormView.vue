
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'

// Mode frontend sementara. Ubah ke false saat Laravel dan API sudah siap.
const USE_DEMO_DATA = true
const API_URL = 'http://127.0.0.1:8000/api/products'
const DEMO_STORAGE_KEY = 'kakao_demo_products'

const productId = new URLSearchParams(window.location.search).get('id')
const isEditMode = computed(() => Boolean(productId))
const heading = computed(() => isEditMode.value ? 'Edit Produk' : 'Produk')

const emptyProduct = () => ({
  product_code: '',
  product_name: '',
  product_type: '',
  grade: '',
  price_per_kg: '',
  description: '',
  is_active: ''
})

const formData = reactive(emptyProduct())
const selectedImage = ref(null)
const imageInput = ref(null)
const existingImageName = ref('')
const busy = ref(false)
const message = ref('')
const messageType = ref('')
const savedDemoId = ref(null)

function showMessage(text, type = '') {
  message.value = text
  messageType.value = type
}

function informPending(name) {
  window.alert(`Halaman Admin ${name} belum dipindahkan ke Vue.js.`)
}

function readDemoProducts() {
  const raw = localStorage.getItem(DEMO_STORAGE_KEY)
  if (!raw) return []
  const data = JSON.parse(raw)
  return Array.isArray(data) ? data : []
}

function fillForm(product) {
  formData.product_code = product.product_code ?? ''
  formData.product_name = product.product_name ?? ''
  formData.product_type = product.product_type ?? ''
  formData.grade = product.grade ?? ''
  formData.price_per_kg = product.price_per_kg ?? ''
  formData.description = product.description ?? ''
  formData.is_active =
    product.is_active === true || String(product.is_active) === '1' ? '1' : '0'
  existingImageName.value = product.image_name || ''
}

async function loadProduct(id) {
  busy.value = true
  try {
    let product

    if (USE_DEMO_DATA) {
      product = readDemoProducts().find(p => String(p.id) === String(id))
      if (!product) throw new Error(`Produk demo dengan ID ${id} belum ditemukan.`)
    } else {
      const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`
        }
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Gagal mengambil data produk.')
      }

      product = result.data || result
    }

    fillForm(product)
  } catch (error) {
    showMessage(error.message || 'Gagal mengambil data produk.', 'error')
  } finally {
    busy.value = false
  }
}

function handleImageChange(event) {
  const file = event.target.files?.[0] || null

  if (file && !file.type.startsWith('image/')) {
    event.target.value = ''
    selectedImage.value = null
    showMessage('Pilih file gambar yang valid.', 'error')
    return
  }

  selectedImage.value = file

  if (messageType.value === 'error') showMessage('')
}

function resetForm() {
  Object.assign(formData, emptyProduct())
  selectedImage.value = null

  if (imageInput.value) {
    imageInput.value.value = ''
  }

  existingImageName.value = ''
  savedDemoId.value = null
  showMessage('')

  // Saat edit, Reset mengembalikan data tersimpan.
  if (isEditMode.value) loadProduct(productId)
}

function saveDemoProduct() {
  const products = readDemoProducts()
  const code = formData.product_code.trim()

  const duplicateCode = products.some(p =>
    String(p.product_code).toLowerCase() === code.toLowerCase() &&
    String(p.id) !== String(productId)
  )

  if (duplicateCode) {
    throw new Error('Kode produk sudah digunakan oleh produk lain.')
  }

  const existingIndex = isEditMode.value
    ? products.findIndex(p => String(p.id) === String(productId))
    : -1

  if (isEditMode.value && existingIndex === -1) {
    throw new Error('Produk yang akan diedit tidak ditemukan dalam data demo.')
  }

  const id = isEditMode.value ? productId : `demo-${Date.now()}`
  const previous = existingIndex >= 0 ? products[existingIndex] : {}

  const product = {
    ...previous,
    id,
    product_code: code,
    product_name: formData.product_name.trim(),
    product_type: formData.product_type,
    grade: formData.grade,
    price_per_kg: Number(formData.price_per_kg),
    description: formData.description.trim(),
    is_active: formData.is_active === '1' ? 1 : 0,
    image_name: selectedImage.value?.name || previous.image_name || null,
    updated_at: new Date().toISOString()
  }

  if (existingIndex >= 0) {
    products[existingIndex] = product
  } else {
    products.push(product)
  }

  // Berkas gambar belum diunggah pada mode demo.
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(products))

  return id
}

async function saveToLaravel() {
  const payload = new FormData()

  payload.append('product_code', formData.product_code.trim())
  payload.append('product_name', formData.product_name.trim())
  payload.append('product_type', formData.product_type)
  payload.append('grade', formData.grade)
  payload.append('price_per_kg', String(formData.price_per_kg))
  payload.append('description', formData.description.trim())
  payload.append('is_active', formData.is_active)

  if (selectedImage.value) {
    payload.append('image', selectedImage.value)
  }

  if (isEditMode.value) {
    payload.append('_method', 'PUT')
  }

  const url = isEditMode.value
    ? `${API_URL}/${encodeURIComponent(productId)}`
    : API_URL

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`
    },
    body: payload
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    const details = result.errors
      ? Object.values(result.errors).flat().join(' ')
      : ''

    throw new Error(details || result.message || 'Operasi produk gagal.')
  }

  return result
}

async function submitForm() {
  if (busy.value) return

  if (Number(formData.price_per_kg) <= 0) {
    showMessage('Harga per KG harus lebih dari 0.', 'error')
    return
  }

  busy.value = true

  showMessage(
    isEditMode.value
      ? 'Memperbarui produk...'
      : 'Menambahkan produk...'
  )

  try {
    if (USE_DEMO_DATA) {
      savedDemoId.value = saveDemoProduct()

      showMessage(
        isEditMode.value
          ? 'Produk berhasil diperbarui pada data demo di browser.'
          : 'Produk berhasil ditambahkan ke data demo di browser.',
        'success'
      )
    } else {
      const result = await saveToLaravel()

      showMessage(
        result.message || (
          isEditMode.value
            ? 'Produk berhasil diperbarui.'
            : 'Produk berhasil ditambahkan.'
        ),
        'success'
      )
    }
  } catch (error) {
    showMessage(error.message || 'Gagal menyimpan produk.', 'error')
  } finally {
    busy.value = false
  }
}

onMounted(() => {
  if (isEditMode.value) {
    loadProduct(productId)
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f7f5] text-gray-800">

    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#173f35] text-white md:flex">
      <div class="border-b border-white/10 px-7 py-6">
        <a href="/" class="text-2xl font-bold tracking-wide">
          KAKAO
        </a>
        <p class="mt-2 text-xs leading-5 tracking-wide text-white/70">
          SISTEM INFORMASI<br />
          PRODUSEN KAKAO
        </p>
      </div>

      <nav class="flex-1 space-y-2 px-4 py-6">
        <a
          href="/admin/dashboard"
          class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Dashboard
        </a>

        <a
          href="/admin/customers"
          class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Pelanggan
        </a>

        <a
          href="/admin/products/form"
          class="block rounded-lg bg-[#d5a85b] px-4 py-3 text-sm font-semibold text-[#173f35]"
        >
          Produk
        </a>

        <a
          href="/admin/orders"
          class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Pesanan
        </a>

        <a
          href="/admin/payments"
          class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Pembayaran
        </a>

        <a
          href="/admin/shipping"
          class="block rounded-lg px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Pengiriman
        </a>
      </nav>
    </aside>

    <!-- Main area -->
    <div class="md:ml-64">

      <!-- Topbar -->
      <header class="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-8">
        <div>
          <p class="text-xs font-semibold tracking-widest text-gray-400">
            ADMIN AREA
          </p>
          <h1 class="mt-1 text-xl font-semibold text-gray-800">
            {{ isEditMode ? 'Edit Produk' : 'Form' }}
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

      <!-- Content -->
      <main class="px-4 py-6 sm:px-8 sm:py-8">
        <section class="mx-auto max-w-5xl">

          <!-- Page heading -->
          <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-800">
                {{ heading }}
              </h1>

              <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span>Admin</span>
                <span class="text-gray-300">›</span>
                <strong class="font-medium text-[#28634f]">Produk</strong>
              </div>
            </div>
          </div>

          <!-- Form card -->
          <div class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

            <form
              id="form"
              class="space-y-6"
              @submit.prevent="submitForm"
              @reset.prevent="resetForm"
            >

              <!-- Kode Produk -->
              <div>
                <label
                  for="product_code"
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Kode Produk
                </label>

                <input
                  id="product_code"
                  v-model="formData.product_code"
                  type="text"
                  name="product_code"
                  required
                  maxlength="60"
                  placeholder="Masukkan kode produk"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#28634f] focus:ring-2 focus:ring-[#28634f]/10"
                />
              </div>

              <!-- Nama Produk -->
              <div>
                <label
                  for="product_name"
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nama Produk
                </label>

                <input
                  id="product_name"
                  v-model="formData.product_name"
                  type="text"
                  name="product_name"
                  required
                  placeholder="Masukkan nama produk"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#28634f] focus:ring-2 focus:ring-[#28634f]/10"
                />
              </div>

              <!-- Tipe Produk dan Grade -->
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div>
                  <label
                    for="product_type"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Tipe Produk
                  </label>

                  <select
                    id="product_type"
                    v-model="formData.product_type"
                    name="product_type"
                    required
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#28634f] focus:ring-2 focus:ring-[#28634f]/10"
                  >
                    <option value="">-- Pilih Tipe Produk --</option>
                    <option value="fermented">Fermentasi</option>
                    <option value="non_fermented">Non-Fermentasi</option>
                  </select>
                </div>

                <div>
                  <label
                    for="grade"
                    class="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Grade
                  </label>

                  <select
                    id="grade"
                    v-model="formData.grade"
                    name="grade"
                    required
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#28634f] focus:ring-2 focus:ring-[#28634f]/10"
                  >
                    <option value="">-- Pilih Grade --</option>
                    <option value="A">Grade A</option>
                    <option value="B">Grade B</option>
                    <option value="C">Grade C</option>
                  </select>
                </div>
              </div>

              <!-- Harga -->
              <div>
                <label
                  for="price_per_kg"
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Harga per KG
                </label>

                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    Rp
                  </span>

                  <input
                    id="price_per_kg"
                    v-model="formData.price_per_kg"
                    type="number"
                    name="price_per_kg"
                    min="0.01"
                    step="0.01"
                    required
                    placeholder="0"
                    class="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#28634f] focus:ring-2 focus:ring-[#28634f]/10"
                  />
                </div>
              </div>

              <!-- Gambar -->
              <div>
                <label
                  for="image"
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Gambar
                </label>

                <input
                  id="image"
                  ref="imageInput"
                  type="file"
                  name="image"
                  accept="image/*"
                  @change="handleImageChange"
                  class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-[#edf3ef] file:px-4 file:py-3 file:font-medium file:text-[#28634f] hover:file:bg-[#e0ebe4]"
                />

                <p
                  v-if="existingImageName"
                  class="mt-2 text-xs text-gray-500"
                >
                  Gambar sebelumnya: {{ existingImageName }}
                </p>

                <p class="mt-2 text-xs text-amber-600">
                  Demo frontend: berkas gambar belum diunggah ke server.
                </p>
              </div>

              <!-- Deskripsi -->
              <div>
                <label
                  for="description"
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Deskripsi
                </label>

                <textarea
                  id="description"
                  v-model="formData.description"
                  name="description"
                  rows="5"
                  placeholder="Tulis deskripsi di sini..."
                  class="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#28634f] focus:ring-2 focus:ring-[#28634f]/10"
                ></textarea>
              </div>

              <!-- Status -->
              <div>
                <label
                  for="is_active"
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Status
                </label>

                <select
                  id="is_active"
                  v-model="formData.is_active"
                  name="is_active"
                  required
                  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#28634f] focus:ring-2 focus:ring-[#28634f]/10"
                >
                  <option value="">-- Pilih Status --</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
              </div>

              <!-- Buttons -->
              <div class="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="reset"
                  :disabled="busy"
                  class="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  :disabled="busy"
                  class="rounded-lg bg-[#28634f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4d3c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {{ busy ? 'Menyimpan...' : 'Submit' }}
                </button>
              </div>

              <!-- Message -->
              <div
                v-if="message"
                id="storeMessage"
                role="status"
                class="rounded-lg border px-4 py-3 text-sm"
                :class="{
                  'border-green-200 bg-green-50 text-green-700': messageType === 'success',
                  'border-red-200 bg-red-50 text-red-700': messageType === 'error',
                  'border-gray-200 bg-gray-50 text-gray-600': !messageType
                }"
              >
                {{ message }}
              </div>

              <!-- Demo edit link -->
              <div
                v-if="USE_DEMO_DATA && savedDemoId && !isEditMode"
                class="rounded-lg bg-[#edf3ef] px-4 py-3 text-sm"
              >
                <a
                  :href="`/admin/products/form?id=${encodeURIComponent(savedDemoId)}`"
                  class="font-medium text-[#28634f] hover:underline"
                >
                  Coba edit produk yang baru disimpan →
                </a>
              </div>

            </form>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="mt-8 border-t border-gray-200 bg-white px-5 py-5 sm:px-8">
        <div class="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 KAKAO</p>
          <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
        </div>
      </footer>

    </div>
  </div>
</template>
