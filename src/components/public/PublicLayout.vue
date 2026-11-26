<script setup>
import PublicNavbar from './PublicNavbar.vue'
import PublicFooter from './PublicFooter.vue'

defineProps({ aboutHref: { type: String, default: '/about' } })
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[#fbf8f3] font-sans text-[#38271c] antialiased">
    <PublicNavbar :about-href="aboutHref" />
    <main class="flex-1"><slot /></main>
    <PublicFooter :about-href="aboutHref" />
  </div>
</template>
