<template>
  <div
    class="min-h-screen p-6 flex flex-col items-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white"
  >
    <div class="w-full max-w-md mt-10">
      <h2 class="mb-8 text-3xl font-bold text-center text-white">
        {{ isEdit ? "Edit Produk" : "Input Produk Baru" }}
      </h2>

      <form
        @submit.prevent="simpanProduk"
        class="p-6 space-y-5 border bg-green-900/40 backdrop-blur-sm rounded-2xl border-green-500/30"
      >
        <div>
          <label class="block mb-2 text-sm text-white">ID Barcode</label>
          <div class="flex gap-2">
            <input
              v-model="form.id"
              type="text"
              required
              placeholder="Ketik atau scan ID..."
              :disabled="isEdit"
              class="flex-1 p-3 text-white transition-all border font-mono bg-green-900/50 border-green-500/30 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none placeholder-gray-400 disabled:opacity-50"
            />
            <button
              type="button"
              @click="scanIdSaja"
              :disabled="isEdit"
              class="flex items-center justify-center px-4 transition-all border border-cyan-500/50 bg-green-900/50 rounded-xl text-white hover:bg-cyan-500/10 active:scale-95 disabled:opacity-50"
              title="Scan Barcode"
            >
              <svg
                class="w-6 h-6"
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

        <div>
          <label class="block mb-2 text-sm text-white">Nama Barang</label>
          <input
            v-model="form.nama"
            type="text"
            required
            placeholder="Contoh: Kopi Sachet"
            class="w-full p-3 text-white transition-all border bg-green-900/50 border-green-500/30 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block mb-2 text-sm text-white">Harga Jual (Rp)</label>
          <input
            v-model="form.harga"
            type="number"
            required
            placeholder="0"
            class="w-full p-3 text-white transition-all border bg-green-900/50 border-green-500/30 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block mb-2 text-sm text-white">HPP (Rp)</label>
          <input
            v-model="form.hpp"
            type="number"
            required
            placeholder="0"
            class="w-full p-3 text-white transition-all border bg-green-900/50 border-green-500/30 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block mb-2 text-sm text-white">Kuantitas Stok</label>
          <input
            v-model="form.quantitas"
            type="number"
            required
            placeholder="0"
            class="w-full p-3 text-white transition-all border bg-green-900/50 border-green-500/30 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          class="w-full py-4 mt-6 font-bold text-white transition-all rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          Simpan Produk
        </button>
      </form>

      <RouterLink to="/" class="inline-flex mt-6">
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

// Menangkap ID jika user dialihkan dari halaman "Cek Produk" (ScanView.vue) atau Edit
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

// Fungsi untuk melakukan scan khusus mengisi kolom ID di form ini
const scanIdSaja = async () => {
  try {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: 17,
      cameraDirection: 1,
      scanOrientation: 1,
      android: { scanningLibrary: "mlkit" },
    });

    if (result && result.ScanResult) {
      // Langsung masukkan hasil scan ke input ID
      form.id = result.ScanResult;
    }
  } catch (error) {
    console.error("Proses scan dibatalkan atau error:", error);
  }
};

// Fungsi menyimpan data
const simpanProduk = async () => {
  if (!form.id) {
    alert("ID Barcode tidak boleh kosong!");
    return;
  }

  // Tambahkan await di sini
  await addProduct({
    id: form.id,
    nama: form.nama,
    hpp: Number(form.hpp),
    harga: Number(form.harga),
    quantitas: Number(form.quantitas),
  });

  alert("Berhasil disimpan!");
  router.push("/list");
};
</script>
