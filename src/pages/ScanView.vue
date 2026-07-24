<template>
  <div class="flex flex-col gap-4">
    
    <!-- Top Metrics Summary Grid -->
    <div class="grid grid-cols-2 gap-3">
      <div class="p-3.5 bg-gradient-to-br from-[#0c2a2e] to-[#123338] border border-[#06b6d4]/40 rounded-2xl shadow-lg relative overflow-hidden">
        <div class="absolute -right-3 -top-3 w-14 h-14 bg-[#06b6d4]/10 rounded-full blur-xl pointer-events-none"></div>
        <p class="text-[11px] font-bold text-[#81e6d9] uppercase tracking-wider">Total Penjualan</p>
        <p class="mt-1 text-lg font-extrabold text-[#67e8f9] tracking-tight">
          Rp {{ totalPenjualan.toLocaleString("id-ID") }}
        </p>
      </div>
      
      <div class="p-3.5 bg-gradient-to-br from-[#0c2e26] to-[#12382f] border border-[#10b981]/40 rounded-2xl shadow-lg relative overflow-hidden">
        <div class="absolute -right-3 -top-3 w-14 h-14 bg-[#10b981]/10 rounded-full blur-xl pointer-events-none"></div>
        <p class="text-[11px] font-bold text-[#a7f3d0] uppercase tracking-wider">Estimasi Profit</p>
        <p class="mt-1 text-lg font-extrabold text-[#34d399] tracking-tight">
          Rp {{ totalKeuntungan.toLocaleString("id-ID") }}
        </p>
      </div>
    </div>

    <!-- Product Search Box with Dropdown -->
    <div class="relative w-full">
      <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
        Cari Barang (Nama / Barcode)
      </label>
      <div class="relative flex items-center">
        <svg class="w-5 h-5 absolute left-3.5 text-[#2dd4bf] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Ketik nama atau scan barcode..."
          class="w-full pl-10 pr-4 py-3 text-sm text-[#e6f7f5] placeholder-[#87c2ba]/60 bg-[#0a2024] border border-[#14b8a6]/40 rounded-xl focus:outline-none focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 transition-all shadow-inner"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 text-[#95cfc7] hover:text-[#e6f7f5]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Live Search Results Dropdown -->
      <div
        v-if="searchQuery && searchResults.length > 0"
        class="absolute z-30 w-full mt-1.5 overflow-hidden bg-[#0d272b] border border-[#2dd4bf]/40 rounded-xl shadow-2xl backdrop-blur-xl divide-y divide-[#14b8a6]/20 max-h-60 overflow-y-auto"
      >
        <div
          v-for="item in searchResults"
          :key="item.id"
          @click="tambahProdukKeTransaksi(item)"
          class="flex items-center justify-between p-3.5 hover:bg-[#14b8a6]/20 cursor-pointer transition-colors"
        >
          <div>
            <p class="font-bold text-sm text-[#e6f7f5]">{{ item.nama }}</p>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[10px] font-mono text-[#2dd4bf] bg-[#14b8a6]/20 px-1.5 py-0.5 rounded">ID: {{ item.id }}</span>
              <span class="text-[11px] text-[#95cfc7]">Stok: {{ item.quantitas || 0 }}</span>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-sm text-[#67e8f9]">Rp {{ item.harga.toLocaleString("id-ID") }}</p>
            <span class="text-[10px] text-[#34d399] font-medium">+ Tambah</span>
          </div>
        </div>
      </div>

      <div
        v-else-if="searchQuery && searchResults.length === 0"
        class="absolute z-30 w-full p-4 mt-1.5 text-center text-xs text-[#fca5a5] bg-[#2a1318] border border-[#f43f5e]/40 rounded-xl shadow-xl"
      >
        Produk tidak ditemukan di database
      </div>
    </div>

    <!-- OR Divider -->
    <div class="flex items-center w-full my-1">
      <div class="flex-1 h-px bg-[#14b8a6]/30"></div>
      <span class="px-3 text-[11px] text-[#87c2ba] font-semibold uppercase tracking-wider">Atau Scan Langsung</span>
      <div class="flex-1 h-px bg-[#14b8a6]/30"></div>
    </div>

    <!-- Camera Scan Button -->
    <button
      @click="mulaiScan"
      class="flex items-center justify-center w-full gap-3 py-3.5 px-4 text-base font-bold text-[#e6f7f5] bg-gradient-to-r from-[#0d9488] via-[#0f766e] to-[#14b8a6] border border-[#2dd4bf]/40 rounded-2xl shadow-[0_4px_20px_rgba(13,148,136,0.35)] hover:shadow-[0_6px_25px_rgba(45,212,191,0.5)] active:scale-[0.98] transition-all"
    >
      <div class="w-8 h-8 rounded-lg bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
        </svg>
      </div>
      Buka Kamera Barcode Scanner
    </button>

    <!-- Transaksi Items List -->
    <div class="mt-2 space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold text-[#e6f7f5] uppercase tracking-wider flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[#2dd4bf]"></span>
          Keranjang Transaksi ({{ barangDitemukan.length }})
        </h3>
        <button 
          v-if="barangDitemukan.length > 0" 
          @click="kosongkanKeranjang" 
          class="text-[11px] text-[#fca5a5] hover:underline font-medium"
        >
          Batal / Kosongkan
        </button>
      </div>

      <div v-if="barangDitemukan.length === 0" class="p-8 text-center bg-[#0d272b]/60 border border-dashed border-[#14b8a6]/30 rounded-2xl">
        <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-[#133035] flex items-center justify-center text-[#87c2ba]">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
        </div>
        <p class="text-xs font-semibold text-[#87c2ba]">Keranjang Kasir Masih Kosong</p>
        <p class="text-[11px] text-[#6bb0a6] mt-0.5">Cari produk di atas atau tekan tombol scan untuk menambahkan barang.</p>
      </div>

      <div v-else class="space-y-2.5">
        <div
          v-for="(produk, idx) in barangDitemukan"
          :key="produk.id"
          class="p-3.5 bg-[#122c30] border border-[#14b8a6]/30 rounded-2xl shadow-sm flex flex-col gap-2 relative overflow-hidden"
        >
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-sm font-bold text-[#e6f7f5]">{{ produk.nama }}</h4>
              <p class="text-[11px] font-mono text-[#87c2ba] mt-0.5">ID: {{ produk.id }}</p>
            </div>
            <p class="text-sm font-extrabold text-[#67e8f9]">
              Rp {{ (produk.harga * produk.scanQty).toLocaleString("id-ID") }}
            </p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-[#14b8a6]/20 text-xs">
            <div class="flex items-center gap-1.5 text-[#34d399] font-medium text-[11px]">
              <span>Profit: Rp {{ ((produk.harga - (produk.hpp || 0)) * produk.scanQty).toLocaleString("id-ID") }}</span>
            </div>

            <!-- Qty Counter Buttons -->
            <div class="flex items-center gap-2 bg-[#0a2024] p-1 rounded-xl border border-[#14b8a6]/30">
              <button 
                @click="kurangiQty(idx)" 
                class="w-6 h-6 rounded-lg bg-[#14b8a6]/20 text-[#2dd4bf] hover:bg-[#14b8a6]/40 flex items-center justify-center font-bold text-sm"
              >-</button>
              <span class="text-xs font-bold text-[#e6f7f5] px-1">{{ produk.scanQty }}</span>
              <button 
                @click="tambahQty(idx)" 
                class="w-6 h-6 rounded-lg bg-[#14b8a6]/20 text-[#2dd4bf] hover:bg-[#14b8a6]/40 flex items-center justify-center font-bold text-sm"
              >+</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Complete Transaction Button -->
    <div v-if="totalPenjualan > 0" class="mt-4 pt-3 border-t border-[#14b8a6]/30">
      <button
        @click="resetTotal"
        class="w-full py-4 px-4 text-base font-extrabold text-[#091b1e] bg-gradient-to-r from-[#2dd4bf] via-[#14b8a6] to-[#10b981] rounded-2xl shadow-[0_4px_20px_rgba(45,212,191,0.4)] hover:shadow-[0_6px_25px_rgba(45,212,191,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
        Proses & Simpan Transaksi (Rp {{ totalPenjualan.toLocaleString("id-ID") }})
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
import { useProducts } from "../composables/useProduct";
import { usePenjualan } from "../composables/usePenjualan";

const router = useRouter();
const { getProduct, addProduct, productList, loadProducts } = useProducts();
const { simpanTransaksi } = usePenjualan();

const barangDitemukan = ref([]);
const searchQuery = ref("");
const totalPenjualan = ref(0);
const totalKeuntungan = ref(0);

onMounted(() => {
  loadProducts();
});

const searchResults = computed(() => {
  if (!searchQuery.value) return [];
  const query = searchQuery.value.toLowerCase();
  return productList.value.filter(p => 
    p.nama.toLowerCase().includes(query) || 
    p.id.toLowerCase().includes(query)
  ).slice(0, 5);
});

const recalculateTotals = () => {
  totalPenjualan.value = barangDitemukan.value.reduce((sum, item) => sum + (item.harga * item.scanQty), 0);
  totalKeuntungan.value = barangDitemukan.value.reduce((sum, item) => sum + ((item.harga - (item.hpp || 0)) * item.scanQty), 0);
};

const tambahProdukKeTransaksi = async (produkData) => {
  const existingIndex = barangDitemukan.value.findIndex((p) => p.id === produkData.id);

  if (existingIndex !== -1) {
    barangDitemukan.value[existingIndex].scanQty++;
  } else {
    const produkCopy = { ...produkData, scanQty: 1 };
    barangDitemukan.value.push(produkCopy);
  }

  // Kurangi stok di database local
  const updatedProduk = { ...produkData };
  updatedProduk.quantitas = (updatedProduk.quantitas || 0) - 1;
  await addProduct(updatedProduk);

  recalculateTotals();
  searchQuery.value = "";
};

const tambahQty = (idx) => {
  barangDitemukan.value[idx].scanQty++;
  recalculateTotals();
};

const kurangiQty = (idx) => {
  if (barangDitemukan.value[idx].scanQty > 1) {
    barangDitemukan.value[idx].scanQty--;
  } else {
    barangDitemukan.value.splice(idx, 1);
  }
  recalculateTotals();
};

const kosongkanKeranjang = () => {
  barangDitemukan.value = [];
  totalPenjualan.value = 0;
  totalKeuntungan.value = 0;
};

const mulaiScan = async () => {
  try {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: 17,
      cameraDirection: 1,
      scanOrientation: 1,
      android: { scanningLibrary: "mlkit" },
    });

    if (result && result.ScanResult) {
      const scannedId = result.ScanResult;
      const produk = await getProduct(scannedId);

      if (produk) {
        await tambahProdukKeTransaksi(produk);
      } else {
        alert(`Produk dengan ID ${scannedId} belum terdaftar. Mengalihkan ke form input...`);
        router.push({ path: "/input", query: { newId: scannedId } });
      }
    }
  } catch (error) {
    console.error("Scan dibatalkan / Error:", error);
  }
};

const resetTotal = async () => {
  if (barangDitemukan.value.length > 0) {
    try {
      const id = await simpanTransaksi(
        barangDitemukan.value,
        totalPenjualan.value,
        totalKeuntungan.value,
      );
      
      kosongkanKeranjang();
      router.push({ path: '/receipt', query: { id: id } });
    } catch (error) {
      alert("Gagal menyimpan transaksi!");
    }
  }
};
</script>
