import Dexie from 'dexie';
import dayjs from 'dayjs';

export const db = new Dexie('InventoryDb');

db.version(1).stores({
  produk: 'id, nama, harga, hpp, quantity, createdAt',
  penjualan: '++id, tanggal, totalPenjualan, totalHpp, *items',
  pengeluaran: '++id, bulanTahun, jenis, nominal, keterangan', // jenis: pemasaran, admin, sewa, operasional, bahan_baku, lain_lain
  persediaan: 'bulanTahun, totalNilai' // snapshot persediaan akhir bulan
});

// Fungsi helper untuk update persediaan secara inkremental
async function updateSnapshot(diff) {
  if (diff === 0) return;
  const bulanIni = dayjs().format('YYYY-MM');
  try {
    await db.transaction('rw', db.persediaan, async () => {
      const existing = await db.persediaan.get(bulanIni);
      const newTotal = Math.max(0, (existing?.totalNilai || 0) + diff);
      await db.persediaan.put({ bulanTahun: bulanIni, totalNilai: newTotal });
    });
  } catch (error) {
    console.error('Failed to update persediaan snapshot:', error);
  }
}

// Hooks Dexie untuk tabel produk
db.produk.hook('creating', function (primKey, obj, transaction) {
  const diff = (obj.quantity || 0) * (obj.hpp || 0);
  if (diff !== 0) {
    transaction.on('complete', () => {
      updateSnapshot(diff);
    });
  }
});

db.produk.hook('updating', function (modifications, primKey, obj, transaction) {
  const oldQty = obj.quantity || 0;
  const oldHpp = obj.hpp || 0;

  const newQty = modifications.hasOwnProperty('quantity') ? modifications.quantity : oldQty;
  const newHpp = modifications.hasOwnProperty('hpp') ? modifications.hpp : oldHpp;

  const oldVal = oldQty * oldHpp;
  const newVal = newQty * newHpp;
  const diff = newVal - oldVal;

  if (diff !== 0) {
    transaction.on('complete', () => {
      updateSnapshot(diff);
    });
  }
});

db.produk.hook('deleting', function (primKey, obj, transaction) {
  const diff = -((obj.quantity || 0) * (obj.hpp || 0));
  if (diff !== 0) {
    transaction.on('complete', () => {
      updateSnapshot(diff);
    });
  }
});
