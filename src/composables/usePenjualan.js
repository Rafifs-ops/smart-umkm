import { db } from "../database/db";

export function usePenjualan() {
  const simpanTransaksi = async (items, totalPenjualan, totalKeuntungan) => {
    try {
      const now = new Date();
      const tahun = now.getFullYear();
      const bulan = String(now.getMonth() + 1).padStart(2, "0");
      const bulanTahun = `${tahun}-${bulan}`;

      const totalHpp = totalPenjualan - totalKeuntungan;

      const id = await db.penjualan.add({
        tanggal: now.toISOString(),
        bulanTahun: bulanTahun,
        items: JSON.parse(JSON.stringify(items)),
        totalPenjualan,
        totalKeuntungan,
        totalHpp,
      });
      
      return id;
    } catch (error) {
      console.error("Gagal menyimpan riwayat penjualan:", error);
      throw error;
    }
  };

  const loadRiwayat = async () => {
    try {
      const data = await db.penjualan.reverse().toArray();
      return data;
    } catch (error) {
      console.error("Gagal memuat riwayat:", error);
      return [];
    }
  };

  return { simpanTransaksi, loadRiwayat };
}
