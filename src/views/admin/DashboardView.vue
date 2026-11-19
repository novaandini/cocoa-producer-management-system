<script setup>
import { ref } from 'vue'

// Data sementara dari halaman HTML lama. Nantinya diganti respons API Laravel.
const stats = [
  { label: 'Total Produk', value: '12' },
  { label: 'Total Pesanan', value: '28' },
  { label: 'Customer', value: '18' },
  { label: 'Total Penjualan', value: '8,5 Juta' }
]

const latestOrders = [
  { customer: 'Customer 01', product: 'Cocoa Bean A', status: 'Diproses', statusClass: 'process' },
  { customer: 'Customer 02', product: 'Cocoa Bean B', status: 'Selesai', statusClass: 'done' },
  { customer: 'Customer 03', product: 'Cocoa Bean C', status: 'Diproses', statusClass: 'process' }
]

// Untuk saat ini hanya Dashboard dan Pembayaran Admin yang sudah dikonversi.
// Link menu lain diberi pemberitahuan agar tidak salah masuk ke halaman Home.
const notice = ref('')
function belumTersedia(namaHalaman) {
  notice.value = `Halaman ${namaHalaman} belum dipindahkan ke Vue.js.`
}
</script>

<template>
  <div class="admin-dashboard-page">
    <div class="dashboard">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-logo">
          <a href="/">KAKAO</a>
          <p>SISTEM INFORMASI<br>PRODUSEN KAKAO</p>
        </div>

  <nav class="sidebar-menu" aria-label="Navigasi Admin">
      <a href="/admin/dashboard" class="active" aria-current="page">
    Dashboard
  </a>
  <a href="/admin/customers">Pelanggan
  </a>
      <a href="/admin/products/form">
    Produk
  </a>
      <a href="/admin/orders">Pesanan
  </a>
      <a href="/admin/payments">
    Pembayaran
  </a>
      <a href="/admin/shipping">Pengiriman</a>
</nav>
</aside>

      <!-- MAIN -->
      <main class="main-content">
        <header class="topbar">
          <div>
            <p class="topbar-label">AREA ADMIN</p>
            <h1>Dashboard</h1>
          </div>
          <div class="admin-info">
            <strong>Admin KAKAO</strong>
            <span>Administrator</span>
          </div>
        </header>

        <p v-if="notice" class="navigation-note" role="status">
          {{ notice }}
          <button type="button" aria-label="Tutup pemberitahuan" @click="notice = ''">×</button>
        </p>

        <section class="welcome">
          <p class="section-label">DASHBOARD ADMIN</p>
          <h2>Kelola data kakao <span>lebih terstruktur.</span></h2>
          <p>
            Pantau produk, pesanan, dan data customer
            melalui sistem informasi manajemen produsen kakao.
          </p>
        </section>

        <section class="stats" aria-label="Statistik Dashboard">
          <div v-for="item in stats" :key="item.label" class="stat-card">
            <p>{{ item.label }}</p>
            <h3>{{ item.value }}</h3>
          </div>
        </section>

        <section class="dashboard-content">
          <!-- PESANAN TERBARU -->
          <div class="panel">
            <div class="panel-heading">
              <div>
                <p class="section-label">PESANAN</p>
                <h2>Pesanan Terbaru</h2>
              </div>
              <a href="/admin/orders" class="view-all" @click.prevent="belumTersedia('Pesanan')">
                Lihat Semua →
              </a>
            </div>

            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Produk</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in latestOrders" :key="order.customer">
                    <td>{{ order.customer }}</td>
                    <td>{{ order.product }}</td>
                    <td>
                      <span class="status" :class="order.statusClass">{{ order.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- AKSES CEPAT -->
          <div class="panel quick-menu">
            <p class="section-label">MENU</p>
            <h2>Akses Cepat</h2>
            <div class="quick-links">
              <a href="/admin/products/form">
                <span>01</span>Tambah Produk →
              </a>
              <a href="/admin/products">
                <span>02</span>Lihat Produk →
              </a>
              <a href="/admin/orders" @click.prevent="belumTersedia('Pesanan')">
                <span>03</span>Lihat Pesanan →
              </a>
            </div>
          </div>
        </section>

        <p class="demo-note">* Statistik dan pesanan di atas masih menggunakan data contoh dari halaman HTML lama.</p>
      </main>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-brand">
          <a href="/" class="footer-logo">KAKAO</a>
          <p>
            Sistem informasi untuk membantu pengelolaan
            penjualan kakao secara terstruktur,
            transparan, dan mudah dipantau.
          </p>
        </div>

        <div class="footer-info">
          <div>
            <h4>Menu</h4>
            <a href="/admin/dashboard">Dashboard</a>
            <a href="/admin/products">Produk</a>
          </div>
          <div>
            <h4>Admin</h4>
            <a href="/admin/products/form">Tambah Produk</a>
            <a href="/admin/orders" @click.prevent="belumTersedia('Pesanan')">Pesanan</a>
          </div>
          <div>
            <h4>Informasi</h4>
            <p>Indonesia</p>
            <p>info@kakao.com</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 KAKAO</p>
        <p>Sistem Informasi Manajemen Produsen Kakao</p>
      </div>
    </footer>
  </div>
</template>

<style scoped src="./DashboardView.css"></style>
