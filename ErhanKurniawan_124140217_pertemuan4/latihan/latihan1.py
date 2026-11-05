# ===================================================
# Berkas: latihan1.py
# Deskripsi: Identitas diri & eksperimen fungsi print()
# ===================================================

# Data profil (ganti dengan data kamu)
nama = "Erhan Kurniawan"
nim = "12140217"
angkatan = "2024"
minat_penelitian = "Cyber & AI"

# 1. Cetak data profil dengan print()
print("----- DATA PROFIL -----")
print("Nama             :", nama)
print("NIM              :", nim)
print("Angkatan         :", angkatan)
print("Minat Penelitian :", minat_penelitian)

# 2. Eksperimen parameter sep=' | '
print("\n--- EKSPERIMEN sep ---")
print("Nama", "NIM", "Angkatan", "Minat Penelitian", sep=" | ")
print(nama, nim, angkatan, minat_penelitian, sep=" | ")

# 3. Kartu identitas berbingkai '#' memakai escape character (\n)
lebar = 46
garis = "#" * lebar
judul = "KARTU IDENTITAS MAHASISWA".center(lebar - 2)


def baris(label, isi):
    """Membuat satu baris isi kartu dengan bingkai # di kiri dan kanan."""
    teks = f"{label:<17}: {isi}"
    return "# " + teks.ljust(lebar - 4) + " #"


kartu = (
    "\n-- KARTU IDENTITAS --\n"
    + garis
    + "\n"
    + "#"
    + judul
    + "#\n"
    + garis
    + "\n"
    + baris("Nama", nama)
    + "\n"
    + baris("NIM", nim)
    + "\n"
    + baris("Angkatan", angkatan)
    + "\n"
    + baris("Minat Penelitian", minat_penelitian)
    + "\n"
    + garis
)
print(kartu)
