# ==============================================================================
# Berkas: main.py
# Deskripsi: Skrip uji sistem manajemen perpustakaan sederhana
# Jalankan: python main.py
# ==============================================================================

from library_item import LibraryItem, Book, Magazine
from library import Library
from member import Member


def main():
    perpus = Library("Perpustakaan ITERA")

    print("--- 1. Menambahkan Item ---")
    perpus.tambah_item(Book("B001", "Pemrograman Python", 2021, "Budi Santoso", 320))
    perpus.tambah_item(Book("B002", "Basis Data Lanjut", 2020, "Siti Rahma", 280))
    perpus.tambah_item(Magazine("M001", "Tech Monthly", 2026, "Edisi 11", "Gramedia"))
    perpus.tambah_item(Magazine("M002", "Web Weekly", 2026, "Edisi 45", "Kompas"))
    perpus.tambah_item(Book("B001", "ID Duplikat", 2022, "Anonim", 100))  # gagal

    print("\n--- 2. Katalog Item Tersedia ---")
    perpus.tampilkan_katalog()

    print("\n--- 3. Pencarian Item ---")
    hasil = perpus.cari_by_judul("python")
    print("Cari judul 'python':", [i.judul for i in hasil])
    item = perpus.cari_by_id("M001")
    print("Cari id 'M001'     :", item.judul if item else "tidak ditemukan")
    print("Cari id 'X999'     :", perpus.cari_by_id("X999"))

    print("\n--- 4. Status Ketersediaan (Peminjaman) ---")
    erhan = Member("124140217", "Erhan Kurniawan")
    perpus.pinjam_item("B001", erhan)
    perpus.pinjam_item("M001", erhan)
    perpus.pinjam_item("B001", erhan)  # gagal: sedang dipinjam
    erhan.tampilkan_pinjaman()
    perpus.tampilkan_katalog()  # B001 dan M001 tidak muncul lagi

    print("\n--- 5. Pengembalian & Denda (Polymorphism) ---")
    perpus.kembalikan_item("B001", erhan, hari_terlambat=3)  # buku: 3 x 1.000
    perpus.kembalikan_item("M001", erhan, hari_terlambat=3)  # majalah: 3 x 500
    erhan.tampilkan_pinjaman()

    print("\n--- 6. Bukti Encapsulation & Abstract Class ---")
    try:
        LibraryItem("X", "Abstrak", 2026)
    except TypeError as err:
        print("Abstract class ditolak:", err)
    buku = perpus.cari_by_id("B002")
    try:
        buku.is_dipinjam = True
    except AttributeError:
        print("is_dipinjam read-only (property tanpa setter)")
    try:
        buku.judul = "   "
    except ValueError as err:
        print("Setter judul menolak:", err)

    print("\n--- 7. Katalog Akhir (Seluruh Koleksi) ---")
    perpus.tampilkan_katalog(hanya_tersedia=False)


if __name__ == "__main__":
    main()
