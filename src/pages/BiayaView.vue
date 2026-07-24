<template>
  <div class="flex flex-col gap-4">
    
    <!-- Title Card -->
    <div class="p-4 bg-gradient-to-r from-[#2d151c] to-[#3a1a24] border border-[#f43f5e]/30 rounded-2xl shadow-md flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-[#e6f7f5]">Pencatatan Biaya Operasional</h2>
        <p class="text-xs text-[#fecdd3] mt-0.5">Catat semua pengeluaran usaha untuk menghitung laba bersih murni.</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-[#f43f5e]/20 border border-[#f43f5e]/40 flex items-center justify-center text-[#fb7185] shrink-0">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <!-- Main Expense Form -->
    <form @submit.prevent="simpanBiaya" class="p-5 space-y-4 bg-[#122c30] border border-[#14b8a6]/30 rounded-2xl shadow-lg">
      
      <!-- Kategori Select Dropdown -->
      <div>
        <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
          Kategori Pengeluaran <span class="text-[#f43f5e]">*</span>
        </label>
        <select 
          v-model="form.jenis"
          class="w-full p-3 text-sm text-[#e6f7f5] bg-[#0a2024] border border-[#14b8a6]/30 rounded-xl focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 focus:outline-none transition-colors cursor-pointer"
          required
        >
          <option value="" disabled selected class="bg-[#0a2024] text-[#87c2ba]">Pilih Kategori Biaya...</option>
          <option value="pemasaran" class="bg-[#0c272b] text-[#e6f7f5]">Biaya Pemasaran / Iklan</option>
          <option value="listrik_air_internet" class="bg-[#0c272b] text-[#e6f7f5]">Biaya Listrik, Air & Internet</option>
          <option value="perlengkapan" class="bg-[#0c272b] text-[#e6f7f5]">Biaya Perlengkapan (Packaging/Nota)</option>
          <option value="admin" class="bg-[#0c272b] text-[#e6f7f5]">Biaya Admin & Gaji Staf</option>
          <option value="pajak" class="bg-[#0c272b] text-[#e6f7f5]">Biaya Pajak Usaha</option>
          <option value="sewa" class="bg-[#0c272b] text-[#e6f7f5]">Biaya Sewa Ruko / Tempat</option>
          <option value="lain_lain" class="bg-[#0c272b] text-[#e6f7f5]">Biaya Lain-lain</option>
        </select>
      </div>

      <!-- Nominal Input -->
      <div>
        <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
          Nominal Pengeluaran (Rp) <span class="text-[#f43f5e]">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <span class="text-[#87c2ba] text-xs font-bold">Rp</span>
          </div>
          <input 
            v-model="form.nominal" 
            type="number" 
            min="0" 
            placeholder="0"
            class="w-full pl-10 pr-4 py-3 text-sm text-[#e6f7f5] placeholder-[#87c2ba]/50 bg-[#0a2024] border border-[#14b8a6]/30 rounded-xl focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 focus:outline-none transition-colors"
            required
          >
        </div>
      </div>

      <!-- Periode (Month) -->
      <div>
        <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
          Periode Bulan & Tahun <span class="text-[#f43f5e]">*</span>
        </label>
        <input 
          v-model="form.bulanTahun" 
          type="month"
          class="w-full p-3 text-sm text-[#e6f7f5] bg-[#0a2024] border border-[#14b8a6]/30 rounded-xl focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 focus:outline-none transition-colors"
          required
        >
      </div>

      <!-- Keterangan -->
      <div>
        <label class="block mb-1.5 text-xs font-bold text-[#87c2ba] uppercase tracking-wider">
          Keterangan Tambahan
        </label>
        <textarea 
          v-model="form.keterangan" 
          rows="3"
          placeholder="Contoh: Pembelian kantong plastik, bayar wifi bulanan..."
          class="w-full p-3 text-sm text-[#e6f7f5] placeholder-[#87c2ba]/50 bg-[#0a2024] border border-[#14b8a6]/30 rounded-xl focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 focus:outline-none transition-colors resize-none"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit"
        class="w-full py-3.5 mt-2 font-extrabold text-[#e6f7f5] text-sm transition-all rounded-xl bg-gradient-to-r from-[#f43f5e] via-[#e11d48] to-[#be123c] border border-[#fb7185]/40 hover:opacity-95 active:scale-[0.98] shadow-[0_4px_20px_rgba(244,63,94,0.35)] flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Simpan Data Pengeluaran
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '../database/db';
import dayjs from 'dayjs';
import { useToast } from '../composables/useToast';

const { showToast } = useToast();

const form = ref({
    jenis: '',
    nominal: '',
    bulanTahun: dayjs().format('YYYY-MM'),
    keterangan: ''
});

const simpanBiaya = async () => {
    try {
        await db.pengeluaran.add({
            jenis: form.value.jenis,
            nominal: Number(form.value.nominal),
            bulanTahun: form.value.bulanTahun,
            keterangan: form.value.keterangan
        });
        showToast('Data biaya berhasil disimpan!', 'success');
        form.value.nominal = '';
        form.value.keterangan = '';
    } catch (error) {
        console.error(error);
        showToast('Gagal menyimpan biaya', 'error');
    }
};
</script>