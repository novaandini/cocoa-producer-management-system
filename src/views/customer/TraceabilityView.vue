<script setup>
// Ini adalah ALUR CONTOH, bukan status pesanan pelanggan secara real-time.
// Data aktual akan diambil dari backend Laravel setelah integrasi.
const timeline = [
  {
    number: '01',
    title: 'Pesanan Dibuat',
    description: 'Pesanan customer telah dibuat dan tercatat di dalam sistem.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '02',
    title: 'Verifikasi Pesanan',
    description: 'Pesanan diverifikasi untuk memastikan data dan kebutuhan produk telah sesuai.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '03',
    title: 'Persiapan Produk',
    description: 'Produk kakao disiapkan berdasarkan jumlah dan jenis produk yang dipesan.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '04',
    title: 'Quality Control',
    description: 'Produk diperiksa untuk memastikan kualitasnya sesuai dengan standar yang ditetapkan.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '05',
    title: 'Pengemasan',
    description: 'Produk dikemas dengan aman sebelum dipersiapkan untuk proses pengiriman.',
    status: 'SELESAI',
    statusClass: 'done'
  },
  {
    number: '06',
    title: 'Pengiriman',
    description: 'Produk sedang dipersiapkan untuk dikirim kepada customer.',
    status: 'DALAM PROSES',
    statusClass: 'process'
  }
]

const informationCards = [
  {
    number: '01',
    title: 'Transparansi',
    description: 'Customer dapat mengetahui tahapan perjalanan produk dari pesanan hingga pengiriman.'
  },
  {
    number: '02',
    title: 'Kontrol Kualitas',
    description: 'Setiap produk melalui proses pemeriksaan untuk menjaga kualitas sebelum dikirim.'
  },
  {
    number: '03',
    title: 'Informasi Proses',
    description: 'Informasi setiap tahapan membantu customer memahami bagaimana produk diproses.'
  }
]
</script>

<template>
  <div class="kakao-traceability">
    <header class="header">
      <nav class="navbar" aria-label="Navigasi traceability">
        <a href="/" class="logo">
          <img src="/kakao-home/logo-kakao.png" alt="Logo KAKAO" />
        </a>
        <a href="/" class="back-home">← Kembali ke Home</a>
      </nav>
    </header>

    <main>
      <section class="hero">
        <div class="hero-content">
          <span class="hero-label">PRODUCT TRACEABILITY</span>
          <h1>Transparansi Perjalanan<br />Produk Kakao.</h1>
          <p>
            Lihat tahapan perjalanan produk kakao mulai dari
            pesanan dibuat hingga proses pengiriman kepada customer.
          </p>
        </div>
      </section>

      <section class="traceability-section">
        <div class="section-heading">
          <span class="section-label">TRACEABILITY</span>
          <h2>Perjalanan Produk</h2>
          <p>Setiap tahap dicatat untuk menjaga transparansi dan kualitas produk.</p>
          <p class="demo-notice" role="note">
            Tampilan ini merupakan contoh alur produksi dan pengiriman.
            Status di bawah belum menunjukkan kondisi pesanan yang sebenarnya.
          </p>
        </div>

        <div class="timeline">
          <div
            v-for="(item, index) in timeline"
            :key="item.number"
            class="timeline-item"
            :style="{ animationDelay: `${index * 150}ms` }"
          >
            <div class="timeline-number">{{ item.number }}</div>
            <div class="timeline-card">
              <div class="timeline-top">
                <div>
                  <span class="step-label">TAHAP {{ item.number }}</span>
                  <h3>{{ item.title }}</h3>
                </div>
                <span class="status" :class="item.statusClass">{{ item.status }}</span>
              </div>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="information-section">
        <div class="information-container">
          <div class="section-heading">
            <span class="section-label">INFORMASI</span>
            <h2>Mengapa Traceability Penting?</h2>
            <p>Sistem traceability membantu memberikan informasi yang jelas mengenai perjalanan produk.</p>
          </div>
          <div class="information-grid">
            <article
              v-for="(card, index) in informationCards"
              :key="card.number"
              class="information-card"
              :style="{ animationDelay: `${900 + index * 150}ms` }"
            >
              <span class="card-number">{{ card.number }}</span>
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="cta-container">
          <span class="section-label">PRODUK KAKAO</span>
          <h2>Temukan Produk Kakao</h2>
          <p>Lihat produk kakao yang tersedia dan temukan produk yang sesuai dengan kebutuhan Anda.</p>
          <a href="/products" class="cta-button">Lihat Produk →</a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">KAKAO</div>
        <nav class="footer-links" aria-label="Navigasi bawah">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/traceability" aria-current="page">Traceability</a>
          <a href="/checkout">Checkout</a>
          <a href="/login">Login</a>
        </nav>
      </div>
      <div class="footer-bottom">© 2026 KAKAO. Sistem Informasi Manajemen Produsen Kakao.</div>
    </footer>
  </div>
</template>

<style scoped src="./TraceabilityView.css"></style>
