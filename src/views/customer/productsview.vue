<script setup>
import { ref, computed } from 'vue'

// Data produk lama; nanti dapat diganti dengan data API/MySQL.
const products = [
  {
    "id": "a",
    "name": "Cocoa Bean A",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "A",
    "stock": 500,
    "image": "/kakao-home/cocoa-bean-a.jpg",
    "description": "Biji kakao fermentasi Grade A untuk kebutuhan pengolahan kakao."
  },
  {
    "id": "b",
    "name": "Cocoa Bean B",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "B",
    "stock": 800,
    "image": "/kakao-home/cocoa-bean-b.jpg",
    "description": "Biji kakao fermentasi Grade B dengan stok yang tersedia."
  },
  {
    "id": "c",
    "name": "Cocoa Bean C",
    "type": "Non-Fermentasi",
    "category": "non-fermentasi",
    "grade": "C",
    "stock": 300,
    "image": "/kakao-home/cocoa-bean-c.jpg",
    "description": "Biji kakao non-fermentasi untuk kebutuhan produk kakao."
  },
  {
    "id": "d",
    "name": "Cocoa Bean D",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "A",
    "stock": 650,
    "image": "/kakao-home/cocoa-bean-d.jpg",
    "description": "Biji kakao fermentasi Grade A dengan ketersediaan stok 650 kg."
  },
  {
    "id": "e",
    "name": "Cocoa Bean E",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "B",
    "stock": 450,
    "image": "/kakao-home/cocoa-bean-e.jpg",
    "description": "Biji kakao fermentasi Grade B dengan ketersediaan stok 450 kg."
  },
  {
    "id": "f",
    "name": "Cocoa Bean F",
    "type": "Non-Fermentasi",
    "category": "non-fermentasi",
    "grade": "B",
    "stock": 700,
    "image": "/kakao-home/cocoa-bean-f.png",
    "description": "Biji kakao non-fermentasi Grade B dengan stok 700 kg."
  },
  {
    "id": "g",
    "name": "Cocoa Bean G",
    "type": "Fermentasi",
    "category": "fermentasi",
    "grade": "C",
    "stock": 350,
    "image": "/kakao-home/cocoa-bean-g.jpg",
    "description": "Biji kakao fermentasi Grade C dengan ketersediaan stok 350 kg."
  },
  {
    "id": "h",
    "name": "Cocoa Bean H",
    "type": "Non-Fermentasi",
    "category": "non-fermentasi",
    "grade": "A",
    "stock": 550,
    "image": "/kakao-home/cocoa-bean-h.jpg",
    "description": "Biji kakao non-fermentasi Grade A dengan stok 550 kg."
  }
]

const selectedType = ref('all')
const selectedGrade = ref('all')

// Filter otomatis memperbarui tampilan saat tombol ditekan.
const filteredProducts = computed(() =>
  products.filter(product => {
    const typeMatch = selectedType.value === 'all' || product.category === selectedType.value
    const gradeMatch = selectedGrade.value === 'all' || product.grade === selectedGrade.value
    return typeMatch && gradeMatch
  })
)
</script>

<template>
<div class="kakao-products">


    <!-- ==================== NAVBAR ==================== -->

    <header class="header">

        <nav class="navbar">

            <a href="/" class="logo">
                <img
                    src="/kakao-home/logo-kakao.png"
                    alt="Logo KAKAO">
            </a>

            <a
                href="/"
                class="back-home">

                ← Kembali ke Beranda

            </a>

        </nav>

    </header>


    <!-- ==================== HERO ==================== -->

    <section class="product-hero">

        <div class="hero-content">

            <span class="hero-label">
                KATALOG PRODUK KAKAO
            </span>

            <h1>
                Temukan Kakao yang
                <br>
                Sesuai Kebutuhan.
            </h1>

            <p>
                Pilih produk kakao berdasarkan jenis pengolahan,
                grade, dan ketersediaan stok sesuai kebutuhan Anda.
            </p>

        </div>


        <!-- ==================== CATALOG SUMMARY ==================== -->

        <div class="catalog-summary">

            <div class="summary-item">

                <div class="summary-number">
                    {{ String(products.length).padStart(2, '0') }}
                </div>

                <div class="summary-text">

                    <strong>
                        Produk
                    </strong>

                    <span>
                        Tersedia
                    </span>

                </div>

            </div>


            <div class="summary-item">

                <div class="summary-number">
                    02
                </div>

                <div class="summary-text">

                    <strong>
                        Jenis
                    </strong>

                    <span>
                        Pengolahan
                    </span>

                </div>

            </div>


            <div class="summary-item">

                <div class="summary-number">
                    A–C
                </div>

                <div class="summary-text">

                    <strong>
                        Grade
                    </strong>

                    <span>
                        Produk
                    </span>

                </div>

            </div>

        </div>

    </section>


    <!-- ==================== MAIN ==================== -->

    <main>


        <!-- ==================== PRODUCT SECTION ==================== -->

        <section class="products-section">

            <div class="section-heading">

                <div>

                    <span class="section-label">
                        PRODUK TERSEDIA
                    </span>

                    <h2>
                        Pilihan Produk Kakao
                    </h2>

                </div>


                <p>
                    Temukan berbagai pilihan biji kakao
                    dengan karakteristik dan kualitas yang berbeda.
                </p>

            </div>


            <!-- ==================== FILTER ==================== -->

            <div class="filter-area">


                <!-- JENIS PENGOLAHAN -->

                <div class="filter-group">

                    <span class="filter-title">
                        Jenis Pengolahan
                    </span>


                    <div class="filter-buttons">

                        <button
                            type="button" class="filter-btn" :class="{ active: selectedType === 'all' }" @click="selectedType = 'all'">

                            Semua Produk

                        </button>


                        <button
                            type="button" class="filter-btn" :class="{ active: selectedType === 'fermentasi' }" @click="selectedType = 'fermentasi'">

                            Fermentasi

                        </button>


                        <button
                            type="button" class="filter-btn" :class="{ active: selectedType === 'non-fermentasi' }" @click="selectedType = 'non-fermentasi'">

                            Non-Fermentasi

                        </button>

                    </div>

                </div>


                <!-- GRADE -->

                <div class="filter-group">

                    <span class="filter-title">
                        Grade
                    </span>


                    <div class="filter-buttons">

                        <button
                            type="button" class="grade-btn" :class="{ active: selectedGrade === 'all' }" @click="selectedGrade = 'all'">

                            Semua Grade

                        </button>


                        <button
                            type="button" class="grade-btn" :class="{ active: selectedGrade === 'A' }" @click="selectedGrade = 'A'">

                            Grade A

                        </button>


                        <button
                            type="button" class="grade-btn" :class="{ active: selectedGrade === 'B' }" @click="selectedGrade = 'B'">

                            Grade B

                        </button>


                        <button
                            type="button" class="grade-btn" :class="{ active: selectedGrade === 'C' }" @click="selectedGrade = 'C'">

                            Grade C

                        </button>

                    </div>

                </div>

            </div>


            <!-- ==================== PRODUCT GRID ==================== -->

            <div class="products-grid" id="productsGrid">
                <article v-for="product in filteredProducts" :key="product.id" class="product-card">
                    <div class="product-image-wrap">
                        <img :src="product.image" :alt="product.name" class="product-image" loading="lazy">
                        <span class="product-badge">GRADE {{ product.grade }}</span>
                    </div>
                    <div class="product-content">
                        <span class="product-type">{{ product.type }}</span>
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
                        <div class="product-info">
                            <div class="info-box">
                                <span class="info-label">Grade</span>
                                <span class="info-value">{{ product.grade }}</span>
                            </div>
                            <div class="info-box">
                                <span class="info-label">Stok</span>
                                <span class="info-value">{{ product.stock }} kg</span>
                            </div>
                        </div>
                        <a   :href="`/detail-product?product=${product.id}`"
                            class="detail-button"
                            >
                            Lihat Detail →
                            </a>
                    </div>
                </article>
            </div>


            <!-- ==================== EMPTY STATE ==================== -->

            <div
                class="empty-state"
                v-if="filteredProducts.length === 0"
                id="emptyState">

                <div class="empty-icon">
                    —
                </div>

                <h3>
                    Produk tidak ditemukan
                </h3>

                <p>
                    Coba ubah filter untuk melihat produk lainnya.
                </p>

            </div>

        </section>



        <!-- ==================== INFORMATION ==================== -->

        <section class="information-section">

            <div class="information-heading">

                <span class="section-label">
                    INFORMASI PRODUK
                </span>

                <h2>
                    Kenali Produk Kakao
                </h2>

                <p>
                    Setiap produk memiliki karakteristik yang berbeda.
                    Pilih produk sesuai kebutuhan pengolahan Anda.
                </p>

            </div>


            <div class="information-grid">


                <!-- CARD 1 -->

                <div class="information-card">

                    <div class="information-number">
                        01
                    </div>

                    <h3>
                        Grade Kakao
                    </h3>

                    <p>
                        Grade menunjukkan tingkat kualitas
                        produk kakao yang tersedia.
                    </p>

                </div>


                <!-- CARD 2 -->

                <div class="information-card">

                    <div class="information-number">
                        02
                    </div>

                    <h3>
                        Jenis Pengolahan
                    </h3>

                    <p>
                        Produk tersedia dalam jenis fermentasi
                        dan non-fermentasi.
                    </p>

                </div>


                <!-- CARD 3 -->

                <div class="information-card">

                    <div class="information-number">
                        03
                    </div>

                    <h3>
                        Ketersediaan Stok
                    </h3>

                    <p>
                        Jumlah stok ditampilkan secara transparan
                        pada setiap produk.
                    </p>

                </div>


                <!-- CARD 4 -->

                <div class="information-card">

                    <div class="information-number">
                        04
                    </div>

                    <h3>
                        Detail Produk
                    </h3>

                    <p>
                        Lihat detail produk sebelum menentukan
                        jumlah pesanan yang dibutuhkan.
                    </p>

                </div>

            </div>

        </section>



        <!-- ==================== ORDER GUIDE ==================== -->

        <section class="order-section">

            <div class="order-content">

                <span class="section-label">
                    CARA PEMESANAN
                </span>

                <h2>
                    Pesan Produk dengan Mudah
                </h2>

                <p>
                    Ikuti beberapa langkah sederhana untuk
                    mendapatkan produk kakao yang Anda butuhkan.
                </p>

            </div>


            <div class="order-steps">


                <!-- STEP 1 -->

                <div class="order-step">

                    <span>
                        01
                    </span>

                    <h3>
                        Pilih Produk
                    </h3>

                    <p>
                        Tentukan produk kakao yang sesuai
                        dengan kebutuhan.
                    </p>

                </div>


                <!-- STEP 2 -->

                <div class="order-step">

                    <span>
                        02
                    </span>

                    <h3>
                        Lihat Detail
                    </h3>

                    <p>
                        Periksa grade, jenis pengolahan,
                        dan stok produk.
                    </p>

                </div>


                <!-- STEP 3 -->

                <div class="order-step">

                    <span>
                        03
                    </span>

                    <h3>
                        Tentukan Jumlah
                    </h3>

                    <p>
                        Tentukan jumlah produk yang
                        ingin dipesan.
                    </p>

                </div>


                <!-- STEP 4 -->

                <div class="order-step">

                    <span>
                        04
                    </span>

                    <h3>
                        Checkout
                    </h3>

                    <p>
                        Lanjutkan pesanan melalui
                        halaman checkout.
                    </p>

                </div>

            </div>

        </section>



        <!-- ==================== CTA ==================== -->

        <section class="cta-section">

            <div class="cta-box">

                <div>

                    <span class="section-label">
                        SIAP MEMESAN?
                    </span>

                    <h2>
                        Temukan Produk Kakao Anda
                    </h2>

                    <p>
                        Pilih produk dan lihat detailnya
                        sebelum melakukan pemesanan.
                    </p>

                </div>


                <a
                    href="#productsGrid"
                    class="cta-button">

                    Lihat Produk

                </a>

            </div>

        </section>

    </main>



    <!-- ==================== FOOTER ==================== -->

    <footer class="footer">

        <div class="footer-content">


            <!-- BRAND -->

            <div class="footer-brand">

                <img
                    src="/kakao-home/logo-kakao.png"
                    alt="Logo KAKAO">

                <p>
                    Sistem Informasi Manajemen
                    Produsen Kakao.
                </p>

            </div>


            <!-- NAVIGASI -->

            <div class="footer-links">

                <h4>
                    Navigasi
                </h4>


                <a href="/">
                    Home
                </a>


                <a href="/products">
                    Products
                </a>


                <a href="/source_code/frontend/checkout/index.html">
                    Checkout
                </a>

            </div>


            <!-- INFORMASI -->

            <div class="footer-links">

                <h4>
                    Informasi
                </h4>


                <a href="#">
                    About
                </a>


                <a href="/source_code/frontend/traceability/index.html">
                    Traceability
                </a>


                <a href="/admin/login/index.html">
                    Login
                </a>

            </div>

        </div>


        <!-- FOOTER BOTTOM -->

        <div class="footer-bottom">

            <p>
                © 2026 Sistem Informasi Manajemen Produsen Kakao
            </p>

        </div>

    </footer>



    <!-- ==================== JAVASCRIPT ==================== -->

    
</div>
</template>

<style scoped src="./ProductsView.css"></style>
