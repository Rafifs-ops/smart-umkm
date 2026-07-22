<template>
    <div
        class="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 flex flex-col sm:items-center sm:py-12">

        <div
            class="w-full sm:max-w-md sm:rounded-2xl sm:shadow-xl overflow-hidden flex-grow sm:flex-grow-0 flex flex-col">

            <div class="px-6 py-8 sm:py-8">
                <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Pencatatan Pengeluaran
                </h2>
                <p class="text-sm text-white mt-1.5 leading-relaxed">
                    Masukkan detail pengeluaran operasional atau bahan baku perusahaan.
                </p>
            </div>

            <form @submit.prevent="simpanBiaya" class="px-5 py-6 sm:px-6 space-y-5 sm:space-y-4 flex-grow">

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-white">
                        Kategori Pengeluaran <span class="text-red-600">*</span>
                    </label>
                    <select v-model="form.jenis"
                        class="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors appearance-none"
                        required>
                        <option value="" disabled selected>Pilih Kategori...</option>
                        <option value="pemasaran">Biaya Pemasaran</option>
                        <option value="listrik_air_internet">Biaya Listrik, Air, dan Internet</option>
                        <option value="perlengkapan">Biaya Perlengkapan</option>
                        <option value="admin">Biaya Admin</option>
                        <option value="pajak">Biaya Pajak</option>
                        <option value="sewa">Biaya Sewa</option>
                        <option value="lain_lain">Biaya Lain-lain</option>
                    </select>
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-white">
                        Nominal (Rp) <span class="text-red-600">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-3 pointer-events-none">
                            <span class="text-slate-500 text-base sm:text-sm font-medium">Rp</span>
                        </div>
                        <input v-model="form.nominal" type="number" min="0" placeholder="0"
                            class="w-full pl-12 sm:pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                            required>
                    </div>
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-white">
                        Periode (Bulan & Tahun) <span class="text-red-600">*</span>
                    </label>
                    <input v-model="form.bulanTahun" type="month"
                        class="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                        required>
                </div>

                <div>
                    <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-white">
                        Keterangan Tambahan
                    </label>
                    <textarea v-model="form.keterangan" rows="3"
                        placeholder="Contoh: Pembelian tinta printer dan kertas HVS..."
                        class="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors resize-none"></textarea>
                </div>

                <div class="pt-4 sm:pt-2 pb-6 sm:pb-0">
                    <button type="submit"
                        class="w-full py-3.5 sm:py-2.5 text-base sm:text-sm font-semibold text-white bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-lg shadow-sm hover:bg-blue-800 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors">
                        Simpan Data Pengeluaran
                    </button>
                </div>
            </form>
        </div>

        <div class="py-6 sm:py-0 sm:mt-6 w-full sm:max-w-md flex justify-center">
            <RouterLink to="/"
                class="flex items-center px-4 py-2 text-sm font-medium text-white hover:text-slate-800 transition-colors rounded-lg">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Menu Utama
            </RouterLink>
        </div>

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