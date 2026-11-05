# ===================================================
# Berkas: main.py
# Deskripsi: Program utama untuk menguji modul math_operations
# ===================================================

# Cara impor 1: mengimpor seluruh modul (dipanggil dengan awalan nama modul)
import math_operations

# Cara impor 2: mengimpor fungsi spesifik langsung ke namespace
from math_operations import (
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
)

print("=" * 54)
print("   PENGUJIAN MODUL math_operations")
print("=" * 54)
print(f"Konstanta PI = {math_operations.PI}")

# ---------------------------------------------------
# 1. Persegi (import math_operations)
# ---------------------------------------------------
print("\n--- 1. PERSEGI ---")
for sisi in (4, 7.5, 10):
    luas = math_operations.luas_persegi(sisi)
    keliling = math_operations.keliling_persegi(sisi)
    print(f"Sisi {sisi:>5} -> Luas: {luas:>8.2f} | Keliling: {keliling:>7.2f}")

# ---------------------------------------------------
# 2. Persegi Panjang (import math_operations)
# ---------------------------------------------------
print("\n--- 2. PERSEGI PANJANG ---")
for panjang, lebar in ((10, 5), (8.5, 3.2), (20, 12)):
    luas = math_operations.luas_persegi_panjang(panjang, lebar)
    keliling = math_operations.keliling_persegi_panjang(panjang, lebar)
    print(
        f"P {panjang:>5} x L {lebar:>4} -> "
        f"Luas: {luas:>8.2f} | Keliling: {keliling:>7.2f}"
    )

# ---------------------------------------------------
# 3. Lingkaran (from math_operations import ...)
# ---------------------------------------------------
print("\n--- 3. LINGKARAN ---")
for r in (7, 10.5, 14):
    print(
        f"Jari-jari {r:>5} -> "
        f"Luas: {luas_lingkaran(r):>8.2f} | "
        f"Keliling: {keliling_lingkaran(r):>7.2f}"
    )

# ---------------------------------------------------
# 4. Konversi Suhu (from math_operations import ...)
# ---------------------------------------------------
print("\n--- 4. KONVERSI SUHU ---")
print(f"{'Celsius':>9} | {'Fahrenheit':>11} | {'Kelvin':>8}")
print("-" * 36)
for c in (0, 36.6, 100, -40):
    print(
        f"{c:>8.1f}C | {celsius_ke_fahrenheit(c):>10.2f}F | "
        f"{celsius_ke_kelvin(c):>7.2f}K"
    )
