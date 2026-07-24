<script setup>
import { computed } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isHomePage = computed(() => route.path === "/");

const getPageTitle = computed(() => {
  switch (route.path) {
    case "/": return "Smart UMKM Application";
    case "/scan": return "Kasir Pintar";
    case "/input": return route.query.editId ? "Edit Produk" : "Input Produk";
    case "/list": return "Daftar Inventaris";
    case "/riwayat": return "Riwayat Penjualan";
    case "/receipt": return "Nota Transaksi";
    case "/biaya": return "Catat Pengeluaran";
    case "/dashboard": return "Dashboard Keuangan";
    case "/guide": return "Panduan Bisnis";
    default: return "Smart UMKM";
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-[#091b1e] text-[#e6f7f5] flex flex-col items-center justify-between font-sans selection:bg-[#14b8a6] selection:text-[#091b1e]">
    <!-- Mobile App Container -->
    <div
      class="w-full max-w-md min-h-screen flex flex-col bg-[#0b1f23] border-x border-[#14b8a6]/15 shadow-2xl relative pb-24">

      <!-- Top Mobile Header Bar -->
      <header
        class="sticky top-0 z-40 bg-[#0c2428]/90 backdrop-blur-md border-b border-[#14b8a6]/20 px-4 py-3.5 flex items-center justify-between shadow-md">
        <div class="flex items-center gap-3">
          <button v-if="!isHomePage" @click="router.back()"
            class="p-2 rounded-xl bg-[#133035] text-[#2dd4bf] hover:bg-[#183c42] active:scale-95 transition-all border border-[#14b8a6]/30 flex items-center justify-center"
            title="Kembali">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div v-else
            class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0d9488] to-[#2dd4bf] p-0.5 shadow-sm flex items-center justify-center">
            <div class="w-full h-full bg-[#0b1f23] rounded-[10px] flex items-center justify-center">
              <svg class="w-5 h-5 text-[#2dd4bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div>
            <h1 class="text-base font-extrabold text-[#e6f7f5] tracking-tight leading-none">{{ getPageTitle }}</h1>
            <p class="text-[11px] text-[#95cfc7] font-medium mt-0.5">Sistem POS Digital</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div
            class="px-2.5 py-1 rounded-full bg-[#13343a] border border-[#14b8a6]/30 flex items-center gap-1.5 shadow-inner">
            <span class="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping"></span>
            <span class="text-[11px] font-bold text-[#2dd4bf] tracking-wide uppercase">Aktif</span>
          </div>
        </div>
      </header>

      <!-- Main View Content Area -->
      <main class="flex-1 px-4 py-5 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
