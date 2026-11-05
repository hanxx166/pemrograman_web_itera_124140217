# ===================================================
# Berkas: main.py
# Deskripsi: Menguji modul password_gen
# ===================================================
import password_gen

print("--- UJI GENERATOR PASSWORD ACAK ---")

# Panjang default (8 karakter)
print("Default (8)  :", password_gen.buat_password_acak())

# Panjang kustom
for panjang in (6, 12, 16):
    pw = password_gen.buat_password_acak(panjang)
    print(f"Panjang {panjang:<2}   : {pw} ({len(pw)} karakter)")
