import jsPDF from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import dayjs from 'dayjs';

export const generateAndDownloadReceiptPDF = async (transaksi, qrCodeBase64) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Nota Penjualan", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Tanggal: ${dayjs(transaksi.tanggal).format('DD/MM/YYYY HH:mm')}`, 14, 30);
    doc.text(`Total Penjualan: Rp ${Number(transaksi.totalPenjualan).toLocaleString('id-ID')}`, 14, 40);

    doc.text("Item Pembelian:", 14, 55);
    
    let y = 65;
    transaksi.items.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.nama}`, 14, y);
        doc.text(`${item.quantity} x Rp ${Number(item.harga).toLocaleString('id-ID')}`, 25, y + 6);
        const subtotal = item.quantity * item.harga;
        doc.text(`Rp ${subtotal.toLocaleString('id-ID')}`, 140, y + 6);
        y += 15;
    });

    if (qrCodeBase64) {
        // Add QR code image if it fits, else add a new page
        if (y + 60 > 280) {
            doc.addPage();
            y = 20;
        } else {
            y += 10;
        }
        doc.addImage(qrCodeBase64, 'PNG', 105 - 25, y, 50, 50);
    }

    await saveAndSharePDF(doc, `Nota_${transaksi.id}_${dayjs().format('YYYYMMDD')}.pdf`);
};

export const saveAndSharePDF = async (doc, filename) => {
    try {
        if (Capacitor.isNativePlatform()) {
            const pdfBase64 = doc.output('datauristring').split(',')[1];
            
            const writeResult = await Filesystem.writeFile({
                path: filename,
                data: pdfBase64,
                directory: Directory.Cache
            });
            
            await Share.share({
                title: 'Share PDF',
                text: 'Berikut adalah dokumen PDF yang Anda minta.',
                url: writeResult.uri,
                dialogTitle: 'Bagikan PDF dengan teman'
            });
        } else {
            // Web fallback
            doc.save(filename);
        }
    } catch (error) {
        console.error("Gagal menyimpan atau membagikan PDF", error);
        alert("Gagal menyimpan atau membagikan PDF.");
    }
};
