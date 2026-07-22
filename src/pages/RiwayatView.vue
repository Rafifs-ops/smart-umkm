<template>
  <div
    class="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white p-6 flex flex-col items-center"
  >
    <div class="w-full max-w-md mt-6">
      <h2 class="text-3xl font-bold text-center text-white mb-8">
        Riwayat Penjualan
      </h2>

      <div
        v-if="Object.keys(groupedRiwayat).length === 0"
        class="text-center mt-10"
      >
        Belum ada riwayat penjualan.
      </div>

      <div v-else class="space-y-8">
        <div v-for="(transaksiList, bulan) in groupedRiwayat" :key="bulan">
          <h3
            class="text-xl font-bold text-green-100 mb-4 border-b border-green-500/50 pb-2"
          >
            {{ formatBulan(bulan) }}
          </h3>

          <div class="space-y-4">
            <div
              v-for="trx in transaksiList"
              :key="trx.id"
              class="p-4 bg-green-900/40 backdrop-blur-sm rounded-2xl border border-green-500/30 shadow-lg"
            >
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm text-gray-200">{{
                  formatTanggal(trx.tanggal)
                }}</span>
                <span class="text-xs font-mono text-cyan-200"
                  >Trx #{{ trx.id }}</span
                >
              </div>

              <div class="space-y-2 mb-4">
                <div
                  v-for="item in trx.items"
                  :key="item.id"
                  class="flex justify-between text-sm"
                >
                  <span class="text-white"
                    >{{ item.nama }} (x{{ item.scanQty }})</span
                  >
                  <span class="text-gray-200"
                    >Rp
                    {{
                      (item.harga * item.scanQty).toLocaleString("id-ID")
                    }}</span
                  >
                </div>
              </div>

              <div
                class="pt-3 border-t border-green-500/30 flex flex-col gap-1"
              >
                <div class="flex justify-between font-bold">
                  <span class="text-white">Total Omzet:</span>
                  <span class="text-cyan-400"
                    >Rp {{ trx.totalPenjualan.toLocaleString("id-ID") }}</span
                  >
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-green-200">Keuntungan:</span>
                  <span class="text-green-400"
                    >Rp {{ trx.totalKeuntungan.toLocaleString("id-ID") }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RouterLink to="/" class="inline-flex mt-8 mb-8">
        <button
          class="px-5 py-2.5 rounded-full font-semibold text-sm bg-green-900/40 backdrop-blur-sm border border-cyan-500/40 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:bg-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex justify-center items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Menu Utama
        </button>
      </RouterLink>
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

// Group data by bulanTahun
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
