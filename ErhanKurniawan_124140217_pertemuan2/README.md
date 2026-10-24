# Praktikum PAW Pertemuan 2 - JavaScript Next Gen (ES6+)

**Program Studi Teknik Informatika - Institut Teknologi Sumatera**
**T.A. 2026/2027 Gasal**

| --------------- | ------------------------------- |
| **Nama** | Erhan Kurniawan |
| **NIM** | 124140217 |
| **Mata Kuliah** | Pengembangan Aplikasi Web (PAW) |
| **Pertemuan** | 02 - JavaScript Next Gen (ES6+) |

Repository ini berisi pengerjaan 5 Latihan Modul dan Tugas Personal Dashboard untuk Pertemuan 2.

---

## Struktur Folder

```text
ErhanKurniawan_124140217_pertemuan2/
├── README.md
├── modul/
│   └── latihan-js-next-gen/               # BAGIAN A: 5 Latihan ES6+
│       ├── index.html
│       └── js/
│           ├── app.js                     # 10 fungsi demo (export)
│           └── main.js                    # gateway: import & render ke HTML
└── dashboard-student/                     # BAGIAN B: Tugas Personal Dashboard
    ├── index.html
    ├── assets/
    │   └── Logo_informatika_itera-removebg-preview.png
    ├── css/
    │   └── style.css
    └── js/
        ├── components/
        │   └── toggle.js                  # komponen toggle dark/light mode
        ├── app.js                         # class TaskItem & class DashboardApp
        └── main.js                        # entry point, render UI, event listener
```

---

## BAGIAN A - 5 Latihan Modul (JavaScript Next Gen / ES6+)

Seluruh latihan dikerjakan dalam satu project modular (`modul/latihan-js-next-gen`) mengikuti panduan arsitektur modul: logika berada di `js/app.js` sebagai fungsi `export`, dan `js/main.js` bertindak sebagai gateway yang mengimpor serta merender hasilnya ke halaman web saat tombol "Run Demo" diklik.

| No  | Topik Modul                                        | Poin Latihan yang Dijawab                                                                                                                         | Fungsi Demo (`js/app.js`)                                     |
| --- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1   | Template Literals (+ Let, Const & Arrow Functions) | Error reassign `const`; perbandingan `var` vs `let/const` dalam block scope; arrow function berbagai sintaks; template literals untuk HTML string | `demoVariables`, `demoArrowFunctions`, `demoTemplateLiterals` |
| 2   | Destructuring & Spread/Rest                        | Destructuring nested 3 level; rest parameters (statistik min, max, average); merge 3 object + override; destructuring dalam loop `for...of`       | `demoDestructuring`, `demoSpreadRest`                         |
| 3   | Classes & Object Literals                          | Class `Product` + inheritance `DigitalProduct`/`PhysicalProduct`; getter & setter; computed property names; default parameters + destructuring    | `demoClasses`, `demoObjectLiterals`, `demoDefaultParams`      |
| 4   | Modern Array Methods                               | `groupBy` dengan `reduce()`; rata-rata array of objects; `flat()` struktur bersarang; chaining `filter` + `map` + `reduce`                        | `demoArrayMethods`                                            |
| 5   | Async Programming (Promise & Async/Await)          | Fetch multi-endpoint (`Promise.all`); retry + exponential backoff; loading states; error boundary; pagination; debounced search                   | `demoAsyncAwait`                                              |

### Cara Menjalankan Bagian A

```bash
cd modul/latihan-js-next-gen
python -m http.server 8000
```

Buka `http://localhost:8000` pada browser, kemudian klik tombol **Run Demo**.
_(Wajib menggunakan local server atau Live Server karena project menggunakan ES Modules)._

---

## BAGIAN B - Tugas Personal Dashboard: "ITERA Student Hub"

Lokasi: `dashboard-student/`

### 1. Penjelasan Singkat Fungsi Aplikasi & Fitur-Fiturnya

**ITERA Student Hub** adalah personal dashboard yang membantu mahasiswa ITERA mengorganisir produktivitas akademik sehari-hari dalam satu halaman bergaya Bento Grid: memantau jadwal kuliah hari ini, mengelola daftar tugas (CRUD), melihat informasi cuaca kampus secara real-time, serta membaca kutipan motivasi harian.

**Daftar Fitur:**

| Fitur                      | Keterangan                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| Manajer Tugas (CRUD)       | Menambah, mengedit, menandai selesai, dan menghapus tugas                                            |
| Dropdown Mata Kuliah       | Memilih mata kuliah dari daftar saat menambah tugas agar data lebih terstruktur                      |
| Penyimpanan `localStorage` | Data tugas & preferensi tema tetap tersimpan meski browser ditutup                                   |
| Inisialisasi Data dari API | Saat pertama kali dibuka, daftar tugas diisi dari JSONPlaceholder sebelum disimpan ke `localStorage` |
| Jadwal Kuliah Hari Ini     | Daftar kelas otomatis menyesuaikan hari aktif (Array Methods `filter`)                               |
| Widget Cuaca Kampus        | Suhu & kondisi real-time kampus ITERA, Lampung Selatan (API Open-Meteo)                              |
| Kutipan Harian             | Motivasi acak setiap kali halaman dimuat (API DummyJSON)                                             |
| Statistik & Progress Bar   | Total / selesai / tersisa, dihitung dengan `reduce()`                                                |
| Filter Tugas               | Tab Semua / Aktif / Selesai                                                                          |
| Dark / Light Mode          | Toggle tema dengan transisi halus, preferensi tersimpan di `localStorage`                            |
| Responsif                  | Bento Grid menyesuaikan layout desktop, tablet, dan mobile                                           |

**API Publik yang Digunakan (Gratis, Tanpa API Key):**

| API              | Endpoint                                                                                      | Kegunaan                     |
| ---------------- | --------------------------------------------------------------------------------------------- | ---------------------------- |
| Open-Meteo       | `https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true` | Widget cuaca kampus ITERA    |
| DummyJSON Quotes | `https://dummyjson.com/quotes/random`                                                         | Kutipan motivasi harian      |
| JSONPlaceholder  | `https://jsonplaceholder.typicode.com/todos?_limit=5`                                         | Inisialisasi data tugas awal |

---

### 2. Screenshot Antarmuka Aplikasi

> Catatan: File screenshot diletakkan di folder `docs/screenshots/pertemuan2/`.

| No  | Nama File              | Keterangan                                             |
| --- | ---------------------- | ------------------------------------------------------ |
| 1   | `dashboard-dark.png`   | Tampilan utama dashboard (Dark Mode, desktop)          |
| 2   | `dashboard-light.png`  | Tampilan utama dashboard (Light Mode)                  |
| 3   | `dashboard-edit.png`   | Mode edit tugas (form terisi data tugas yang dipilih)  |
| 4   | `dashboard-mobile.png` | Tampilan responsif pada ukuran layar mobile (DevTools) |

**Gambar 1 - Dashboard (Dark Mode)**

![Dashboard Dark Mode](/docs/screenshots/pertemuan2/dashboard-dark.png)

**Gambar 2 - Dashboard (Light Mode)**

![Dashboard Light Mode](/docs/screenshots/pertemuan2/dashboard-light.png)

**Gambar 3 - Mode Edit Tugas**

![Mode Edit Tugas](/docs/screenshots/pertemuan2/dashboard-edit.png)

**Gambar 4 - Tampilan Mobile (Responsif)**

![Tampilan Mobile](/docs/screenshots/pertemuan2/dashboard-mobile.png)

---

### 3. Daftar Fitur ES6+ yang Diimplementasikan beserta Baris Kode

> Catatan: Nomor baris merujuk pada versi final kode di repository ini. Jika ada penyuntingan, sesuaikan nomor baris melalui penunjuk baris (line gutter) di VS Code.

| No  | Fitur ES6+                        | File & Baris                                     | Implementasi                                                                      |
| --- | --------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- |
| 1   | `let` & `const`                   | Seluruh file `.js`                               | Tidak ada penggunaan `var` di seluruh project                                     |
| 2   | Arrow Functions (>= 3)            | `main.js:15, 25, 36`; `components/toggle.js`     | `renderTasks`, `renderStats`, listener tema, event delegation                     |
| 3   | Template Literals                 | `app.js:38-49`, `main.js:44-52`                  | `TaskItem.toHTML()`, rendering jadwal kuliah & dropdown mata kuliah               |
| 4   | Async / Await                     | `app.js:80, 86, 175, 194, 207`                   | `init()`, `loadTasks()`, `fetchInitialTasks()`, `fetchWeather()`, `fetchQuote()`  |
| 5   | Classes                           | `app.js:12`, `app.js:56`                         | `class TaskItem`, `class DashboardApp`                                            |
| 6   | Destructuring di parameter fungsi | `app.js:14, 109, 180, 199`; `main.js:26`         | Constructor `TaskItem`, `addTask`, mapping response API                           |
| 7   | Spread Operator (immutable state) | `app.js:24, 29, 116`                             | `toggle()`, `update()`, `addTask()` membuat array/objek baru                      |
| 8   | Modern Array Methods              | `app.js:123, 139, 146, 156, 169, 180`; `main.js` | `map`, `filter`, `reduce` untuk CRUD, filter tab, statistik, & render dropdown MK |
| 9   | `localStorage`                    | `app.js:87, 103`; `components/toggle.js`         | Menyimpan data tugas, preferensi tema (dark/light)                                |
| 10  | `Promise.all` (paralel)           | `app.js:82`                                      | Fetch cuaca & kutipan dijalankan bersamaan saat inisialisasi                      |

---

## Cara Menjalankan Tugas Dashboard

Karena project menggunakan ES Modules (`import` / `export`), aplikasi wajib dijalankan melalui local server:

**Opsi 1 - Python:**

```bash
cd dashboard-student
python -m http.server 8000
```

Lalu buka `http://localhost:8000` pada browser.

**Opsi 2 - VS Code Live Server:**

Install extension Live Server, klik kanan `dashboard-student/index.html`, lalu pilih **Open with Live Server**.

### Alur Pengujian Fitur

1. **CRUD Tugas:** tambah tugas, edit, centang selesai, dan hapus.
2. **Persistensi:** refresh halaman (`F5`), data tugas tidak hilang (tersimpan di `localStorage`).
3. **API:** widget cuaca & kutipan terisi otomatis saat halaman dimuat.
4. **Tema:** klik ikon bulan/matahari di pojok kanan atas, tema berganti & tersimpan.
5. **Filter:** klik tab Aktif / Selesai, daftar tugas menyesuaikan.

---

## Teknologi

- HTML5 & CSS3 (Custom Properties, CSS Grid, Flexbox)
- Vanilla JavaScript (ES6+) - tanpa framework
- Google Fonts - Plus Jakarta Sans & JetBrains Mono
- API Publik - Open-Meteo, DummyJSON, JSONPlaceholder

---

<div align="center">

**© 2026 · Tugas 2 Praktikum Pengembangan Aplikasi Web · Teknik Informatika ITERA**

</div>
