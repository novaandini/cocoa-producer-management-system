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
  if (imageInput.value) imageInput.value.value = ''
  existingImageName.value = ''
  savedDemoId.value = null
  showMessage('')
  // Saat edit, Reset mengembalikan data tersimpan, bukan menjadikan produk kosong.
  if (isEditMode.value) loadProduct(productId)
}

function saveDemoProduct() {
  const products = readDemoProducts()
  const code = formData.product_code.trim()
  const duplicateCode = products.some(p =>
    String(p.product_code).toLowerCase() === code.toLowerCase() &&
    String(p.id) !== String(productId)
  )
  if (duplicateCode) throw new Error('Kode produk sudah digunakan oleh produk lain.')

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
  if (existingIndex >= 0) products[existingIndex] = product
  else products.push(product)

  // Hanya atribut produk disimpan sebagai demo; berkas gambar belum diunggah.
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
  if (selectedImage.value) payload.append('image', selectedImage.value)
  if (isEditMode.value) payload.append('_method', 'PUT')

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
  showMessage(isEditMode.value ? 'Memperbarui produk...' : 'Menambahkan produk...')
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
        result.message || (isEditMode.value
          ? 'Produk berhasil diperbarui.'
          : 'Produk berhasil ditambahkan.'),
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
  if (isEditMode.value) loadProduct(productId)
})
</script>

<template>
  <div class="admin-product-form-page">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <a href="/">KAKAO</a>
        <p>SISTEM INFORMASI<br>PRODUSEN KAKAO</p>
      </div>

      <nav class="sidebar-menu">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/customers">Pelanggan</a>
        <a href="/admin/products/form" class="active">Produk</a>
        <a href="/admin/orders">Pesanan</a>
        <a href="/admin/payments">Pembayaran</a>
        <a href="/admin/shipping">Pengiriman</a>
      </nav>
    </aside>

    <header class="topbar">
      <div>
        <p class="topbar-label">ADMIN AREA</p>
        <h1>{{ isEditMode ? 'Edit Produk' : 'Form' }}</h1>
      </div>
      <div class="admin-info">
        <strong>Admin KAKAO</strong>
        <span>Administrator</span>
      </div>
    </header>

    <main>
      <section class="form-card">
        <div class="page-heading">
          <div>
            <h1>{{ heading }}</h1>
            <div class="breadcrumb">
              <span>Admin</span><span>›</span><strong>Produk</strong>
            </div>
          </div>
        </div>

        <form id="form" class="form" @submit.prevent="submitForm" @reset.prevent="resetForm">
          <div class="input-text">
            <label for="product_code">Kode Produk</label>
            <input id="product_code" v-model="formData.product_code" type="text" name="product_code" required maxlength="60" />
          </div>

          <div class="input-text">
            <label for="product_name">Nama Produk</label>
            <input id="product_name" v-model="formData.product_name" type="text" name="product_name" required />
          </div>

          <div class="form-group">
            <label for="product_type">Tipe Produk</label>
            <select id="product_type" v-model="formData.product_type" name="product_type" required>
              <option value="">-- Pilih Tipe Produk --</option>
              <option value="fermented">Fermentasi</option>
              <option value="non_fermented">Non-Fermentasi</option>
            </select>
          </div>

          <div class="form-group">
            <label for="grade">Grade</label>
            <select id="grade" v-model="formData.grade" name="grade" required>
              <option value="">-- Pilih Grade --</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
            </select>
          </div>

          <div class="input-text">
            <label for="price_per_kg">Harga per KG</label>
            <input id="price_per_kg" v-model="formData.price_per_kg" type="number" name="price_per_kg" min="0.01" step="0.01" required />
          </div>

          <div class="input-file">
            <label for="image">Gambar</label>
            <input id="image" ref="imageInput" type="file" name="image" accept="image/*" @change="handleImageChange" />
            <p v-if="existingImageName" class="file-hint">Gambar sebelumnya: {{ existingImageName }}</p>
            <p class="file-hint">Demo frontend: berkas gambar belum diunggah ke server.</p>
          </div>

          <div class="form-group">
            <label for="description">Deskripsi</label>
            <textarea id="description" v-model="formData.description" name="description" rows="5" cols="30" placeholder="Tulis deskripsi di sini..."></textarea>
          </div>

          <div class="form-group">
            <label for="is_active">Status</label>
            <select id="is_active" v-model="formData.is_active" name="is_active" required>
              <option value="">-- Pilih Status --</option>
              <option value="1">Aktif</option>
              <option value="0">Tidak Aktif</option>
            </select>
          </div>

          <div class="form-buttons">
            <button type="submit" :disabled="busy">{{ busy ? 'Menyimpan...' : 'Submit' }}</button>
            <button type="reset" :disabled="busy">Reset</button>
          </div>
          <p v-if="message" id="storeMessage" class="form-message" :class="messageType" role="status">{{ message }}</p>
          <p v-if="USE_DEMO_DATA && savedDemoId && !isEditMode" class="demo-edit-link">
            <a :href="`/admin/products/form?id=${encodeURIComponent(savedDemoId)}`">Coba edit produk yang baru disimpan →</a>
          </p>
        </form>
      </section>
    </main>

    <footer>
      <p>© 2026 KAKAO</p>
      <p>Sistem Informasi Penjualan dan Pemesanan Kakao</p>
    </footer>
  </div>
</template>

<style scoped src="./AdminProductFormView.css"></style>
