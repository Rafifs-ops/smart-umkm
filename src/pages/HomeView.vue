<template>
  <div class="flex flex-col gap-5">

    <!-- Features Action Cards Grid -->
    <div class="grid grid-cols-1 gap-3.5">

      <!-- 1. Kasir dan Transaksi -->
      <button @click="navigasiKe('/scan')"
        class="group relative flex items-center p-4 bg-[#0d2a2e] backdrop-blur-md border border-[#06b6d4]/30 rounded-2xl hover:border-[#22d3ee] hover:bg-[#0f3439] transition-all active:scale-[0.98] shadow-md text-left overflow-hidden">
        <div class="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#06b6d4] to-[#0891b2]"></div>
        <div
          class="flex items-center justify-center w-12 h-12 bg-[#06b6d4]/15 text-[#22d3ee] rounded-xl group-hover:scale-110 transition-transform border border-[#06b6d4]/30 shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-base font-bold text-[#e6f7f5] group-hover:text-[#22d3ee] transition-colors">
              Kasir dan Transaksi
            </h4>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#06b6d4]/20 text-[#67e8f9] font-semibold">POS
            </span>
          </div>
          <p class="text-xs text-[#95cfc7] mt-0.5">Proses penjualan cepat & buat nota penjualan</p>
        </div>
      </button>

      <!-- 2. Input Barang Baru -->
      <button @click="navigasiKe('/input')"
        class="group relative flex items-center p-4 bg-[#191932] backdrop-blur-md border border-[#a855f7]/30 rounded-2xl hover:border-[#c084fc] hover:bg-[#202042] transition-all active:scale-[0.98] shadow-md text-left overflow-hidden">
        <div class="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#a855f7] to-[#9333ea]"></div>
        <div
          class="flex items-center justify-center w-12 h-12 bg-[#a855f7]/15 text-[#c084fc] rounded-xl group-hover:scale-110 transition-transform border border-[#a855f7]/30 shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-base font-bold text-[#e6f7f5] group-hover:text-[#c084fc] transition-colors">
              Input Produk Baru
            </h4>
            <span
              class="text-[10px] px-2 py-0.5 rounded-full bg-[#a855f7]/20 text-[#e9d5ff] font-semibold">Tambah</span>
          </div>
          <p class="text-xs text-[#b8a5d6] mt-0.5">Daftarkan produk baru, HPP, harga jual & stok</p>
        </div>
      </button>

      <!-- 3. Daftar Inventaris -->
      <button @click="navigasiKe('/list')"
        class="group relative flex items-center p-4 bg-[#0c2f25] backdrop-blur-md border border-[#10b981]/30 rounded-2xl hover:border-[#34d399] hover:bg-[#0e382c] transition-all active:scale-[0.98] shadow-md text-left overflow-hidden">
        <div class="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#10b981] to-[#059669]"></div>
        <div
          class="flex items-center justify-center w-12 h-12 bg-[#10b981]/15 text-[#34d399] rounded-xl group-hover:scale-110 transition-transform border border-[#10b981]/30 shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-base font-bold text-[#e6f7f5] group-hover:text-[#34d399] transition-colors">
              Daftar Inventaris
            </h4>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#a7f3d0] font-semibold">Stok
              Barang</span>
          </div>
          <p class="text-xs text-[#96cca6] mt-0.5">Kelola, edit, dan pantau ketersediaan barang</p>
        </div>
      </button>

      <!-- 4. Riwayat Penjualan -->
      <button @click="navigasiKe('/riwayat')"
        class="group relative flex items-center p-4 bg-[#2e260f] backdrop-blur-md border border-[#f59e0b]/30 rounded-2xl hover:border-[#fbbf24] hover:bg-[#382f13] transition-all active:scale-[0.98] shadow-md text-left overflow-hidden">
        <div class="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#f59e0b] to-[#d97706]"></div>
        <div
          class="flex items-center justify-center w-12 h-12 bg-[#f59e0b]/15 text-[#fbbf24] rounded-xl group-hover:scale-110 transition-transform border border-[#f59e0b]/30 shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-base font-bold text-[#e6f7f5] group-hover:text-[#fbbf24] transition-colors">
              Riwayat Penjualan
            </h4>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#f59e0b]/20 text-[#fef08a] font-semibold">Rekap
              TRX</span>
          </div>
          <p class="text-xs text-[#cfbf91] mt-0.5">Cek histori transaksi & rincian nota belanja</p>
        </div>
      </button>

      <!-- 5. Dashboard Keuangan -->
      <button @click="navigasiKe('/dashboard')"
        class="group relative flex items-center p-4 bg-[#0c2c28] backdrop-blur-md border border-[#14b8a6]/30 rounded-2xl hover:border-[#2dd4bf] hover:bg-[#0f3732] transition-all active:scale-[0.98] shadow-md text-left overflow-hidden">
        <div class="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#14b8a6] to-[#0d9488]"></div>
        <div
          class="flex items-center justify-center w-12 h-12 bg-[#14b8a6]/15 text-[#2dd4bf] rounded-xl group-hover:scale-110 transition-transform border border-[#14b8a6]/30 shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-base font-bold text-[#e6f7f5] group-hover:text-[#2dd4bf] transition-colors">
              Dashboard Keuangan
            </h4>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#14b8a6]/20 text-[#99f6e4] font-semibold">Laba
              Rugi</span>
          </div>
          <p class="text-xs text-[#90c9c1] mt-0.5">Laporan omzet, profit murni & ekspor PDF/Excel</p>
        </div>
      </button>

      <!-- 6. Catat Pengeluaran -->
      <button @click="navigasiKe('/biaya')"
        class="group relative flex items-center p-4 bg-[#2d151c] backdrop-blur-md border border-[#f43f5e]/30 rounded-2xl hover:border-[#fb7185] hover:bg-[#381a23] transition-all active:scale-[0.98] shadow-md text-left overflow-hidden">
        <div class="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#f43f5e] to-[#e11d48]"></div>
        <div
          class="flex items-center justify-center w-12 h-12 bg-[#f43f5e]/15 text-[#fb7185] rounded-xl group-hover:scale-110 transition-transform border border-[#f43f5e]/30 shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-base font-bold text-[#e6f7f5] group-hover:text-[#fb7185] transition-colors">
              Catat Pengeluaran
            </h4>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#f43f5e]/20 text-[#fecdd3] font-semibold">Biaya
              Ops</span>
          </div>
          <p class="text-xs text-[#cca3ad] mt-0.5">Catat biaya listrik, sewa, gaji, & operasional</p>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigasiKe = (path) => {
  router.push(path);
};
</script>
