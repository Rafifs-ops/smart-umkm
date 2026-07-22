<template>
    <div class="bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm mb-6 overflow-hidden">
        <div class="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">Rincian Pengeluaran</h3>
        </div>
        <div class="p-5">
            <div class="grid grid-cols-2 gap-4">
                <div v-for="(val, name) in biayaMap" :key="name" class="flex flex-col">
                    <span class="text-xs text-slate-500 mb-1">{{ name }}</span>
                    <span class="font-bold text-slate-800 text-sm">Rp {{ val.toLocaleString('id-ID') }}</span>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span class="text-sm font-bold text-slate-800">Total Pengeluaran</span>
                <span class="text-lg font-bold text-red-600">Rp {{ totalBiaya.toLocaleString('id-ID') }}</span>
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
    'Listrik, Air & Internet': props.biayaListrikAirInternet,
    'Admin': props.biayaAdmin,
    'Perlengkapan': props.biayaPerlengkapan,
    'Pajak': props.biayaPajak,
    'Sewa': props.biayaSewa,
    'Lain-lain': props.biayaLain
}));

const totalBiaya = computed(() => {
    return Object.values(biayaMap.value).reduce((a, b) => a + b, 0);
});
</script>
