<template>
  <div class="bg-[#122c30] border border-[#14b8a6]/30 rounded-2xl shadow-sm mb-4 overflow-hidden">
    <div class="px-4 py-3 bg-[#0a2024] border-b border-[#14b8a6]/20 flex justify-between items-center">
      <h3 class="text-xs font-bold text-[#e6f7f5] uppercase tracking-wider flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#2dd4bf]"></span>
        Analisis Pergerakan Produk
      </h3>
    </div>

    <div class="p-4 flex flex-col gap-3">
      <!-- Produk Terlaris -->
      <div class="bg-[#0c2e26] rounded-xl p-3.5 border border-[#10b981]/30 relative overflow-hidden">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[10px] font-bold text-[#34d399] uppercase tracking-wider">🏆 Produk Terlaris</span>
          <span v-if="produkTerlaris" class="text-[10px] bg-[#10b981]/20 text-[#a7f3d0] font-semibold px-2 py-0.5 rounded-full">
            Rank #1
          </span>
        </div>
        <div v-if="produkTerlaris">
          <p class="font-bold text-[#e6f7f5] text-base leading-tight">{{ produkTerlaris.nama }}</p>
          <p class="text-xs text-[#a7f3d0] font-semibold mt-1">Terjual Total: {{ produkTerlaris.qty }} Unit</p>
        </div>
        <div v-else>
          <p class="text-xs text-[#87c2ba] italic">Belum ada data transaksi bulan ini</p>
        </div>
      </div>

      <!-- Produk Kurang Laris -->
      <div class="bg-[#2d151c] rounded-xl p-3.5 border border-[#f43f5e]/30 relative overflow-hidden">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[10px] font-bold text-[#fb7185] uppercase tracking-wider">⚠️ Perlu Promosi (Paling Sepi)</span>
          <span v-if="produkPalingSepi" class="text-[10px] bg-[#f43f5e]/20 text-[#fecdd3] font-semibold px-2 py-0.5 rounded-full">
            Evaluasi
          </span>
        </div>
        <div v-if="produkPalingSepi">
          <p class="font-bold text-[#e6f7f5] text-base leading-tight">{{ produkPalingSepi.nama }}</p>
          <p class="text-xs text-[#fb7185] font-semibold mt-1">Terjual: {{ produkPalingSepi.qty }} Unit</p>
        </div>
        <div v-else>
          <p class="text-xs text-[#87c2ba] italic">Belum ada data transaksi bulan ini</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
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
