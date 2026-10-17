# Pemrograman Web - Tugas & Pertemuan

Repositori ini adalah kumpulan materi tugas pertemuan mata kuliah Pemrograman Web (oleh Erhan Kurniawan / hanxx166). Struktur direka agar setiap pertemuan / tugas berada di folder terpisah dan akan di-push secara berkala.

Tujuan README ini:
- Menjelaskan struktur proyek di root
- Menunjukkan cara menjalankan preview lokal
- Memberi panduan format folder tugas agar konsisten
- Menyediakan langkah cepat untuk kontribusi/commit

---

## Ringkasan singkat
Platform ini berisi kumpulan latihan HTML/CSS/JavaScript untuk tiap pertemuan (tugas1, tugas2, ...). Saat ini bahasa utama adalah JavaScript, HTML, dan CSS. Setiap folder pertemuan berisi halaman contoh (index.html), stylesheet, dan skrip interaktif.

Repo bersifat iteratif: setiap tugas/pertemuan ditambahkan pada folder baru dengan nama yang jelas (mis. `Nama_NIM_pertemuanX`).

---

## Struktur top-level (yang ada saat ini)
```
ErhanKurniawan_124140217_pertemuan1/   # Tugas/pertemuan 1 (index.html, style.css, script.js, modul/...)
ErhanKurniawan_124140217_pertemuan2/   # Tugas/pertemuan 2 (README, dashboard-student/...)
docs/                                  # Dokumentasi pendukung (screenshot, catatan)
```

Catatan: isi folder di atas adalah representasi saat commit terakhir. Folder baru untuk pertemuan/tugas berikutnya akan ditambahkan sesuai jadwal.

---

## Contoh isi pertemuan (konvensi yang disarankan)
Setiap folder pertemuan sebaiknya mengikuti pola ini:

```
<Nama>_<NIM>_pertemuan<no>/
  README.md         # Penjelasan singkat tugas: tujuan, cara lihat, catatan
  index.html        # Halaman utama untuk preview tugas
  style.css         # CSS khusus tugas (atau css/ folder)
  script.js         # JS khusus tugas (atau js/ folder)
  modul/            # (opsional) sub-latihan/latihan tambahan
  assets/           # (opsional) gambar, icon, font lokal
  screen.png        # (opsional) screenshot hasil render untuk docs
```

Panduan singkat untuk README folder tugas:
- Tuliskan tujuan singkat tugas
- Jelaskan cara menjalankan/preview file (contoh perintah)
- Cantumkan sumber referensi atau catatan penting (mis. browser yang direkomendasikan)

---

## Cara preview / menjalankan secara lokal
Karena ini repo statis (HTML/CSS/JS), cara termudah adalah membuka `index.html` langsung di browser atau menjalankan server statis sederhana.

Opsi 1 - buka langsung (file://):
- Buka `ErhanKurniawan_124140217_pertemuan1/index.html` di browser.

Opsi 2 - jalankan server statis (direkomendasikan untuk fetch/ajax atau modul import):
- Dengan Python 3 (di folder root repo):

```bash
# di terminal, pada root repo
python -m http.server 8000
# lalu buka http://localhost:8000/ErhanKurniawan_124140217_pertemuan1/
```

- Atau dengan npm `serve`:

```bash
npx serve . -p 8000
# lalu buka http://localhost:8000/ErhanKurniawan_124140217_pertemuan1/
```

---

## Cara kontribusi / penamaan commit
Workflow sederhana untuk menambah tugas baru:

1. Buat folder baru dengan format `Nama_NIM_pertemuanX`.
2. Tambahkan file `README.md` singkat di folder tersebut menjelaskan tugas.
3. Preview secara lokal dan pastikan semua asset relatif bekerja.
4. Commit dengan pesan: `tambah: pertemuanX - <Nama> <NIM>`
5. Push ke origin/main.

Contoh perintah:

```bash
git checkout -b add/pertemuan3
mkdir -p MyName_123456_pertemuan3
# tambahkan files
git add MyName_123456_pertemuan3
git commit -m "tambah: pertemuan3 - MyName 123456"
git push origin add/pertemuan3
# kemudian buat PR jika perlu
```

---

## Checklist sebelum push tugas baru
- [ ] Folder mengikuti pola penamaan
- [ ] Ada `index.html` yang bisa dipreview
- [ ] Semua asset memakai path relatif atau ada di folder assets/
- [ ] Jika perlu, sertakan `README.md` penjelasan tugas
- [ ] Sertakan screenshot di `docs/screenshots` (opsional)

---

## Rencana pengembangan / catatan untuk dosen
- Struktur ini dibuat agar mudah di-review: satu folder = satu tugas/pertemuan.
- Nanti bisa ditambahkan `SUMMARY.md` di root untuk daftar pertemuan dan status (done/in progress).
- Bila ingin deploy demo, aktifkan GitHub Pages dan arahkan ke folder root atau branch `gh-pages`.

---

## Troubleshooting & bantuan
Jika preview tidak menampilkan styling atau skrip:
- Pastikan membuka lewat server (mis. python -m http.server) bila menggunakan module import, fetch, atau CORS.
- Cek console browser untuk error JS atau 404 asset.

---
