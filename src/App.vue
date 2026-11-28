<script setup>
import HomeView from './views/public/HomeView.vue'
import AboutView from './views/public/AboutView.vue'
import ProductsView from './views/public/ProductsView.vue'
import ProductDetailView from './views/public/ProductDetailView.vue'
import CartView from './views/public/CartView.vue'
import CheckoutView from './views/customer/CheckoutView.vue'
import LoginView from './views/public/LoginView.vue'
import RegisterView from './views/public/RegisterView.vue'
import DashboardView from './views/admin/DashboardView.vue'
import AdminPaymentsView from './views/admin/AdminPaymentsView.vue'
import AdminProductFormView from './views/admin/AdminProductFormView.vue'
import AdminProductsView from './views/admin/AdminProductsView.vue'
import AdminCustomersView from './views/admin/AdminCustomersView.vue'
import AdminCustomerFormView from './views/admin/AdminCustomerFormView.vue'
import AdminOrdersView from './views/admin/AdminOrdersView.vue'
import AdminShippingView from './views/admin/AdminShippingView.vue'
import AdminShippingFormView from './views/admin/AdminShippingFormView.vue'
import PaymentView from './views/customer/PaymentView.vue'
import TraceabilityView from './views/customer/TraceabilityView.vue'

const path = window.location.pathname.replace(/\/$/, '') || '/'
</script>

<template>
  <!-- ADMIN -->
  <DashboardView v-if="path === '/admin/dashboard'" />
  <AdminPaymentsView v-else-if="path === '/admin/payments'" />
  <AdminCustomersView v-else-if="path === '/admin/customers'" />
  <AdminCustomerFormView v-else-if="path === '/admin/customers/form'" />
  <AdminProductsView v-else-if="path === '/admin/products'" />
  <AdminProductFormView v-else-if="path === '/admin/products/form'" />
  <AdminOrdersView v-else-if="path === '/admin/orders'" />
  <AdminShippingView v-else-if="path === '/admin/shipping'" />
  <AdminShippingFormView v-else-if="path === '/admin/shipping/form'" />

  <!-- AUTH: halaman Public -->
  <RegisterView v-else-if="path === '/register'" />
  <LoginView v-else-if="path === '/login'" />

  <!-- CUSTOMER: route lama dipertahankan -->
  <CheckoutView v-else-if="path === '/checkout'" />
  <ProductDetailView v-else-if="path === '/detail-product'" />
  <CartView v-else-if="path === '/cart'" />
  <ProductsView v-else-if="path === '/products'" />
  <PaymentView v-else-if="path === '/payment'" />
  <TraceabilityView v-else-if="path === '/traceability'" />

  <!-- PUBLIC: Tentang Kami & Home -->
  <AboutView v-else-if="path === '/about'" />
  <HomeView v-else />
</template>
