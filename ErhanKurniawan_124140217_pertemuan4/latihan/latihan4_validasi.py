# ===================================================
# Berkas: latihan4_validasi.py
# Deskripsi: Fungsi validasi password (min. 8 karakter & ada angka)
# ===================================================


def validasi_password(password: str) -> bool:
    """
    Memeriksa apakah password valid.

    Parameter:
        password (str): password yang akan diperiksa.

    Return:
        bool: True jika panjang minimal 8 karakter dan mengandung
              setidaknya satu angka, selain itu False.
    """
    panjang_cukup = len(password) >= 8
    ada_angka = any(char.isdigit() for char in password)
    return panjang_cukup and ada_angka


# Pengujian dengan beberapa contoh password
daftar_uji = [
    "rahasia123",  # valid
    "Python2026",  # valid
    "12345678",  # valid (8 karakter & ada angka)
    "abc123",  # tidak valid (kurang dari 8 karakter)
    "passwordku",  # tidak valid (tidak ada angka)
    "",  # tidak valid (kosong)
]

print("--- UJI VALIDASI PASSWORD ---")
for pw in daftar_uji:
    hasil = validasi_password(pw)
    status = "VALID" if hasil else "TIDAK VALID"
    print(f"{pw!r:<15} -> {status}")
