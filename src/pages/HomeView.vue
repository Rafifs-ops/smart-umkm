<template>
  <div
    class="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
    <div class="w-full max-w-md z-10 flex flex-col gap-8">
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-extrabold text-white">
          Smart UMKM Application
        </h1>
        <p class="text-white text-sm">Manajemen barang cepat dan akurat</p>
      </div>

      <div class="grid grid-cols-1 gap-4 mt-4">
        <button @click="navigasiKe('/scan')"
          class="group relative flex items-center p-5 bg-green-900/40 backdrop-blur-sm border border-green-500/30 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all active:scale-95">
          <div
            class="flex items-center justify-center w-14 h-14 bg-cyan-500/10 text-white rounded-xl group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
              </path>
            </svg>
          </div>
          <div class="ml-5 text-left">
            <h3 class="text-lg font-bold text-white group-hover:text-white transition-colors">
              Kasir dan Transaksi
            </h3>
            <p class="text-sm text-white mt-1">
              Proses kasir untuk melayani pelanggan
            </p>
          </div>
        </button>

        <button @click="navigasiKe('/input')"
          class="group relative flex items-center p-5 bg-green-900/40 backdrop-blur-sm border border-green-500/30 rounded-2xl hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all active:scale-95">
          <div
            class="flex items-center justify-center w-14 h-14 bg-purple-500/10 text-white rounded-xl group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
              </path>
            </svg>
          </div>
          <div class="ml-5 text-left">
            <h3 class="text-lg font-bold text-white group-hover:text-white transition-colors">
              Input Barang
            </h3>
            <p class="text-sm text-white mt-1">Tambahkan produk ke database</p>
          </div>
        </button>

        <button @click="navigasiKe('/list')"
          class="group relative flex items-center p-5 bg-green-900/40 backdrop-blur-sm border border-green-500/30 rounded-2xl hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all active:scale-95">
          <div
            class="flex items-center justify-center w-14 h-14 bg-green-500/10 text-white rounded-xl group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16">
              </path>
            </svg>
          </div>
          <div class="ml-5 text-left">
            <h3 class="text-lg font-bold text-white group-hover:text-white transition-colors">
              Daftar Inventaris
            </h3>
            <p class="text-sm text-white mt-1">Lihat semua barang tersimpan</p>
          </div>
        </button>

        <button @click="navigasiKe('/riwayat')"
          class="group relative flex items-center p-5 bg-green-900/40 backdrop-blur-sm border border-green-500/30 rounded-2xl hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all active:scale-95">
          <div
            class="flex items-center justify-center w-14 h-14 bg-yellow-500/20 text-white rounded-xl group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-5 text-left">
            <h3 class="text-lg font-bold text-white group-hover:text-white transition-colors">
              Riwayat Penjualan
            </h3>
            <p class="text-sm text-white mt-1">
              Lihat rekap transaksi per bulan
            </p>
          </div>
        </button>

        <button @click="navigasiKe('/dashboard')"
          class="group relative flex items-center p-5 bg-green-900/40 backdrop-blur-sm border border-green-500/30 rounded-2xl hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all active:scale-95">
          <div
            class="flex items-center justify-center w-14 h-14 bg-blue-500/20 text-white rounded-xl group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-5 text-left">
            <h3 class="text-lg font-bold text-white group-hover:text-white transition-colors">Dashboard Keuangan</h3>
            <p class="text-sm text-white mt-1">Laporan laba rugi & statistik</p>
          </div>
        </button>

        <button @click="navigasiKe('/biaya')"
          class="group relative flex items-center p-5 bg-green-900/40 backdrop-blur-sm border border-green-500/30 rounded-2xl hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all active:scale-95">
          <div
            class="flex items-center justify-center w-14 h-14 bg-red-500/20 text-white rounded-xl group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-5 text-left">
            <h3 class="text-lg font-bold text-white group-hover:text-white transition-colors">Catat Pengeluaran</h3>
            <p class="text-sm text-white mt-1">Biaya operasional & lain-lain</p>
          </div>
        </button>

        <button @click="navigasiKe('/guide')"
          class="group relative flex items-center p-5 bg-green-900/40 backdrop-blur-sm border border-green-500/30 rounded-2xl hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all active:scale-95">
          <div
            class="flex items-center justify-center w-14 h-14 bg-indigo-500/20 text-white rounded-xl group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div class="ml-5 text-left">
            <h3 class="text-lg font-bold text-white group-hover:text-white transition-colors">Panduan</h3>
            <p class="text-sm text-white mt-1">Istilah keuangan & cara pakai</p>
          </div>
        </button>
      </div>
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
