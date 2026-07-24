<template>
  <div class="flex flex-col gap-4">
    
    <!-- Top Header Card -->
    <div class="p-4 bg-gradient-to-r from-[#191932] to-[#202042] border border-[#6366f1]/30 rounded-2xl shadow-md space-y-2">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold text-[#e6f7f5]">Panduan & Glosarium Financial</h2>
          <p class="text-xs text-[#c7d2fe] mt-0.5">Penjelasan istilah penting keuangan usaha & cara membacanya.</p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-[#6366f1]/20 border border-[#6366f1]/40 flex items-center justify-center text-[#818cf8]">
          📚
        </div>
      </div>

      <!-- Quick Search Filter -->
      <div class="relative flex items-center">
        <svg class="w-4 h-4 absolute left-3 text-[#818cf8] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari istilah (HPP, Omset, Laba Bersih...)"
          class="w-full pl-9 pr-3 py-2 text-xs text-[#e6f7f5] placeholder-[#aab3d6]/60 bg-[#0a2024] border border-[#6366f1]/30 rounded-xl focus:outline-none focus:border-[#818cf8] transition-all shadow-inner"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 text-[#aab3d6]">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Accordion List -->
    <div class="space-y-2.5">
      <div 
        v-for="(item, index) in filteredGuides" 
        :key="index"
        class="bg-[#122c30] border border-[#14b8a6]/30 rounded-2xl overflow-hidden transition-all shadow-sm"
      >
        <button 
          @click="toggle(index)"
          class="w-full flex justify-between items-center p-4 text-left focus:outline-none transition-colors hover:bg-[#16363b]"
        >
          <span class="font-bold text-sm text-[#e6f7f5] flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#2dd4bf]"></span>
            {{ item.title }}
          </span>
          
          <svg 
            :class="{ 'rotate-180 text-[#2dd4bf]': item.isOpen }"
            class="w-5 h-5 text-[#87c2ba] transition-transform duration-300 shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Expanded Definition Box -->
        <div 
          v-show="item.isOpen"
          class="p-4 text-xs text-[#95cfc7] bg-[#0a2024] border-t border-[#14b8a6]/20 leading-relaxed"
        >
          {{ item.content }}
        </div>
      </div>

      <div v-if="filteredGuides.length === 0" class="p-8 text-center bg-[#0d272b]/60 border border-dashed border-[#14b8a6]/30 rounded-2xl">
        <p class="text-xs text-[#87c2ba]">Istilah tidak ditemukan. Coba cari kata kunci lain.</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

const guides = ref([
    {
        title: 'HPP (Harga Pokok Penjualan)',
        content: 'HPP adalah total keseluruhan biaya yang dikeluarkan secara langsung oleh bisnis untuk memproduksi barang atau jasa yang dijual. Ini biasanya mencakup biaya bahan baku dan biaya operasional pembuatan produk.',
        isOpen: false
    },
    {
        title: 'Biaya Pemasaran',
        content: 'Semua biaya yang dikeluarkan untuk tujuan mempromosikan, mengiklankan, dan mendistribusikan produk atau layanan kepada pelanggan. Contohnya termasuk iklan media sosial, cetak brosur, dan komisi penjualan.',
        isOpen: false
    },
    {
        title: 'Biaya Admin & Gaji',
        content: 'Biaya yang berkaitan dengan manajemen dan administrasi bisnis sehari-hari. Contoh pengeluaran ini meliputi gaji staf admin, alat tulis kantor (ATK), biaya internet, dan biaya administrasi bank.',
        isOpen: false
    },
    {
        title: 'Biaya Sewa Tempat',
        content: 'Biaya tetap yang dibayarkan secara berkala untuk penggunaan properti atau fasilitas fisik. Contohnya adalah biaya sewa ruko, gudang, kantor, atau peralatan untuk kegiatan usaha.',
        isOpen: false
    },
    {
        title: 'Biaya Listrik, Air, dan Internet',
        content: 'Biaya tagihan listrik, air, dan internet bulanan yang menunjang operasional bisnis Anda.',
        isOpen: false
    },
    {
        title: 'Biaya Perlengkapan',
        content: 'Pengeluaran untuk barang-barang pendukung usaha yang biasanya cepat habis terpakai, tapi bukan bahan baku utama produk. Contohnya kardus packaging, bubble wrap, kantong belanja, stiker, atau nota kasir.',
        isOpen: false
    },
    {
        title: 'Biaya Pajak Usaha',
        content: 'Kewajiban finansial yang harus disetorkan ke negara dari hasil usahamu. Untuk pengusaha atau UMKM, biasanya berupa Pajak Penghasilan (PPh) Final. Pastikan selalu disisihkan dari awal agar tidak mengganggu arus kas bisnis nanti.',
        isOpen: false
    },
    {
        title: 'Biaya Lain-lain',
        content: 'Pengeluaran insidental, tak terduga, atau biaya bernilai kecil yang tidak dapat diklasifikasikan secara spesifik ke dalam kategori biaya utama (Pemasaran, Admin, atau Sewa).',
        isOpen: false
    },
    {
        title: 'Pendapatan (Omset)',
        content: 'Total uang yang masuk dari hasil penjualan kamu sebelum dipotong biaya apa pun. Ibaratnya, ini adalah uang kotor yang masuk ke laci kasir atau rekening bisnis.',
        isOpen: false
    },
    {
        title: 'Laba Kotor (Gross Profit)',
        content: 'Keuntungan awal dari jualan Anda setelah dikurangi modal pembuatan atau pembelian barang (HPP). Keuntungan ini belum bersih karena belum dipotong pengeluaran lainnya seperti pemasaran, admin, dan lain-lain.',
        isOpen: false
    },
    {
        title: 'Laba Bersih (Net Profit)',
        content: 'Keuntungan murni yang benar-benar masuk kantong Anda! Angka ini didapat dari Laba Kotor yang sudah dikurangi dengan Total Biaya operasional lainnya.',
        isOpen: false
    },
    {
        title: 'Laporan Laba Rugi',
        content: 'Laporan keuangan yang menyajikan ringkasan pendapatan, biaya, dan pengeluaran perusahaan dalam suatu periode tertentu untuk menunjukkan apakah bisnis Anda menghasilkan keuntungan atau mengalami kerugian.',
        isOpen: false
    }
]);

const filteredGuides = computed(() => {
  if (!searchQuery.value) return guides.value;
  const q = searchQuery.value.toLowerCase();
  return guides.value.filter(g => 
    g.title.toLowerCase().includes(q) || g.content.toLowerCase().includes(q)
  );
});

const toggle = (index) => {
    filteredGuides.value.forEach((g, i) => { if (i !== index) g.isOpen = false });
    filteredGuides.value[index].isOpen = !filteredGuides.value[index].isOpen;
};
</script>