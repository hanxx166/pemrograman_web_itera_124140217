# ===================================================
# Berkas: latihan3_tebak.py
# Deskripsi: Game tebak angka rahasia dengan while loop dan break
# ===================================================

angka_rahasia = 7

print("--- GAME TEBAK ANGKA ---")
print("Tebak angka rahasia yang saya pikirkan!")

while True:
    tebakan = int(input("Masukkan tebakanmu: "))

    if tebakan < angka_rahasia:
        print("Terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break
