<template>
  <div class="bg-[#122c30] border border-[#14b8a6]/30 rounded-2xl shadow-sm mb-4 overflow-hidden">
    <div class="px-4 py-3 bg-[#0a2024] border-b border-[#14b8a6]/20 flex justify-between items-center">
      <h3 class="text-xs font-bold text-[#e6f7f5] uppercase tracking-wider flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#f43f5e]"></span>
        Rincian Pengeluaran Operasional
      </h3>
    </div>
    <div class="p-4">
      <div class="grid grid-cols-2 gap-3">
        <div 
          v-for="(val, name) in biayaMap" 
          :key="name" 
          class="flex flex-col p-2.5 rounded-xl bg-[#0a2024]/60 border border-[#14b8a6]/15"
        >
          <span class="text-[11px] text-[#87c2ba] mb-0.5 truncate">{{ name }}</span>
          <span class="font-bold text-[#e6f7f5] text-xs">Rp {{ val.toLocaleString('id-ID') }}</span>
        </div>
      </div>

      <div class="mt-3 pt-3 border-t border-[#14b8a6]/20 flex justify-between items-center">
        <span class="text-xs font-bold text-[#e6f7f5]">Total Seluruh Pengeluaran</span>
        <span class="text-base font-extrabold text-[#fb7185]">Rp {{ totalBiaya.toLocaleString('id-ID') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  biayaPemasaran: { type: Number, default: 0 },
  biayaListrikAirInternet: { type: Number, default: 0 },
  biayaAdmin: { type: Number, default: 0 },
  biayaPerlengkapan: { type: Number, default: 0 },
  biayaPajak: { type: Number, default: 0 },
  biayaSewa: { type: Number, default: 0 },
  biayaLain: { type: Number, default: 0 },
});

const biayaMap = computed(() => ({
  'Pemasaran': props.biayaPemasaran,
  'Listrik, Air & Wifi': props.biayaListrikAirInternet,
  'Admin & Gaji': props.biayaAdmin,
  'Perlengkapan': props.biayaPerlengkapan,
  'Pajak Usaha': props.biayaPajak,
  'Sewa Tempat': props.biayaSewa,
  'Lain-lain': props.biayaLain
}));

const totalBiaya = computed(() => {
  return Object.values(biayaMap.value).reduce((a, b) => a + b, 0);
});
</script>
