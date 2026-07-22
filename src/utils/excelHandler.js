import * as XLSX from 'xlsx';
import { db } from '../database/db';
import dayjs from 'dayjs';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

export const exportLabaRugiExcel = async (bulanTahun) => {
    try {
        const bulanAwal = dayjs(bulanTahun).startOf('month').format('YYYY-MM-DD HH:mm:ss');
        const bulanAkhir = dayjs(bulanTahun).endOf('month').format('YYYY-MM-DD HH:mm:ss');

        const penjualanBulanIni = await db.penjualan
            .where('tanggal').between(bulanAwal, bulanAkhir, true, true)
            .toArray();

        const pengeluaranBulanIni = await db.pengeluaran
            .where('bulanTahun').equals(bulanTahun)
            .toArray();

        const totalJualBulanan = penjualanBulanIni.reduce((sum, item) => sum + (Number(item.totalPenjualan) || 0), 0);
        const totalHppBaru = penjualanBulanIni.reduce((sum, item) => sum + (Number(item.totalHpp) || 0), 0);

        const dBiayaPemasaran = pengeluaranBulanIni.filter(p => p.jenis === 'pemasaran').reduce((sum, item) => sum + item.nominal, 0);
        const dBiayaAdmin = pengeluaranBulanIni.filter(p => p.jenis === 'admin').reduce((sum, item) => sum + item.nominal, 0);
        const dBiayaSewa = pengeluaranBulanIni.filter(p => p.jenis === 'sewa').reduce((sum, item) => sum + item.nominal, 0);
        const dBiayaLain = pengeluaranBulanIni.filter(p => p.jenis === 'lain_lain').reduce((sum, item) => sum + item.nominal, 0);
        const dBiayaListrikAirInternet = pengeluaranBulanIni.filter(p => p.jenis === 'listrik_air_internet').reduce((sum, item) => sum + item.nominal, 0);
        const dBiayaPerlengkapan = pengeluaranBulanIni.filter(p => p.jenis === 'perlengkapan').reduce((sum, item) => sum + item.nominal, 0);
        const dBiayaPajak = pengeluaranBulanIni.filter(p => p.jenis === 'pajak').reduce((sum, item) => sum + item.nominal, 0);

        const labaBersih = totalJualBulanan - totalHppBaru - dBiayaPemasaran - dBiayaListrikAirInternet - dBiayaPerlengkapan - dBiayaAdmin - dBiayaPajak - dBiayaSewa - dBiayaLain;

        const data = [
            ['Laporan Laba Rugi', `Periode: ${bulanTahun}`],
            [],
            ['Total Pendapatan Penjualan', totalJualBulanan],
            ['Dikurangi: HPP (Harga Pokok Penjualan)', -totalHppBaru],
            ['Laba Kotor', totalJualBulanan - totalHppBaru],
            [],
            ['Dikurangi: Biaya Pemasaran', -dBiayaPemasaran],
            ['Dikurangi: Biaya Listrik, Air, dan Internet', -dBiayaListrikAirInternet],
            ['Dikurangi: Biaya Perlengkapan', -dBiayaPerlengkapan],
            ['Dikurangi: Biaya Admin', -dBiayaAdmin],
            ['Dikurangi: Biaya Pajak', -dBiayaPajak],
            ['Dikurangi: Biaya Sewa', -dBiayaSewa],
            ['Dikurangi: Biaya Lain-lain', -dBiayaLain],
            [],
            ['LABA / RUGI BERSIH', labaBersih]
        ];

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "LabaRugi");

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
        const filename = `Laporan_Laba_Rugi_${bulanTahun}.xlsx`;

        if (Capacitor.isNativePlatform()) {
            const writeResult = await Filesystem.writeFile({
                path: filename,
                data: excelBuffer,
                directory: Directory.Cache
            });

            await Share.share({
                title: 'Share Excel',
                text: 'Berikut adalah laporan Excel yang Anda minta.',
                url: writeResult.uri,
                dialogTitle: 'Bagikan Excel dengan teman'
            });
        } else {
            XLSX.writeFile(wb, filename);
        }
    } catch (error) {
        console.error("Gagal membuat Excel", error);
        alert("Gagal membuat Excel.");
    }
};
