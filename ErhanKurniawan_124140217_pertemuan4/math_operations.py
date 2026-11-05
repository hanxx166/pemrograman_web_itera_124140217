# ===================================================
# Berkas: math_operations.py
# Deskripsi: Modul operasi matematika (geometri & konversi suhu)
# ===================================================

# Konstanta
PI = 3.14159


# ---------------------------------------------------
# Fungsi geometri: Persegi
# ---------------------------------------------------
def luas_persegi(sisi: float) -> float:
    """
    Menghitung luas persegi.

    Parameter:
        sisi (float): panjang sisi persegi.

    Return:
        float: luas persegi (sisi * sisi).
    """
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """
    Menghitung keliling persegi.

    Parameter:
        sisi (float): panjang sisi persegi.

    Return:
        float: keliling persegi (4 * sisi).
    """
    return 4 * sisi


# ---------------------------------------------------
# Fungsi geometri: Persegi Panjang
# ---------------------------------------------------
def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung luas persegi panjang.

    Parameter:
        panjang (float): panjang persegi panjang.
        lebar (float): lebar persegi panjang.

    Return:
        float: luas persegi panjang (panjang * lebar).
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung keliling persegi panjang.

    Parameter:
        panjang (float): panjang persegi panjang.
        lebar (float): lebar persegi panjang.

    Return:
        float: keliling persegi panjang (2 * (panjang + lebar)).
    """
    return 2 * (panjang + lebar)


# ---------------------------------------------------
# Fungsi geometri: Lingkaran
# ---------------------------------------------------
def luas_lingkaran(jari_jari: float) -> float:
    """
    Menghitung luas lingkaran.

    Parameter:
        jari_jari (float): jari-jari lingkaran.

    Return:
        float: luas lingkaran (PI * r * r).
    """
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari: float) -> float:
    """
    Menghitung keliling lingkaran.

    Parameter:
        jari_jari (float): jari-jari lingkaran.

    Return:
        float: keliling lingkaran (2 * PI * r).
    """
    return 2 * PI * jari_jari


# ---------------------------------------------------
# Fungsi konversi suhu
# ---------------------------------------------------
def celsius_ke_fahrenheit(celsius: float) -> float:
    """
    Mengonversi suhu dari Celsius ke Fahrenheit.

    Parameter:
        celsius (float): suhu dalam derajat Celsius.

    Return:
        float: suhu dalam derajat Fahrenheit (C * 9/5 + 32).
    """
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """
    Mengonversi suhu dari Celsius ke Kelvin.

    Parameter:
        celsius (float): suhu dalam derajat Celsius.

    Return:
        float: suhu dalam Kelvin (C + 273.15).
    """
    return celsius + 273.15


# Blok testing mandiri: hanya jalan jika file ini dieksekusi langsung
if __name__ == "__main__":
    print("[TEST MODUL] math_operations")
    print("Luas persegi sisi 4        :", luas_persegi(4))
    print("Luas lingkaran r=7         :", luas_lingkaran(7))
    print("100 C ke Fahrenheit        :", celsius_ke_fahrenheit(100))
