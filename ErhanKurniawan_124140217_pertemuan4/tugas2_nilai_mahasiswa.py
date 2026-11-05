# ===================================================
# Berkas: tugas2_nilai_mahasiswa.py
# Deskripsi: Program pengelolaan data nilai mahasiswa
# ===================================================

# Bobot penilaian
BOBOT_UTS = 0.30
BOBOT_UAS = 0.40
BOBOT_TUGAS = 0.30

# Data mahasiswa: list berisi dictionary
data_mahasiswa = [
    {
        "nama": "Galih Sigit Satrio",
        "nim": "124140001",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88,
    },
    {
        "nama": "Rasya Khairiza",
        "nim": "124140002",
        "nilai_uts": 75,
        "nilai_uas": 70,
        "nilai_tugas": 80,
    },
    {
        "nama": "Budi Laksana",
        "nim": "124140003",
        "nilai_uts": 65,
        "nilai_uas": 60,
        "nilai_tugas": 70,
    },
    {
        "nama": "Imam Faris",
        "nim": "124140004",
        "nilai_uts": 55,
        "nilai_uas": 50,
        "nilai_tugas": 60,
    },
    {
        "nama": "Nasywa Putri",
        "nim": "124140005",
        "nilai_uts": 40,
        "nilai_uas": 35,
        "nilai_tugas": 45,
    },
    {
        "nama": "Raisa Fazila",
        "nim": "124140006",
        "nilai_uts": 90,
        "nilai_uas": 95,
        "nilai_tugas": 92,
    },
]


def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung nilai akhir berdasarkan bobot persentase.

    Parameter:
        uts (float): nilai UTS (bobot 30%).
        uas (float): nilai UAS (bobot 40%).
        tugas (float): nilai tugas (bobot 30%).

    Return:
        float: nilai akhir = 30% UTS + 40% UAS + 30% Tugas.
    """
    return (BOBOT_UTS * uts) + (BOBOT_UAS * uas) + (BOBOT_TUGAS * tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """
    Menentukan grade berdasarkan nilai akhir.

    Parameter:
        nilai_akhir (float): nilai akhir mahasiswa.

    Return:
        str: grade A, B, C, D, atau E.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def proses_data(daftar: list) -> None:
    """
    Menghitung nilai akhir dan grade, lalu menambahkannya
    ke setiap dictionary mahasiswa.

    Parameter:
        daftar (list): list berisi dictionary data mahasiswa.
    """
    for mhs in daftar:
        mhs["nilai_akhir"] = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])


def tampilkan_tabel(daftar: list) -> None:
    """
    Menampilkan data mahasiswa dalam format tabel di terminal.

    Parameter:
        daftar (list): list berisi dictionary data mahasiswa
                       yang sudah memiliki nilai_akhir dan grade.
    """
    garis = "=" * 60
    print(garis)
    print(f"{'No':<4}{'Nama':<20}{'NIM':<14}{'Nilai Akhir':>12}{'Grade':>8}")
    print(garis)
    for no, mhs in enumerate(daftar, start=1):
        print(
            f"{no:<4}{mhs['nama']:<20}{mhs['nim']:<14}"
            f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>8}"
        )
    print(garis)


def tampilkan_info(judul: str, mhs: dict) -> None:
    """
    Menampilkan informasi lengkap satu mahasiswa.

    Parameter:
        judul (str): judul yang ditampilkan.
        mhs (dict): dictionary data mahasiswa.
    """
    print(f"\n{judul}")
    print(f"  Nama        : {mhs['nama']}")
    print(f"  NIM         : {mhs['nim']}")
    print(f"  Nilai Akhir : {mhs['nilai_akhir']:.2f}")
    print(f"  Grade       : {mhs['grade']}")


# Program utama
print("--- DATA NILAI MAHASISWA ---")
proses_data(data_mahasiswa)
tampilkan_tabel(data_mahasiswa)

# Cari nilai akhir tertinggi dan terendah
tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

tampilkan_info("Mahasiswa dengan nilai akhir TERTINGGI:", tertinggi)
tampilkan_info("Mahasiswa dengan nilai akhir TERENDAH:", terendah)
