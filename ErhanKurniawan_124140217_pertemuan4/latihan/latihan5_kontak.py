# ===================================================
# Berkas: latihan5_kontak.py
# Deskripsi: Katalog kontak sederhana menggunakan dictionary
# ===================================================

# Dictionary kontak: key = nama, value = nomor telepon
kontak = {
    "Madara": "081234567890",
    "Naruto": "082345678901",
    "Tobi": "083456789012",
}


def tambah_kontak(daftar: dict, nama: str, nomor: str) -> None:
    """
    Menambahkan kontak baru (atau memperbarui nomor jika nama sudah ada).

    Parameter:
        daftar (dict): dictionary kontak.
        nama (str): nama kontak.
        nomor (str): nomor telepon kontak.
    """
    daftar[nama] = nomor
    print(f"Kontak '{nama}' berhasil disimpan.")


def cari_kontak(daftar: dict, nama: str) -> None:
    """
    Mencari nomor telepon berdasarkan nama menggunakan .get().

    Parameter:
        daftar (dict): dictionary kontak.
        nama (str): nama kontak yang dicari.
    """
    nomor = daftar.get(nama, "Kontak tidak ditemukan")
    print(f"Hasil cari '{nama}': {nomor}")


def tampilkan_semua(daftar: dict) -> None:
    """
    Menampilkan seluruh kontak yang tersimpan.

    Parameter:
        daftar (dict): dictionary kontak.
    """
    print("\n--- DAFTAR KONTAK ---")
    if not daftar:
        print("(belum ada kontak)")
        return
    for urutan, (nama, nomor) in enumerate(daftar.items(), start=1):
        print(f"{urutan}. {nama:<10} : {nomor}")


# Demonstrasi penggunaan
print("--- KATALOG KONTAK ---")
tampilkan_semua(kontak)

print("\n[1] Menambahkan kontak baru")
tambah_kontak(kontak, "Sasuka", "084567890123")

print("\n[2] Mencari kontak dengan .get()")
cari_kontak(kontak, "Naruto")
cari_kontak(kontak, "Itachi")

print("\n[3] Menampilkan seluruh kontak")
tampilkan_semua(kontak)
