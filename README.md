# Tugas Praktikum Pengembangan Aplikasi Web (PAW)

**Program Studi Teknik Informatika - Institut Teknologi Sumatera**
**T.A. 2026/2027 Gasal**

## Identitas

- **Nama Lengkap:** Erhan Kurniawan
- **NIM:** 124140217
- **Kelas Praktikum:** RA
- **Repository:** [pemrograman_web_itera_124140217](https://github.com/hanxx166/pemrograman_web_itera_124140217)

Repository ini berisi kumpulan tugas praktikum Pengembangan Aplikasi Web (PAW).
Setiap pertemuan memiliki folder sendiri dengan README detail di dalamnya.

---

## Ringkasan Tugas

| Pertemuan | Topik                      | Aplikasi                            | Stack                          | README                                                                                              |
| :-------- | :------------------------- | :---------------------------------- | :----------------------------- | :-------------------------------------------------------------------------------------------------- |
| 1         | HTML, CSS & JavaScript Dasar | Mini POS - Kasir & Keranjang Belanja | Vanilla JS + localStorage      | [pertemuan1/README.md](./ErhanKurniawan_124140217_pertemuan1/README.md)                             |
| 2         | JavaScript Next Gen (ES6+) | ITERA Student Hub - Personal Dashboard | ES6 Modules + Fetch API        | [pertemuan2/README.md](./ErhanKurniawan_124140217_pertemuan2/README.md)                             |
| 3         | React                      | Aplikasi Manajemen Buku Pribadi      | React 19 + Vite + Vitest       | [pertemuan3/README.md](./ErhanKurniawan_124140217_pertemuan3/README.md)                             |
| -         | _Pertemuan 4 (Mengikuti)_  | -                                   | -                              | -                                                                                                   |

> Screenshot setiap aplikasi tersedia di folder `docs/screenshots/pertemuan{N}/`
> dan ditampilkan pada README masing-masing pertemuan.

---

## Struktur Repository

```text
.
├── README.md                            # file ini (index semua pertemuan)
├── docs/
│   └── screenshots/                     # screenshot per pertemuan
│       ├── pertemuan1/
│       ├── pertemuan2/
│       └── pertemuan3/
├── ErhanKurniawan_124140217_pertemuan1/ # Pertemuan 1: Mini POS (Vanilla JS)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── modul/
├── ErhanKurniawan_124140217_pertemuan2/ # Pertemuan 2: Dashboard (ES6+)
│   ├── modul/latihan-js-next-gen/
│   └── dashboard-student/
├── ErhanKurniawan_124140217_pertemuan3/ # Pertemuan 3: React (Vite)
│   ├── src/
│   │   ├── components/BookForm/         # unit test (2 test)
│   │   ├── components/BookList/         # unit test (3 test)
│   │   ├── components/BookFilter/
│   │   ├── components/Toast/
│   │   ├── context/BookContext.jsx      # Context API + useReducer
│   │   ├── hooks/                       # useLocalStorage, useBookStats
│   │   └── pages/                       # Home, Stats (React Router)
│   └── public/
└── ErhanKurniawan_124140217_pertemuan4/ # slot pertemuan berikutnya
```

---

## Cara Menjalankan

### Pertemuan 1 - Mini POS (Vanilla JS)

Tidak memerlukan server. Buka langsung di browser:

```bash
# buka index.html via Live Server (VS Code) atau double-click file
ErhanKurniawan_124140217_pertemuan1/index.html
```

### Pertemuan 2 - Dashboard & Latihan Modules (ES6+)

Memerlukan local server karena menggunakan ES Modules:

```bash
cd ErhanKurniawan_124140217_pertemuan2/dashboard-student
python -m http.server 8000
# buka http://localhost:8000
```

Latihan modul:

```bash
cd ErhanKurniawan_124140217_pertemuan2/modul/latihan-js-next-gen
python -m http.server 8000
```

### Pertemuan 3 - Manajemen Buku Pribadi (React + Vite)

```bash
cd ErhanKurniawan_124140217_pertemuan3
npm install
npm run dev
# buka http://localhost:5173
```

Unit test:

```bash
npx vitest run   # jalankan semua test sekali (5 test)
```

---

## Roadmap Pertemuan

| No | Status    | Topik                        |
| :- | :-------- | :--------------------------- |
| 1  | Selesai   | HTML, CSS & JavaScript Dasar |
| 2  | Selesai   | JavaScript Next Gen (ES6+)   |
| 3  | Selesai   | React                        |
| 4  | Belum ada | -                            |
| 5  | Belum ada | -                            |

Daftar ini akan diperbarui setiap kali pertemuan baru selesai dikerjakan.

---

<div align="center">

**© 2026 · Praktikum Pengembangan Aplikasi Web · Teknik Informatika ITERA**

</div>
