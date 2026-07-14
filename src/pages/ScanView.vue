<template>
    <div
        class="flex flex-col items-center min-h-screen p-6 text-gray-100 bg-gradient-to-r from-green-400 via-green-500 to-green-600">
        <div class="w-full max-w-md mt-6">

            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="p-4 border bg-gray-800/80 rounded-2xl border-cyan-500/30">
                    <p class="text-xs text-cyan-400">Total Penjualan</p>
                    <p class="mt-1 text-xl font-bold text-white">Rp {{ totalPenjualan.toLocaleString('id-ID') }}</p>
                </div>
                <div class="p-4 border bg-gray-800/80 rounded-2xl border-green-500/30">
                    <p class="text-xs text-green-400">Keuntungan</p>
                    <p class="mt-1 text-xl font-bold text-white">Rp {{ totalKeuntungan.toLocaleString('id-ID') }}</p>
                </div>
            </div>

            <h2
                class="mb-6 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Scanner Pintar
            </h2>

            <button @click="mulaiScan"
                class="flex items-center justify-center w-full gap-3 py-5 text-lg font-bold transition-all bg-gray-800 border rounded-2xl border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] active:scale-95">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                    </path>
                </svg>
                Scan Barang
            </button>

            <div v-if="barangDitemukan?.length > 0" class="flex flex-col space-y-2">
                <div v-for="produk in barangDitemukan"
                    class="p-6 mt-8 border bg-gray-800 rounded-2xl border-gray-700 shadow-lg">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="mb-1 text-sm text-green-400">Ditambahkan ke Total!</p>
                            <h3 class="text-2xl font-bold text-white">{{ produk.nama }}</h3>
                            <p class="mt-2 text-xl text-gray-300">Rp {{ produk.harga.toLocaleString('id-ID') }}</p>
                        </div>
                    </div>

                    <div class="mt-4 pt-4 border-t border-gray-700 flex justify-between text-sm">
                        <span class="text-gray-500 font-mono">ID: {{ produk.id }}</span>
                        <span class="text-green-500 font-medium">
                            + Profit Rp {{ (produk.harga - (produk.hpp || 0)).toLocaleString('id-ID') }}
                        </span>
                    </div>
                </div>
            </div>

            <button v-if="totalPenjualan > 0" @click="resetTotal"
                class="w-full mt-6 py-3 text-sm font-semibold text-gray-400 transition-colors bg-transparent border border-gray-700 rounded-xl hover:bg-gray-800 hover:text-white">
                Selesai / Reset Hitungan
            </button>

            <RouterLink to="/" class="inline-flex mt-6">
                <button
                    class="px-5 py-2.5 rounded-full font-semibold text-sm bg-gray-800/80 backdrop-blur-sm border border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:bg-cyan-500/10 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Menu Utama
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { useProducts } from '../composables/useProduct';

const router = useRouter();
const { getProduct } = useProducts();

const barangDitemukan = ref([]);

// State untuk menyimpan total kalkulasi
const totalPenjualan = ref(0);
const totalKeuntungan = ref(0);

const mulaiScan = async () => {
    try {
        const result = await CapacitorBarcodeScanner.scanBarcode({
            hint: 17,
            cameraDirection: 1,
            scanOrientation: 1,
            android: { scanningLibrary: 'mlkit' }
        });

        if (result && result.ScanResult) {
            const scannedId = result.ScanResult;
            const produk = await getProduct(scannedId);

            if (produk) {
                // Tampilkan detail produk di layar
                barangDitemukan.value.push(produk);

                // Antisipasi jika produk disave sebelum fitur HPP dibuat (nilainya undefined)
                const modalHpp = produk.hpp || 0;
                const profitItem = produk.harga - modalHpp;

                // Tambahkan ke kalkulasi total
                totalPenjualan.value += produk.harga;
                totalKeuntungan.value += profitItem;

            } else {
                alert(`Produk belum terdaftar. Silakan masukkan data baru.`);
                router.push({ path: '/input', query: { newId: scannedId } });
            }
        }
    } catch (error) {
        console.error('Scan dibatalkan / Error:', error);
    }
};

// Fungsi untuk mengosongkan totalan kasir
const resetTotal = () => {
    totalPenjualan.value = 0;
    totalKeuntungan.value = 0;
    barangDitemukan.value = [];
};
</script>