import { ref } from "vue";
import { db } from "../database/db"; // Sesuaikan path dengan lokasi file db.js Anda

export function useProducts() {
  const productList = ref([]);

  // Fungsi untuk mengambil semua data dari tabel 'produk'
  const loadProducts = async () => {
    try {
      productList.value = await db.produk.toArray();
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  // Fungsi untuk mencari satu produk berdasarkan ID Barcode
  const getProduct = async (id) => {
    try {
      return await db.produk.get(id); // Mengembalikan objek produk atau undefined
    } catch (error) {
      console.error("Gagal mencari produk:", error);
      return null;
    }
  };

  // Fungsi untuk menyimpan atau memperbarui produk
  const addProduct = async (product) => {
    try {
      // Menggunakan put() alih-alih add() agar jika ID sudah ada, data akan di-update (Upsert)
      await db.produk.put(product);
      await loadProducts(); // Refresh list setelah menyimpan
    } catch (error) {
      console.error("Gagal menyimpan produk:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await db.produk.delete(id); // Menghapus dari database Dexie
      await loadProducts(); // Memperbarui daftar state secara otomatis
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
    }
  };

  return { productList, loadProducts, getProduct, addProduct, deleteProduct };
}
