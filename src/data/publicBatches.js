import { publicProducts } from './publicProducts.js'

// Dataset demonstrasi saja; BUKAN hasil uji laboratorium atau catatan panen nyata.
// Stok batch dijumlahkan sesuai stok katalog. API perlu mengganti data ini.
export const publicBatches = publicProducts.flatMap((product, i) => {
  const stockFirst = Math.floor(product.stock * 0.6)
  return [stockFirst, product.stock - stockFirst].map((stock, j) => ({
    id: `${product.id}-${j + 1}`,
    productId: product.id,
    code: `BCH-${product.code.slice(-3)}-${String(j + 1).padStart(2, '0')}`,
    origin: 'Jembrana, Bali',
    harvestDate: `2026-10-${String(10 + i + j).padStart(2, '0')}`,
    productionDate: `2026-10-${String(20 + i + j).padStart(2, '0')}`,
    stock,
    moisture: Number((6.4 + j * 0.3 + (i % 3) * 0.1).toFixed(1)),
    fermentation: product.category === 'fermentasi' ? 85 - (product.grade.charCodeAt(0) - 65) * 8 - j * 2 : null,
    defects: Number((1.2 + (product.grade.charCodeAt(0) - 65) * 1.5 + j * 0.2).toFixed(1)),
    passed: true,
  }))
})

export function getProductBatches(productId) {
  return publicBatches.filter(batch => batch.productId === productId)
}

export const formatBatchDate = value => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${value}T00:00:00Z`))
