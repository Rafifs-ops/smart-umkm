<template>
    <div>
        <div class="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">Analisis Produk</h3>
        </div>
        <div class="p-5 flex flex-col sm:flex-row gap-4">
            <div class="flex-1 bg-green-50 rounded-xl p-4 border border-green-100">
                <p class="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Produk Terlaris</p>
                <div v-if="produkTerlaris">
                    <p class="font-bold text-slate-800 text-lg">{{ produkTerlaris.nama }}</p>
                    <p class="text-sm text-green-600 font-medium mt-1">Terjual: {{ produkTerlaris.qty }} unit</p>
                </div>
                <div v-else>
                    <p class="text-sm text-slate-500 italic">Belum ada data</p>
                </div>
            </div>

            <div class="flex-1 bg-red-50 rounded-xl p-4 border border-red-100">
                <p class="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Produk Kurang Laris</p>
                <div v-if="produkPalingSepi">
                    <p class="font-bold text-slate-800 text-lg">{{ produkPalingSepi.nama }}</p>
                    <p class="text-sm text-red-600 font-medium mt-1">Terjual: {{ produkPalingSepi.qty }} unit</p>
                </div>
                <div v-else>
                    <p class="text-sm text-slate-500 italic">Belum ada data</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    produkTerlaris: {
        type: Object,
        default: null
    },
    produkPalingSepi: {
        type: Object,
        default: null
    }
});
</script>
