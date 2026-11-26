<script setup>
import { formatBatchDate } from '../../data/publicBatches.js'
defineProps({ batches: { type: Array, required: true }, selectedId: { type: String, default: '' }, selectableIds: { type: Array, default: null } })
const emit = defineEmits(['select'])
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-[#e6d9cb] bg-white">
    <table class="w-full min-w-200 border-collapse text-left text-sm">
      <caption class="sr-only">Daftar batch dan contoh hasil pengujian kualitas</caption>
      <thead class="bg-[#f1e7d8] text-xs font-semibold text-[#715645]">
        <tr>
          <th scope="col" class="px-4 py-4">Batch & asal</th>
          <th scope="col" class="px-4 py-4">Panen / produksi</th>
          <th scope="col" class="px-4 py-4">Stok batch</th>
          <th scope="col" class="px-4 py-4">Kadar air</th>
          <th scope="col" class="px-4 py-4">Fermentasi</th>
          <th scope="col" class="px-4 py-4">Biji cacat</th>
          <th scope="col" class="px-4 py-4">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-[#e6d9cb]">
        <tr v-for="batch in batches" :key="batch.id" :class="selectedId === batch.id ? 'bg-[#f5f7ed]' : ''">
          <th scope="row" class="px-4 py-5 font-normal">
            <button type="button" :disabled="!batch.passed || batch.stock <= 0 || (selectableIds !== null && !selectableIds.includes(batch.id))" :aria-pressed="selectedId === batch.id" class="cursor-pointer text-left font-bold text-[#3b2416] underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50" @click="emit('select', batch.id)">{{ batch.code }}</button>
            <span v-if="selectedId === batch.id" class="ml-2 text-xs font-semibold text-[#627447]">Dipilih</span>
            <span class="mt-1 block text-xs text-[#756356]">{{ batch.origin }}</span>
          </th>
          <td class="px-4 py-5 whitespace-nowrap"><span>{{ formatBatchDate(batch.harvestDate) }}</span><span class="mt-1 block text-xs text-[#756356]">{{ formatBatchDate(batch.productionDate) }}</span></td>
          <td class="px-4 py-5 font-semibold whitespace-nowrap">{{ batch.stock }} kg<span v-if="batch.stock <= 0" class="mt-1 block text-xs font-medium text-red-700">Stok habis</span></td>
          <td class="px-4 py-5">{{ batch.moisture }}%</td>
          <td class="px-4 py-5">{{ batch.fermentation === null ? '—' : `${batch.fermentation}%` }}</td>
          <td class="px-4 py-5">{{ batch.defects }}%</td>
          <td class="px-4 py-5"><span class="inline-flex rounded-md px-2 py-1 text-xs font-semibold whitespace-nowrap" :class="batch.passed ? 'bg-[#e8eedc] text-[#43552c]' : 'bg-red-100 text-red-800'">{{ batch.passed ? 'Lolos Uji Kualitas' : 'Belum Lolos' }}</span></td>
        </tr>
      </tbody>
    </table>
    <p v-if="!batches.length" class="p-6 text-sm text-[#756356]">Belum ada data batch.</p>
  </div>
</template>
