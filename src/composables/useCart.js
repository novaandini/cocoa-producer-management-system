import { computed, ref } from 'vue'
import { publicProducts } from '../data/publicProducts.js'
import { publicBatches } from '../data/publicBatches.js'

const STORAGE_KEY = 'kakao.public.cart.v1'
const findProduct = id => publicProducts.find(product => product.id === id)
const findBatch = (productId, batchId) => publicBatches.find(batch => batch.productId === productId && batch.id === batchId && batch.passed)
const normalize = value => Number.isFinite(Number(value)) ? Math.max(0, Math.trunc(Number(value))) : 0

function sanitize(input) {
  if (!Array.isArray(input)) return []
  const merged = new Map()
  for (const row of input) {
    if (!row || typeof row !== 'object') continue
    const product = findProduct(row.productId)
    const batch = findBatch(row.productId, row.batchId)
    if (!product || !batch) continue
    const previous = merged.get(batch.id)?.quantity || 0
    const quantity = Math.min(batch.stock, previous + normalize(row.quantity))
    if (quantity > 0) merged.set(batch.id, { productId: product.id, batchId: batch.id, quantity })
  }
  return [...merged.values()]
}

function loadCart() {
  try { return sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) }
  catch { return [] }
}
const entries = ref(loadCart())
const storageError = ref(false)

function persist(next) {
  entries.value = sanitize(next)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.value))
    storageError.value = false
  } catch { storageError.value = true }
}

const items = computed(() => entries.value.map(row => {
  const product = findProduct(row.productId)
  const batch = findBatch(row.productId, row.batchId)
  return { ...row, product, batch, subtotal: product.price * row.quantity }
}))
const cartCount = computed(() => items.value.length)
const productCount = computed(() => new Set(items.value.map(item => item.productId)).size)
const totalWeight = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
const totalPrice = computed(() => items.value.reduce((total, item) => total + item.subtotal, 0))

function remainingStock(productId, batchId) {
  const batch = findBatch(productId, batchId)
  if (!batch) return 0
  const inCart = entries.value.find(row => row.productId === productId && row.batchId === batchId)?.quantity || 0
  return Math.max(0, batch.stock - inCart)
}

function addItem(productId, batchId, quantity) {
  const requested = normalize(quantity)
  if (!requested || !findProduct(productId) || requested > remainingStock(productId, batchId)) return false
  persist([...entries.value, { productId, batchId, quantity: requested }])
  return true
}

function updateQuantity(productId, batchId, quantity) {
  const batch = findBatch(productId, batchId)
  if (!batch) return
  persist(entries.value.map(row => row.productId === productId && row.batchId === batchId
    ? { ...row, quantity: Math.max(1, Math.min(batch.stock, normalize(quantity))) } : row))
}
function removeItem(productId, batchId) {
  persist(entries.value.filter(row => row.productId !== productId || row.batchId !== batchId))
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === null) entries.value = loadCart()
  })
  window.addEventListener('pageshow', () => { if (!storageError.value) entries.value = loadCart() })
}

export function useCart() {
  return { items, cartCount, productCount, totalWeight, totalPrice, storageError, remainingStock, addItem, updateQuantity, removeItem }
}
