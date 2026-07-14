import Dexie from 'dexie';

// Membuat instance database baru bernama "InventoryDB"
export const db = new Dexie('InventoryDB');

// Mendefinisikan tabel dan Primary Key
// 'id' di sini akan bertindak sebagai Primary Key (berisi kode barcode)
db.version(1).stores({
    produk: 'id, nama, harga, hpp'
});