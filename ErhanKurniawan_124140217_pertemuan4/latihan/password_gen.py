# ===================================================
# Berkas: password_gen.py
# Deskripsi: Modul pembangkit password acak
# ===================================================
import random
import string


def buat_password_acak(panjang: int = 8) -> str:
    """
    Membuat password acak dari kombinasi huruf dan angka.

    Parameter:
        panjang (int): jumlah karakter password (default 8).

    Return:
        str: password acak sepanjang `panjang` karakter.
    """
    karakter = string.ascii_letters + string.digits
    return "".join(random.choice(karakter) for _ in range(panjang))


# Blok testing mandiri: hanya jalan jika file ini dieksekusi langsung
if __name__ == "__main__":
    print("[TEST MODUL] password_gen:", buat_password_acak())