<template>
  <div class="flex flex-col gap-4">
    
    <!-- Top Header -->
    <div class="p-4 bg-gradient-to-r from-[#0d2a2e] to-[#13343a] border border-[#14b8a6]/30 rounded-2xl shadow-md flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-[#e6f7f5]">Riwayat Penjualan Kasir</h2>
        <p class="text-xs text-[#95cfc7] mt-0.5">Histori transaksi lengkap terkelompok per bulan</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center text-[#fbbf24]">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="Object.keys(groupedRiwayat).length === 0"
      class="p-8 text-center bg-[#0d272b]/60 border border-dashed border-[#14b8a6]/30 rounded-2xl"
    >
      <p class="text-sm font-semibold text-[#95cfc7]">Belum Ada Riwayat Penjualan</p>
      <p class="text-xs text-[#6bb0a6] mt-1">Lakukan transaksi pertama di Kasir Pintar untuk mencatat histori.</p>
    </div>

    <!-- Monthly Grouped Transactions -->
    <div v-else class="space-y-6">
      <div v-for="(transaksiList, bulan) in groupedRiwayat" :key="bulan" class="space-y-3">
        
        <!-- Month Badge Header -->
        <div class="flex items-center justify-between pb-1 border-b border-[#14b8a6]/30">
          <h3 class="text-sm font-extrabold text-[#2dd4bf] uppercase tracking-wider flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
            {{ formatBulan(bulan) }}
          </h3>
          <span class="text-[11px] font-semibold text-[#95cfc7] bg-[#133035] px-2.5 py-0.5 rounded-full border border-[#14b8a6]/20">
            {{ transaksiList.length }} Transaksi
          </span>
        </div>

        <!-- Transactions Cards in Month -->
        <div class="space-y-3">
          <div
            v-for="trx in transaksiList"
            :key="trx.id"
            class="p-4 bg-[#122c30] border border-[#14b8a6]/30 rounded-2xl shadow-sm hover:border-[#2dd4bf]/40 transition-all flex flex-col gap-2.5"
          >
            <!-- Transaction Header info -->
            <div class="flex justify-between items-center pb-2 border-b border-[#14b8a6]/20">
              <span class="text-xs text-[#95cfc7] font-medium">{{ formatTanggal(trx.tanggal) }}</span>
              <RouterLink :to="`/receipt?id=${trx.id}`" class="text-[11px] font-mono text-[#06b6d4] bg-[#06b6d4]/15 px-2 py-0.5 rounded border border-[#06b6d4]/30 hover:bg-[#06b6d4]/30">
                Nota #{{ trx.id }}
              </RouterLink>
            </div>

            <!-- Items Purchased -->
            <div class="space-y-1.5 py-1">
              <div
                v-for="item in trx.items"
                :key="item.id"
                class="flex justify-between items-center text-xs"
              >
                <span class="text-[#e6f7f5] font-medium">
                  {{ item.nama }} <span class="text-[#2dd4bf] font-bold">(x{{ item.scanQty || item.quantity || 1 }})</span>
                </span>
                <span class="text-[#95cfc7] font-mono">
                  Rp {{ (item.harga * (item.scanQty || item.quantity || 1)).toLocaleString("id-ID") }}
                </span>
              </div>
            </div>

            <!-- Financial Totals -->
            <div class="pt-2 border-t border-[#14b8a6]/20 flex flex-col gap-1 text-xs">
              <div class="flex justify-between items-center font-bold">
                <span class="text-[#e6f7f5]">Total Omzet:</span>
                <span class="text-[#67e8f9] text-sm">Rp {{ trx.totalPenjualan.toLocaleString("id-ID") }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[#87c2ba]">Keuntungan Murni:</span>
                <span class="text-[#34d399] font-bold">Rp {{ trx.totalKeuntungan.toLocaleString("id-ID") }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { usePenjualan } from "../composables/usePenjualan";

const { loadRiwayat } = usePenjualan();
const riwayat = ref([]);

onMounted(async () => {
  riwayat.value = await loadRiwayat();
});

const groupedRiwayat = computed(() => {
  const groups = {};
  riwayat.value.forEach((trx) => {
    if (!groups[trx.bulanTahun]) {
      groups[trx.bulanTahun] = [];
    }
    groups[trx.bulanTahun].push(trx);
  });
  return groups;
});

const formatBulan = (bulanTahun) => {
  if (!bulanTahun) return "";
  const [tahun, bulan] = bulanTahun.split("-");
  const date = new Date(tahun, bulan - 1);
  return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
};

const formatTanggal = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
