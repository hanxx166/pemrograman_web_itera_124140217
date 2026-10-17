/* ============================================================
   js/app.js
   Logika inti: Class TaskItem & DashboardApp
   Memenuhi: Classes, Destructuring param, Spread (immutable),
             Async/Await, Template Literals, Array Methods
   ============================================================ */

// ------------------------------------------------------------
// CLASS TaskItem — memodelkan SATU buah tugas
// (Kriteria: Implementasi Classes + Destructuring di parameter)
// ------------------------------------------------------------
class TaskItem {
  // Destructuring langsung di parameter constructor
  constructor({
    id,
    title,
    course = "",
    isCompleted = false,
    createdAt = Date.now(),
  }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.isCompleted = isCompleted;
    this.createdAt = createdAt;
  }

  // Mengembalikan instance BARU (immutable) dengan status terbalik
  toggle() {
    return new TaskItem({ ...this, isCompleted: !this.isCompleted });
  }

  // Mengembalikan instance BARU dengan data ter-update
  update(changes = {}) {
    return new TaskItem({ ...this, ...changes });
  }

  // Render satu tugas menjadi string HTML (Template Literals)
  toHTML() {
    const doneClass = this.isCompleted ? "done" : "";
    const courseTag = this.course
      ? `<span class="task-course">${this.course}</span>`
      : "";
    const editIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`;
    const deleteIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
    return `
      <li class="task-item ${doneClass}" data-id="${this.id}">
        <button class="task-check" data-action="toggle" aria-label="Tandai selesai">✓</button>
        <div class="task-info">
          <div class="task-title">${this.title}</div>
          ${courseTag}
        </div>
        <div class="task-actions">
          <button class="icon-btn" data-action="edit" title="Edit" aria-label="Edit tugas">${editIcon}</button>
          <button class="icon-btn" data-action="delete" title="Hapus" aria-label="Hapus tugas">${deleteIcon}</button>
        </div>
      </li>`;
  }
}

// ------------------------------------------------------------
// CLASS DashboardApp — otak aplikasi (state, storage, fetch)
// ------------------------------------------------------------
class DashboardApp {
  static STORAGE_KEY = "itera-hub-tasks";

  constructor() {
    this.tasks = []; // state utama (array of TaskItem)
    this.currentFilter = "all";
    this.editingId = null; // id tugas yang sedang diedit
    this.schedule = this.#buildSchedule(); // jadwal mingguan statis
  }

  // ---------- JADWAL KULIAH MINGGUAN (statis) ----------
  // day mengikuti Date.getDay(): 1 = Senin ... 6 = Sabtu
  // course = null artinya slot kosong (ditampilkan "Free~")
  #buildSchedule() {
    return [
      {
        day: 1,
        label: "MON",
        slots: [
          { time: "07:30", course: null },
          { time: "09:20", course: null },
          {
            time: "13:00",
            course: { name: "Inteligensi Buatan", code: "RA", room: "GK2-123" },
          },
        ],
      },
      {
        day: 2,
        label: "TUE",
        slots: [
          {
            time: "07:30",
            course: {
              name: "Pengembangan Aplikasi Web",
              code: "RA",
              room: "GK2-405",
            },
          },
          {
            time: "09:20",
            course: { name: "Kapita Selekta", code: "RA", room: "GK2-206" },
          },
          { time: "13:00", course: null },
        ],
      },
      {
        day: 3,
        label: "WED",
        slots: [
          {
            time: "07:30",
            course: {
              name: "Praktikum Jaringan Komputer",
              code: "",
              room: "Lab IoT",
            },
          },
          { time: "09:20", course: null },
          {
            time: "13:00",
            course: { name: "Machine Learning", code: "RB", room: "F307" },
          },
        ],
      },
      {
        day: 4,
        label: "THU",
        slots: [
          { time: "07:30", course: null },
          { time: "09:20", course: null },
          {
            time: "13:00",
            course: {
              name: "Metodologi Penelitian",
              code: "RD",
              room: "GK2-224",
            },
          },
        ],
      },
      {
        day: 5,
        label: "FRI",
        slots: [
          {
            time: "07:30",
            course: { name: "Sistem Informasi", code: "RA", room: "GK2-221" },
          },
          {
            time: "09:20",
            course: { name: "MPTI Online", code: "", room: "" },
          },
          {
            time: "13:30",
            course: { name: "Jaringan Komputer", code: "RC", room: "GK2-303" },
          },
        ],
      },
      {
        day: 6,
        label: "SAT",
        slots: [
          { time: "07:30", course: null },
          { time: "09:20", course: null },
          { time: "13:00", course: null },
        ],
      },
    ];
  }

  // ---------- INISIALISASI APLIKASI ----------
  async init() {
    await this.loadTasks();
    await Promise.all([this.fetchWeather(), this.fetchQuote()]);
  }

  // ---------- PENGELOLAAN localStorage ----------
  async loadTasks() {
    const saved = localStorage.getItem(DashboardApp.STORAGE_KEY);

    if (saved) {
      // Sudah ada data → muat dari localStorage
      const parsed = JSON.parse(saved);
      this.tasks = parsed.map((t) => new TaskItem(t));
      return;
    }

    // Kosong → ambil data simulasi dari API JSONPlaceholder
    const initial = await this.fetchInitialTasks();
    this.tasks = initial;
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem(DashboardApp.STORAGE_KEY, JSON.stringify(this.tasks));
  }

  // ---------- CRUD TUGAS (immutable dengan Spread) ----------

  // CREATE
  addTask({ title, course = "" }) {
    const newTask = new TaskItem({
      id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: title.trim(),
      course: course.trim(),
    });
    // Spread operator → buat array BARU (immutable)
    this.tasks = [...this.tasks, newTask];
    this.saveTasks();
  }

  // UPDATE (edit teks / ganti status)
  updateTask(id, changes = {}) {
    // map() + spread → data lama tidak dimutasi langsung
    this.tasks = this.tasks.map((task) =>
      task.id === id ? task.update(changes) : task,
    );
    this.saveTasks();
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? task.toggle() : task,
    );
    this.saveTasks();
  }

  // DELETE
  deleteTask(id) {
    // filter() → buat array baru tanpa item yang dihapus
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  // ---------- FILTER & STATISTIK (Array Methods) ----------
  getFilteredTasks() {
    if (this.currentFilter === "active") {
      return this.tasks.filter((t) => !t.isCompleted);
    }
    if (this.currentFilter === "done") {
      return this.tasks.filter((t) => t.isCompleted);
    }
    return this.tasks;
  }

  getStats() {
    // reduce() untuk menghitung statistik dalam satu kali iterasi
    return this.tasks.reduce(
      (acc, task) => {
        acc.total += 1;
        task.isCompleted ? (acc.done += 1) : (acc.pending += 1);
        return acc;
      },
      { total: 0, done: 0, pending: 0 },
    );
  }

  // Seluruh jadwal mingguan (dipakai untuk render kartu per hari)
  getWeeklySchedule() {
    return this.schedule;
  }

  // ---------- PANGGILAN API PUBLIK (Async/Await) ----------

  // Data tugas awal dari JSONPlaceholder
  async fetchInitialTasks() {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5",
      );
      const data = await res.json();
      // map() JSONPlaceholder → TaskItem
      return data.map(
        ({ id, title, completed }) =>
          new TaskItem({
            id: `jp-${id}`,
            title,
            course: "Simulasi",
            isCompleted: completed,
          }),
      );
    } catch {
      return [];
    }
  }

  // Cuaca ITERA via Open-Meteo
  async fetchWeather() {
    const body = document.getElementById("weatherBody");
    try {
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true";
      const res = await fetch(url);
      const { current_weather: cw } = await res.json(); // Destructuring
      body.innerHTML = `
        <div class="weather-temp">${Math.round(cw.temperature)}°C</div>
        <div class="weather-desc">${this.#weatherLabel(cw.weathercode)}</div>
        <div class="weather-meta">💨 Angin ${cw.windspeed} km/jam</div>`;
    } catch {
      body.innerHTML = `<div class="weather-desc">Gagal memuat cuaca 😔</div>`;
    }
  }

  #weatherLabel(code) {
    if (code === 0) return "☀️ Cerah";
    if (code <= 2) return "🌤️ Sebagian Berawan";
    if (code === 3) return "☁️ Berawan";
    if (code <= 48) return "🌫️ Berkabut";
    if (code <= 57) return "🌦️ Gerimis";
    if (code <= 67) return "🌧️ Hujan";
    if (code <= 82) return "⛈️ Hujan Deras";
    return "⛈️ Badai Petir";
  }

  // Kutipan harian via DummyJSON
  async fetchQuote() {
    const textEl = document.getElementById("quoteText");
    const authorEl = document.getElementById("quoteAuthor");
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const { quote, author } = await res.json(); // Destructuring
      textEl.textContent = quote;
      authorEl.textContent = `— ${author}`;
    } catch {
      textEl.textContent = "Tetap semangat, meski kutipan gagal dimuat.";
      authorEl.textContent = "— Sistem";
    }
  }
}

// Daftar mata kuliah untuk dropdown Manajer Tugas
// (diambil dari jadwal + opsi tambahan Kapita Selekta)
export const COURSES = [
  "Pengembangan Aplikasi Web",
  "Inteligensi Buatan",
  "Kapita Selekta",
  "Praktikum Jaringan Komputer",
  "Machine Learning",
  "Metodologi Penelitian",
  "Sistem Informasi",
  "MPTI Online",
  "Jaringan Komputer",
];

// Ekspor agar bisa dipakai main.js
export { TaskItem, DashboardApp };
