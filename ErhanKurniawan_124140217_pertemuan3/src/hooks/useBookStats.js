// src/hooks/useBookStats.js
import { useMemo } from 'react';
import { useBooks } from '../context/bookStore';

/**
 * Custom Hook untuk menghitung statistik perpustakaan buku.
 * Memenuhi syarat modul: "Implementasikan minimal 2 custom hooks"
 * @returns {Object} Objek berisi total buku dan jumlah per status
 */
function useBookStats() {
  // Mengambil array 'books' dari Context API yang sudah kita buat
  const { books } = useBooks();

  // Menggunakan useMemo agar perhitungan tidak diulang setiap kali komponen render,
  // melainkan hanya dihitung ulang jika isi array 'books' berubah.
  const stats = useMemo(() => {
    // Hitung total keseluruhan buku
    const totalBooks = books.length;

    // Filter dan hitung jumlah buku berdasarkan status (milik, baca, beli)
    const ownedCount = books.filter((book) => book.status === 'milik').length;
    const readingCount = books.filter((book) => book.status === 'baca').length;
    const wishlistCount = books.filter((book) => book.status === 'beli').length;

    return {
      totalBooks,
      ownedCount,
      readingCount,
      wishlistCount,
    };
  }, [books]); // Dependensi: hanya jalan ulang jika 'books' berubah

  return stats;
}

export default useBookStats;