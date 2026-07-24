<template>
  <div class="flex flex-col gap-4">
    
    <!-- Top Filter Header -->
    <div class="p-4 bg-gradient-to-r from-[#0d2a2e] to-[#13343a] border border-[#14b8a6]/30 rounded-2xl shadow-md space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold text-[#e6f7f5]">Laporan Keuangan & Performansi</h2>
          <p class="text-xs text-[#95cfc7] mt-0.5">Analisis laba bersih, HPP, & pergerakan inventaris</p>
        </div>
      </div>

      <div>
        <label class="block mb-1 text-[11px] font-bold text-[#87c2ba] uppercase tracking-wider">
          Pilih Periode Laporan Bulanan
        </label>
        <input 
          type="month" 
          v-model="filterBulan" 
          @change="muatData"
          class="w-full px-3 py-2 text-xs text-[#e6f7f5] bg-[#0a2024] border border-[#14b8a6]/40 rounded-xl focus:outline-none focus:border-[#2dd4bf] transition-all shadow-inner"
        >
      </div>
    </div>

    <!-- Financial KPI Summary Grid -->
    <div class="grid grid-cols-2 gap-3">
      <!-- Total Penjualan Card -->
      <div class="bg-[#0c2a2e] p-4 rounded-2xl border border-[#06b6d4]/40 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div class="absolute -right-3 -top-3 w-12 h-12 bg-[#06b6d4]/10 rounded-full blur-xl pointer-events-none"></div>
        <div>
          <p class="text-[10px] font-bold text-[#81e6d9] uppercase tracking-wider mb-1">Total Omzet Jual</p>
          <p class="text-lg font-extrabold text-[#67e8f9] tracking-tight">
            Rp {{ totalJualBulanan.toLocaleString('id-ID') }}
          </p>
        </div>
        <p class="text-[10px] font-medium text-[#95cfc7] mt-2 pt-2 border-t border-[#06b6d4]/20">
          HPP: Rp {{ totalHppBaru.toLocaleString('id-ID') }}
        </p>
      </div>

      <!-- Laba Bersih Card -->
      <div class="bg-[#0c2e26] p-4 rounded-2xl border border-[#10b981]/40 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div class="absolute -right-3 -top-3 w-12 h-12 bg-[#10b981]/10 rounded-full blur-xl pointer-events-none"></div>
        <div>
          <p class="text-[10px] font-bold text-[#a7f3d0] uppercase tracking-wider mb-1">Laba Bersih Murni</p>
          <p class="text-lg font-extrabold text-[#34d399] tracking-tight">
            Rp {{ labaBersih.toLocaleString('id-ID') }}
          </p>
        </div>
        <p class="text-[10px] font-medium text-[#a7f3d0]/80 mt-2 pt-2 border-t border-[#10b981]/20">
          Setelah Potong HPP & Biaya
        </p>
      </div>
    </div>

    <!-- Inventory Snapshot Card -->
    <div class="bg-[#122c30] p-4 rounded-2xl border border-[#14b8a6]/30 shadow-sm flex items-center justify-between">
      <div>
        <p class="text-[10px] font-bold text-[#87c2ba] uppercase tracking-wider">Total Nilai Persediaan Stok</p>
        <p class="text-base font-extrabold text-[#e6f7f5] mt-0.5">
          Rp {{ persediaanSaatIni.toLocaleString('id-ID') }}
        </p>
        <p class="text-[10px] text-[#95cfc7]">Berdasarkan akumulasi inventaris aktif</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-[#14b8a6]/20 text-[#2dd4bf] border border-[#2dd4bf]/30 flex items-center justify-center font-bold">
        📊
      </div>
    </div>

    <!-- Detailed Expense Breakdown Component -->
    <RincianBiaya 
      :biayaPemasaran="dBiayaPemasaran" 
      :biayaListrikAirInternet="dBiayaListrikAirInternet"
      :biayaAdmin="dBiayaAdmin" 
      :biayaPerlengkapan="dBiayaPerlengkapan" 
      :biayaPajak="dBiayaPajak"
      :biayaSewa="dBiayaSewa" 
      :biayaLain="dBiayaLain" 
    />

    <!-- Product Analytics Ranking Component -->
    <RankingProduk 
      :produkTerlaris="produkTerlaris" 
      :produkPalingSepi="produkPalingSepi" 
    />

    <!-- Export Actions -->
    <div class="space-y-2.5 mt-1">
      <button 
        @click="eksporLabaRugi" 
        :disabled="isLoading"
        class="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-2xl text-xs font-bold text-[#e6f7f5] bg-gradient-to-r from-[#e11d48] to-[#f43f5e] border border-[#fb7185]/40 shadow-sm hover:shadow active:scale-[0.98] transition-all disabled:opacity-50"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <span v-if="isLoading">Memproses Laporan...</span>
        <span v-else>Unduh Laporan Laba Rugi (PDF)</span>
      </button>

      <button 
        @click="downloadExcel" 
        :disabled="isLoading"
        class="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-2xl text-xs font-bold text-[#091b1e] bg-gradient-to-r from-[#2dd4bf] via-[#14b8a6] to-[#10b981] border border-[#2dd4bf]/40 shadow-sm hover:shadow active:scale-[0.98] transition-all disabled:opacity-50"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        <span v-if="isLoading">Memproses Excel...</span>
        <span v-else>Unduh Laporan Laba Rugi (Excel)</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../database/db';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAndSharePDF } from '../utils/pdfHandler';
import { exportLabaRugiExcel } from '../utils/excelHandler';
import { useToast } from '../composables/useToast';
import RincianBiaya from '../components/RincianBiaya.vue';
import RankingProduk from '../components/RankingProduk.vue';

const filterBulan = ref(dayjs().format('YYYY-MM'));
const { showToast } = useToast();
const totalJualBulanan = ref(0);
const labaBersih = ref(0);
const produkTerlaris = ref(null);
const produkPalingSepi = ref(null);

const isLoading = ref(false);

const totalHppBaru = ref(0);
const dBiayaPemasaran = ref(0);
const dBiayaListrikAirInternet = ref(0);
const dBiayaPerlengkapan = ref(0);
const dBiayaAdmin = ref(0);
const dBiayaPajak = ref(0);
const dBiayaSewa = ref(0);
const dBiayaLain = ref(0);

const persediaanSaatIni = ref(0);

const muatData = async () => {
    const bulanAwal = dayjs(filterBulan.value).startOf('month').format('YYYY-MM-DD HH:mm:ss');
    const bulanAkhir = dayjs(filterBulan.value).endOf('month').format('YYYY-MM-DD HH:mm:ss');

    const penjualanBulanIni = await db.penjualan
        .where('tanggal').between(bulanAwal, bulanAkhir, true, true)
        .toArray();

    const pengeluaranBulanIni = await db.pengeluaran
        .where('bulanTahun').equals(filterBulan.value)
        .toArray();

    const snapshotSaatIni = await db.persediaan.get(filterBulan.value);
    persediaanSaatIni.value = snapshotSaatIni ? snapshotSaatIni.totalNilai : 0;

    totalJualBulanan.value = penjualanBulanIni.reduce((sum, item) => sum + (Number(item.totalPenjualan) || 0), 0);

    dBiayaPemasaran.value = pengeluaranBulanIni.filter(p => p.jenis === 'pemasaran').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaAdmin.value = pengeluaranBulanIni.filter(p => p.jenis === 'admin').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaSewa.value = pengeluaranBulanIni.filter(p => p.jenis === 'sewa').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaLain.value = pengeluaranBulanIni.filter(p => p.jenis === 'lain_lain').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaListrikAirInternet.value = pengeluaranBulanIni.filter(p => p.jenis === 'listrik_air_internet').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaPerlengkapan.value = pengeluaranBulanIni.filter(p => p.jenis === 'perlengkapan').reduce((sum, item) => sum + item.nominal, 0);
    dBiayaPajak.value = pengeluaranBulanIni.filter(p => p.jenis === 'pajak').reduce((sum, item) => sum + item.nominal, 0);

    totalHppBaru.value = penjualanBulanIni.reduce((sum, item) => sum + (Number(item.totalHpp) || 0), 0);

    labaBersih.value = totalJualBulanan.value - totalHppBaru.value - dBiayaPemasaran.value - dBiayaListrikAirInternet.value - dBiayaPerlengkapan.value - dBiayaAdmin.value - dBiayaPajak.value - dBiayaSewa.value - dBiayaLain.value;

    hitungStatistikProduk(penjualanBulanIni);
};

const hitungStatistikProduk = (penjualan) => {
    if (penjualan.length === 0) {
        produkTerlaris.value = null;
        produkPalingSepi.value = null;
        return;
    }

    const rekap = {};
    penjualan.forEach(transaksi => {
        transaksi.items.forEach(produk => {
            if (!rekap[produk.id]) {
                rekap[produk.id] = { nama: produk.nama, qty: produk.quantity || produk.scanQty || 1 };
            } else {
                rekap[produk.id].qty += (produk.quantity || produk.scanQty || 1);
            }
        });
    });

    const arrRekap = Object.values(rekap).sort((a, b) => b.qty - a.qty);
    produkTerlaris.value = arrRekap[0];
    produkPalingSepi.value = arrRekap[arrRekap.length - 1];
};

const eksporLabaRugi = async () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Laporan Laba Rugi - Periode: ${filterBulan.value}`, 14, 20);

    autoTable(doc, {
        startY: 30,
        body: [
            ['Total Pendapatan Penjualan', `Rp ${totalJualBulanan.value.toLocaleString('id-ID')}`],
            ['Dikurangi: HPP (Harga Pokok Penjualan)', `(Rp ${totalHppBaru.value.toLocaleString('id-ID')})`],
            ['Laba Kotor', `Rp ${(totalJualBulanan.value - totalHppBaru.value).toLocaleString('id-ID')}`],
            ['', ''],
            ['Dikurangi: Biaya Pemasaran', `(Rp ${dBiayaPemasaran.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Listrik, Air, dan Internet', `(Rp ${dBiayaListrikAirInternet.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Perlengkapan', `(Rp ${dBiayaPerlengkapan.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Admin', `(Rp ${dBiayaAdmin.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Pajak', `(Rp ${dBiayaPajak.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Sewa', `(Rp ${dBiayaSewa.value.toLocaleString('id-ID')})`],
            ['Dikurangi: Biaya Lain-lain', `(Rp ${dBiayaLain.value.toLocaleString('id-ID')})`],
            ['', ''],
            ['LABA / RUGI BERSIH', `Rp ${labaBersih.value.toLocaleString('id-ID')}`]
        ],
        theme: 'grid',
        styles: { fontSize: 12 },
        willDrawCell: function (data) {
            if (data.row.index === 12) {
                doc.setFont(undefined, 'bold');
                doc.setTextColor(labaBersih.value >= 0 ? 0 : 255, labaBersih.value >= 0 ? 128 : 0, 0);
            }
        }
    });

    await saveAndSharePDF(doc, `Laporan_Laba_Rugi_${filterBulan.value}.pdf`);
};

const downloadExcel = async () => {
    if (!filterBulan.value) {
        showToast('Pilih bulan terlebih dahulu', 'warning');
        return;
    }

    isLoading.value = true;
    try {
        await exportLabaRugiExcel(filterBulan.value);
    } catch (error) {
        showToast('Terjadi kesalahan saat mengunduh laporan.', 'error');
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    muatData();
});
</script>