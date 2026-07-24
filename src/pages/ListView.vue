<template>
  <div class="flex flex-col gap-4">
    
    <!-- Top Filter & Search Header -->
    <div class="p-4 bg-gradient-to-r from-[#0d2a2e] to-[#13343a] border border-[#14b8a6]/30 rounded-2xl shadow-md space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold text-[#e6f7f5]">Daftar Inventaris Stok</h2>
          <p class="text-xs text-[#95cfc7] mt-0.5">Total {{ productList.length }} barang terdaftar</p>
        </div>
        <RouterLink 
          to="/input" 
          class="px-3 py-2 text-xs font-bold text-[#091b1e] bg-[#2dd4bf] hover:bg-[#14b8a6] rounded-xl transition-all shadow-sm flex items-center gap-1 active:scale-95"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Tambah
        </RouterLink>
      </div>

      <!-- Live Search Filter Field -->
      <div class="relative flex items-center">
        <svg class="w-4 h-4 absolute left-3 text-[#2dd4bf] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama barang atau ID barcode..."
          class="w-full pl-9 pr-3 py-2 text-xs text-[#e6f7f5] placeholder-[#87c2ba]/60 bg-[#0a2024] border border-[#14b8a6]/40 rounded-xl focus:outline-none focus:border-[#2dd4bf] transition-all shadow-inner"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 text-[#95cfc7]">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Product Cards List -->
    <div class="space-y-3">
      <div
        v-for="item in filteredProducts"
        :key="item.id"
        class="p-4 bg-[#122c30] border border-[#14b8a6]/30 rounded-2xl shadow-sm hover:border-[#2dd4bf]/50 transition-all flex justify-between items-center relative overflow-hidden"
      >
        <!-- Item Info -->
        <div class="flex-1 pr-2">
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-base text-[#e6f7f5] leading-snug">{{ item.nama }}</h4>
            <span 
              v-if="(item.quantitas || 0) <= 5" 
              class="text-[10px] px-2 py-0.5 rounded-full bg-[#f43f5e]/20 border border-[#f43f5e]/30 text-[#fb7185] font-semibold shrink-0"
            >
              Stok Tipis
            </span>
          </div>

          <p class="text-[11px] font-mono text-[#2dd4bf] mt-1 bg-[#14b8a6]/15 px-2 py-0.5 rounded inline-block">
            ID: {{ item.id }}
          </p>

          <div class="mt-2 grid grid-cols-2 gap-x-2 text-xs text-[#95cfc7]">
            <p>Jual: <span class="font-bold text-[#67e8f9]">Rp {{ item.harga.toLocaleString("id-ID") }}</span></p>
            <p>Modal: <span class="font-bold text-[#81e6d9]">Rp {{ (item.hpp || 0).toLocaleString("id-ID") }}</span></p>
          </div>

          <div class="mt-1 flex items-center gap-2">
            <span class="text-xs text-[#87c2ba]">Sisa Stok:</span>
            <span class="text-xs font-extrabold px-2 py-0.5 rounded-md bg-[#0a2024] text-[#34d399] border border-[#10b981]/30">
              {{ item.quantitas || 0 }} Unit
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-2 shrink-0">
          <RouterLink
            :to="`/input?editId=${item.id}`"
            class="p-2.5 text-[#60a5fa] bg-[#1e293b] border border-[#3b82f6]/40 rounded-xl hover:bg-[#3b82f6]/20 transition-all active:scale-95 flex items-center justify-center"
            title="Edit Barang"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </RouterLink>

          <button
            @click="konfirmasiHapus(item.id, item.nama)"
            class="p-2.5 text-[#fb7185] bg-[#2a1318] border border-[#f43f5e]/40 rounded-xl hover:bg-[#f43f5e]/20 transition-all active:scale-95 flex items-center justify-center"
            title="Hapus Barang"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredProducts.length === 0" class="p-8 text-center bg-[#0d272b]/60 border border-dashed border-[#14b8a6]/30 rounded-2xl mt-4">
      <p class="text-sm font-semibold text-[#95cfc7]">Tidak Ada Barang Ditemukan</p>
      <p class="text-xs text-[#6bb0a6] mt-1">Ganti kata kunci pencarian atau tambahkan barang baru ke inventaris.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProducts } from "../composables/useProduct";

const { productList, loadProducts, deleteProduct } = useProducts();
const searchQuery = ref("");

onMounted(async () => {
  await loadProducts();
});

const filteredProducts = computed(() => {
  if (!searchQuery.value) return productList.value;
  const q = searchQuery.value.toLowerCase();
  return productList.value.filter(
    (item) => item.nama.toLowerCase().includes(q) || item.id.toLowerCase().includes(q)
  );
});

const konfirmasiHapus = async (id, nama) => {
  const yakin = window.confirm(
    `Apakah Anda yakin ingin menghapus produk "${nama}" dari sistem inventaris?`
  );

  if (yakin) {
    await deleteProduct(id);
  }
};
</script>
