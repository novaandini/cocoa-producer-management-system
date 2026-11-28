// Data demo frontend: tipe, grade, stok, gambar dan deskripsi dari katalog lama.
// Kode, harga dan tanggal penambahan merupakan contoh, bukan data resmi.
// Ganti dengan data API setelah integrasi backend.
export const publicProducts = [
  {
    "id": "a",
    "name": "Cocoa Bean A",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "A",
    "stock": 500,
    "image": "/kakao-home/cocoa-bean-a.jpg",
    "description": "Biji kakao fermentasi Grade A untuk kebutuhan pengolahan kakao.",
    "code": "KKO-001",
    "price": 95000,
    "listedAt": "2026-11-01"
  },
  {
    "id": "b",
    "name": "Cocoa Bean B",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "B",
    "stock": 800,
    "image": "/kakao-home/cocoa-bean-b.jpg",
    "description": "Biji kakao fermentasi Grade B dengan stok yang tersedia.",
    "code": "KKO-002",
    "price": 85000,
    "listedAt": "2026-11-02"
  },
  {
    "id": "c",
    "name": "Cocoa Bean C",
    "type": "Non-Fermentasi",
    "category": "non-fermentasi",
    "grade": "C",
    "stock": 300,
    "image": "/kakao-home/cocoa-bean-c.jpg",
    "description": "Biji kakao non-fermentasi untuk kebutuhan produk kakao.",
    "code": "KKO-003",
    "price": 70000,
    "listedAt": "2026-11-03"
  },
  {
    "id": "d",
    "name": "Cocoa Bean D",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "A",
    "stock": 650,
    "image": "/kakao-home/cocoa-bean-d.jpg",
    "description": "Biji kakao fermentasi Grade A dengan ketersediaan stok 650 kg.",
    "code": "KKO-004",
    "price": 98000,
    "listedAt": "2026-11-04"
  },
  {
    "id": "e",
    "name": "Cocoa Bean E",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "B",
    "stock": 450,
    "image": "/kakao-home/cocoa-bean-e.jpg",
    "description": "Biji kakao fermentasi Grade B dengan ketersediaan stok 450 kg.",
    "code": "KKO-005",
    "price": 87000,
    "listedAt": "2026-11-05"
  },
  {
    "id": "f",
    "name": "Cocoa Bean F",
    "type": "Non-Fermentasi",
    "category": "non-fermentasi",
    "grade": "B",
    "stock": 700,
    "image": "/kakao-home/cocoa-bean-f.png",
    "description": "Biji kakao non-fermentasi Grade B dengan stok 700 kg.",
    "code": "KKO-006",
    "price": 78000,
    "listedAt": "2026-11-06"
  },
  {
    "id": "g",
    "name": "Cocoa Bean G",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "C",
    "stock": 350,
    "image": "/kakao-home/cocoa-bean-g.jpg",
    "description": "Biji kakao fermentasi Grade C dengan ketersediaan stok 350 kg.",
    "code": "KKO-007",
    "price": 73000,
    "listedAt": "2026-11-07"
  },
  {
    "id": "h",
    "name": "Cocoa Bean H",
    "type": "Non-Fermentasi",
    "category": "non-fermentasi",
    "grade": "A",
    "stock": 550,
    "image": "/kakao-home/cocoa-bean-h.jpg",
    "description": "Biji kakao non-fermentasi Grade A dengan stok 550 kg.",
    "code": "KKO-008",
    "price": 90000,
    "listedAt": "2026-11-08"
  }
]

export const formatRupiah = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
}).format(value)

export function filterCatalog(items, { search = '', type = 'all', grade = 'all', sort = 'newest' } = {}) {
  const query = search.trim().toLowerCase()
  const result = items.filter(product => {
    const matchesSearch = !query || [product.name, product.code].some(text => text.toLowerCase().includes(query))
    return matchesSearch && (type === 'all' || product.category === type) && (grade === 'all' || product.grade === grade)
  })
  const comparators = {
    newest: (a, b) => b.listedAt.localeCompare(a.listedAt),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    stock: (a, b) => b.stock - a.stock,
  }
  return result.sort(Object.hasOwn(comparators, sort) ? comparators[sort] : comparators.newest)
}
