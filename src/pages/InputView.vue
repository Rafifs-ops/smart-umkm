<template>
  <div class="flex flex-col gap-4">
    
    <!-- Title Card -->
    <div class="p-4 bg-gradient-to-r from-[#0d2a2e] to-[#13343a] border border-[#14b8a6]/30 rounded-2xl flex items-center justify-between shadow-md">
      <div>
        <h2 class="text-lg font-bold text-[#e6f7f5]">
          {{ isEdit ? "Edit Data Produk" : "Tambah Produk Baru" }}
        </h2>
        <p class="text-xs text-[#95cfc7] mt-0.5">
          {{ isEdit ? "Perbarui informasi produk di sistem" : "Isi rincian barang untuk masuk ke daftar inventaris" }}
        </p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-[#14b8a6]/20 border border-[#2dd4bf]/40 flex items-center justify-center text-[#2dd4bf] font-bold text-lg">
        {{ isEdit ? '✏️' : '📦' }}
      </div>
    </div>

    <!-- Main Input Form -->
    <form
      @submit.prevent="simpanProduk"
      class="p-5 space-y-4 bg-[#122c30] border border-[#14b8a6]/30 rounded-2xl shadow-lg relative"
    >
      <!-- 1. Barcode ID Input with Integrated Scan Button -->
      <div>
        <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
          Kode / ID Barcode <span class="text-[#f43f5e]">*</span>
        </label>
        <div class="flex gap-2">
          <input
            v-model="form.id"
            type="text"
            required
            placeholder="Ketik atau scan barcode ID..."
            :disabled="isEdit"
            class="flex-1 p-3 text-sm text-[#e6f7f5] placeholder-[#87c2ba]/50 transition-all font-mono bg-[#0a2024] border border-[#14b8a6]/30 rounded-xl focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            @click="scanIdSaja"
            :disabled="isEdit"
            class="flex items-center justify-center px-4 transition-all border border-[#2dd4bf]/40 bg-[#0e353b] rounded-xl text-[#2dd4bf] hover:bg-[#14b8a6]/20 active:scale-95 disabled:opacity-50 shrink-0"
            title="Scan Barcode Kamera"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- 2. Nama Barang -->
      <div>
        <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
          Nama Barang / Produk <span class="text-[#f43f5e]">*</span>
        </label>
        <input
          v-model="form.nama"
          type="text"
          required
          placeholder="Contoh: Kopi Robusta Sachet 25g"
          class="w-full p-3 text-sm text-[#e6f7f5] placeholder-[#87c2ba]/50 transition-all border bg-[#0a2024] border-[#14b8a6]/30 rounded-xl focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 focus:outline-none"
        />
      </div>

      <!-- 3. Harga Jual & HPP Side by Side -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
            Harga Jual (Rp) <span class="text-[#f43f5e]">*</span>
          </label>
          <div class="relative">
            <span class="absolute left-3 top-3 text-xs text-[#87c2ba] font-semibold">Rp</span>
            <input
              v-model="form.harga"
              type="number"
              min="0"
              required
              placeholder="0"
              class="w-full pl-9 pr-3 py-3 text-sm text-[#e6f7f5] placeholder-[#87c2ba]/50 transition-all border bg-[#0a2024] border-[#14b8a6]/30 rounded-xl focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
            Modal / HPP (Rp) <span class="text-[#f43f5e]">*</span>
          </label>
          <div class="relative">
            <span class="absolute left-3 top-3 text-xs text-[#87c2ba] font-semibold">Rp</span>
            <input
              v-model="form.hpp"
              type="number"
              min="0"
              required
              placeholder="0"
              class="w-full pl-9 pr-3 py-3 text-sm text-[#e6f7f5] placeholder-[#87c2ba]/50 transition-all border bg-[#0a2024] border-[#14b8a6]/30 rounded-xl focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- 4. Estimasi Profit Badge -->
      <div v-if="form.harga && form.hpp" class="p-3 bg-[#0d2a2e] border border-[#2dd4bf]/30 rounded-xl flex justify-between items-center text-xs">
        <span class="text-[#87c2ba] font-medium">Estimasi Margin Profit / Unit:</span>
        <span class="font-bold text-[#34d399]">
          Rp {{ (Number(form.harga) - Number(form.hpp)).toLocaleString("id-ID") }}
        </span>
      </div>

      <!-- 5. Kuantitas Stok -->
      <div>
        <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
          Jumlah Stok Saat Ini <span class="text-[#f43f5e]">*</span>
        </label>
        <input
          v-model="form.quantitas"
          type="number"
          min="0"
          required
          placeholder="0"
          class="w-full p-3 text-sm text-[#e6f7f5] placeholder-[#87c2ba]/50 transition-all border bg-[#0a2024] border-[#14b8a6]/30 rounded-xl focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 focus:outline-none"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-3.5 mt-2 font-bold text-[#091b1e] text-base transition-all rounded-xl bg-gradient-to-r from-[#2dd4bf] via-[#14b8a6] to-[#10b981] hover:opacity-95 active:scale-[0.98] shadow-[0_4px_20px_rgba(45,212,191,0.35)] flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Simpan Data Produk
      </button>
    </form>

  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
import { useProducts } from "../composables/useProduct";

const route = useRoute();
const router = useRouter();
const { addProduct, getProduct } = useProducts();

const isEdit = ref(false);

const form = reactive({
  id: "",
  nama: "",
  hpp: "",
  harga: "",
  quantitas: "",
});

onMounted(async () => {
  if (route.query.newId) {
    form.id = route.query.newId;
  } else if (route.query.editId) {
    isEdit.value = true;
    const produk = await getProduct(route.query.editId);
    if (produk) {
      form.id = produk.id;
      form.nama = produk.nama;
      form.hpp = produk.hpp;
      form.harga = produk.harga;
      form.quantitas = produk.quantitas || 0;
    }
  }
});

const scanIdSaja = async () => {
  try {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: 17,
      cameraDirection: 1,
      scanOrientation: 1,
      android: { scanningLibrary: "mlkit" },
    });

    if (result && result.ScanResult) {
      form.id = result.ScanResult;
    }
  } catch (error) {
    console.error("Proses scan dibatalkan atau error:", error);
  }
};

const simpanProduk = async () => {
  if (!form.id) {
    alert("ID Barcode tidak boleh kosong!");
    return;
  }

  await addProduct({
    id: form.id,
    nama: form.nama,
    hpp: Number(form.hpp),
    harga: Number(form.harga),
    quantitas: Number(form.quantitas),
  });

  alert("Data produk berhasil disimpan!");
  router.push("/list");
};
</script>
