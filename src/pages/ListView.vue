<template>
  <div
    class="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white p-6 flex flex-col items-center"
  >
    <div class="w-full max-w-md mt-6">
      <h2 class="text-3xl font-bold text-center text-white mb-8">
        Daftar Inventaris
      </h2>

      <div class="space-y-4">
        <div
          v-for="item in productList"
          :key="item.id"
          class="flex justify-between items-center p-4 bg-green-900/40 backdrop-blur-sm rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-colors"
        >
          <div class="flex-1">
            <h4 class="font-bold text-lg text-white">{{ item.nama }}</h4>
            <p class="text-xs text-white font-mono mt-1">ID: {{ item.id }}</p>
            <p class="text-xs text-white mt-1">
              Harga:
              <span class="text-white"
                >Rp {{ item.harga.toLocaleString("id-ID") }}</span
              >
              <span class="mx-1">|</span>
              Modal:
              <span class="text-white"
                >Rp {{ (item.hpp || 0).toLocaleString("id-ID") }}</span
              >
            </p>
            <p class="text-xs text-white mt-1">
              Stok:
              <span class="text-white font-bold">{{
                item.quantitas || 0
              }}</span>
            </p>
          </div>

          <div class="ml-4 flex gap-2">
            <RouterLink
              :to="`/input?editId=${item.id}`"
              class="p-2 text-white bg-blue-500/10 rounded-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95 flex items-center justify-center"
              title="Edit Barang"
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </RouterLink>
            <button
              @click="konfirmasiHapus(item.id, item.nama)"
              class="p-2 text-white bg-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
              title="Hapus Barang"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="productList.length === 0" class="text-center mt-10">
        Belum ada barang di database.
      </div>

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
import { onMounted } from "vue";
import { useProducts } from "../composables/useProduct";

// Import deleteProduct dari composable
const { productList, loadProducts, deleteProduct } = useProducts();

onMounted(async () => {
  await loadProducts();
});

// Fungsi untuk memunculkan peringatan sebelum menghapus
const konfirmasiHapus = async (id, nama) => {
  // Menggunakan window.confirm bawaan untuk kemudahan
  const yakin = window.confirm(
    `Apakah Anda yakin ingin menghapus "${nama}" dari sistem?`,
  );

  if (yakin) {
    await deleteProduct(id);
    // Opsional: Bisa tambahkan toast/alert berhasil dihapus di sini
  }
};
</script>
