
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <main class="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <h1 class="text-3xl font-bold text-sky-600">
        Vue 3 + Tailwind CSS
      </h1>

      <p class="mt-3 text-slate-600">
        Your project is ready to build!
      </p>

      <button
        @click="count++"
        class="mt-6 rounded-lg bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700"
      >
        Clicked {{ count }} times
      </button>
    </div>
  </main>
</template>
