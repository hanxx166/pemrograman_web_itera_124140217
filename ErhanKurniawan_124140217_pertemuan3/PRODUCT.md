# PRODUCT — MyBookManager

Aplikasi tugas PAW ITERA (Pertemuan 3): manajemen buku pribadi berbasis React.

## Truth produk
- **Tujuan:** user mencatat koleksi buku (judul, penulis, status), mencari/menyaring, dan melihat ringkasan statistik.
- **Status:** `milik` (milik pribadi), `baca` (sedang dibaca), `beli` (ingin dibeli).
- **Penyimpanan:** localStorage (`paw-books`) — tidak ada backend.
- **Halaman:** `/` Koleksi (CRUD + filter), `/stats` Statistik (ringkasan).
- **Syarat modul yang wajib dipertahankan:** Context API + useReducer, React Router multi-halaman, minimal 2 custom hook (useLocalStorage, useBookStats), PropTypes, validasi form + error handling, filter status, pencarian judul/penulis.

## Pengguna
Mahasiswa/pembaca yang ingin katalog bacaan pribadi ringan, cepat, lokal.

## Bahasa antarmuka
Indonesia.
