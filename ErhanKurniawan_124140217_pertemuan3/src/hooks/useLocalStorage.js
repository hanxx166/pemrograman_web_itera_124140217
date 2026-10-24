// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Custom Hook untuk menyimpan state ke localStorage secara persisten.
 * @param {string} key - Nama key untuk disimpan di localStorage.
 * @param {any} initialValue - Nilai default jika belum ada data di localStorage.
 * @returns {[any, Function]} - Mengembalikan array berisi [nilaiState, fungsiUpdateState]
 */
function useLocalStorage(key, initialValue) {
  // 1. Inisialisasi state dengan mengecek apakah ada data di localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Cek apakah ada data dengan 'key' tersebut di browser
      const item = window.localStorage.getItem(key);
      // Jika ada, parse dari JSON. Jika tidak, gunakan initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Error handling jika gagal membaca/parsing data
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 2. Efek samping: Simpan ke localStorage setiap kali 'storedValue' berubah
  useEffect(() => {
    try {
      // Ubah state menjadi string JSON dan simpan ke localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Error handling jika gagal menyimpan data (misal: storage penuh)
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]); // Hanya jalan jika key atau storedValue berubah

  // 3. Kembalikan nilai state dan fungsi untuk mengubahnya (mirip seperti useState biasa)
  return [storedValue, setStoredValue];
}

export default useLocalStorage;