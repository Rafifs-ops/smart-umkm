<template>
    <div
        class="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div class="w-full max-w-md z-10 flex flex-col gap-8">
            <div class="text-center space-y-2">
                <h1 class="text-4xl font-extrabold text-transparent bg-clip-text text-white">
                    Smart Inventory
                </h1>
                <p class="text-white text-sm">Manajemen barang cepat dan akurat</p>
            </div>

            <div class="grid grid-cols-1 gap-4 mt-4">

                <button @click="navigasiKe('/scan')"
                    class="group relative flex items-center p-5 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all active:scale-95">
                    <div
                        class="flex items-center justify-center w-14 h-14 bg-cyan-500/10 text-cyan-400 rounded-xl group-hover:scale-110 transition-transform">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                            </path>
                        </svg>
                    </div>
                    <div class="ml-5 text-left">
                        <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">Cek Produk
                        </h3>
                        <p class="text-sm text-white mt-1">Scan barcode untuk melihat data</p>
                    </div>
                </button>

                <button @click="navigasiKe('/input')"
                    class="group relative flex items-center p-5 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all active:scale-95">
                    <div
                        class="flex items-center justify-center w-14 h-14 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                            </path>
                        </svg>
                    </div>
                    <div class="ml-5 text-left">
                        <h3 class="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Input
                            Barang</h3>
                        <p class="text-sm text-white mt-1">Tambahkan produk ke database</p>
                    </div>
                </button>

                <button @click="navigasiKe('/list')"
                    class="group relative flex items-center p-5 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all active:scale-95">
                    <div
                        class="flex items-center justify-center w-14 h-14 bg-green-500/10 text-green-400 rounded-xl group-hover:scale-110 transition-transform">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 10h16M4 14h16M4 18h16">
                            </path>
                        </svg>
                    </div>
                    <div class="ml-5 text-left">
                        <h3 class="text-lg font-bold text-white group-hover:text-green-400 transition-colors">Daftar
                            Inventaris</h3>
                        <p class="text-sm text-white mt-1">Lihat semua barang tersimpan</p>
                    </div>
                </button>

            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigasiKe = (path) => {
    router.push(path);
};
</script>