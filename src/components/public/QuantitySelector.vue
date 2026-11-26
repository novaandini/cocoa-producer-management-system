<script setup>
import { computed } from 'vue'
const props = defineProps({ modelValue: { type: Number, required: true }, max: { type: Number, required: true }, inputId: { type: String, default: 'quantity' } })
const emit = defineEmits(['update:modelValue'])
const minimum = computed(() => props.max > 0 ? 1 : 0)
function normalize(value) {
  const number = Number(value)
  return Math.min(props.max, Math.max(minimum.value, Number.isFinite(number) ? Math.trunc(number) : minimum.value))
}
function change(value) { emit('update:modelValue', normalize(value)) }
function onInput(event) {
  if (event.target.value === '') return
  const number = normalize(event.target.value)
  event.target.value = String(number)
  change(number)
}
function onBlur(event) { event.target.value = String(normalize(event.target.value)); change(event.target.value) }
</script>

<template>
  <div class="inline-flex h-12 items-center overflow-hidden rounded-xl border border-[#d9c7b5] bg-white text-[#3b2416]">
    <button type="button" aria-label="Kurangi jumlah" :disabled="modelValue <= minimum" class="h-full w-11 cursor-pointer text-xl transition hover:bg-[#f1e7d8] disabled:cursor-not-allowed disabled:opacity-35" @click="change(modelValue - 1)">−</button>
    <input :id="inputId" type="number" :min="minimum" :max="max" step="1" :value="modelValue" :disabled="max === 0" aria-label="Jumlah berat dalam kilogram" class="h-full w-16 border-x border-[#e6d9cb] bg-white px-1 text-center text-sm font-bold focus:outline-[#627447] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" @input="onInput" @blur="onBlur" />
    <button type="button" aria-label="Tambah jumlah" :disabled="modelValue >= max" class="h-full w-11 cursor-pointer text-xl transition hover:bg-[#f1e7d8] disabled:cursor-not-allowed disabled:opacity-35" @click="change(modelValue + 1)">+</button>
  </div>
</template>
