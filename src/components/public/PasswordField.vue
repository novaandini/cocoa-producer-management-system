<script setup>
import { ref } from 'vue'

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])
const visible = ref(false)
</script>

<template>
  <div class="min-w-0">
    <label :for="id" class="mb-2 block text-sm font-semibold">{{ label }}</label>
    <div class="relative">
      <input :id="id" :name="id" :value="modelValue" :type="visible ? 'text' : 'password'" :placeholder="placeholder" autocomplete="new-password" minlength="8" required class="w-full rounded-xl border border-[#decebf] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#968477] focus:border-[#95613e] focus:ring-2 focus:ring-[#95613e]/15 pr-12" @input="emit('update:modelValue', $event.target.value)" />
      <button type="button" :aria-label="visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'" :aria-pressed="visible" class="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center rounded-r-xl text-[#715645] transition hover:text-[#3b2416] focus-visible:outline-2 focus-visible:outline-[#95613e]" @click="visible = !visible">
        <svg v-if="!visible" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true"><path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.5 5.3A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17.4 17.4 0 0 1-3 3.7M6.5 6.5C3.6 8.6 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.5 4.5-1.2"/></svg>
      </button>
    </div>
  </div>
</template>
