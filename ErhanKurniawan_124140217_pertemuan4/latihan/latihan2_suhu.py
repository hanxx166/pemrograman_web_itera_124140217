# ===================================================
# Berkas: latihan2_suhu.py
# Deskripsi: Kalkulator konversi suhu Celcius -> Fahrenheit & Kelvin
# ===================================================

print("--- KALKULATOR KONVERSI SUHU ---")

# Input wajib di-casting ke float karena input() selalu menghasilkan str
celcius = float(input("Masukkan suhu dalam Celcius (°C): "))

# Rumus konversi
fahrenheit = celcius * 9 / 5 + 32
kelvin = celcius + 273.15

# Tampilkan hasil dengan f-string, 2 angka di belakang koma
print("\n--- HASIL KONVERSI ---")
print(f"Celcius    : {celcius:.2f} °C")
print(f"Fahrenheit : {fahrenheit:.2f} °F")
print(f"Kelvin     : {kelvin:.2f} K")