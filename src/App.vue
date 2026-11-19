
<script setup>
import homeview from './views/customer/homeview.vue'
import productsview from './views/customer/ProductsView.vue'
import ProductDetailView from './views/customer/ProductDetailView.vue'
import CheckoutView from './views/customer/CheckoutView.vue'

import LoginView from './views/auth/LoginView.vue'
import RegisterView from './views/auth/RegisterView.vue'

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
<DashboardView
  v-if="path === '/admin/dashboard'"
/>

<AdminPaymentsView
  v-else-if="path === '/admin/payments'"
/>

<AdminCustomersView
  v-else-if="path === '/admin/customers'"
/>

<AdminCustomerFormView
  v-else-if="path === '/admin/customers/form'"
/>

<AdminProductsView
  v-else-if="path === '/admin/products'"
/>

<AdminProductFormView
  v-else-if="path === '/admin/products/form'"
/>

<AdminOrdersView
  v-else-if="path === '/admin/orders'"
/>

<AdminShippingView
  v-else-if="path === '/admin/shipping'"
/>

<AdminShippingFormView
  v-else-if="path === '/admin/shipping/form'"
/>

  <!-- AUTH -->
  <RegisterView
    v-else-if="path === '/register'"
  />

  <LoginView
    v-else-if="path === '/login'"
  />

  <!-- CUSTOMER -->
  <CheckoutView
    v-else-if="path === '/checkout'"
  />

  <ProductDetailView
    v-else-if="path === '/detail-product'"
  />

  <productsview
    v-else-if="path === '/products'"
  />

  <PaymentView v-else-if="path === '/payment'" />

  <TraceabilityView
  v-else-if="path === '/traceability'"
/>

  <homeview v-else />
</template>
