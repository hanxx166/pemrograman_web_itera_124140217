/* ============================================================
   js/main.js
   Entry point: instansiasi app, render UI, pasang event listener
   ============================================================ */
import { DashboardApp, COURSES } from "./app.js";
import { createToggle } from "./components/toggle.js";

// Buat satu instance aplikasi
const app = new DashboardApp();

// ------------------------------------------------------------
// RENDER FUNCTIONS (Template Literals + Arrow Functions)
// ------------------------------------------------------------

// Render daftar tugas ke layar
const renderTasks = () => {
  const listEl = document.getElementById("taskList");
  const emptyEl = document.getElementById("emptyState");
  const visible = app.getFilteredTasks();

  listEl.innerHTML = visible.map((task) => task.toHTML()).join("");
  emptyEl.hidden = visible.length > 0;
};

// Render statistik + progress bar (reduce)
const renderStats = () => {
  const { total, done, pending } = app.getStats(); // Destructuring
  document.getElementById("statTotal").textContent = total;
  document.getElementById("statDone").textContent = done;
  document.getElementById("statPending").textContent = pending;

  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById("progressFill").style.width = `${percent}%`;
};

// Render jadwal kuliah mingguan (kartu per hari, hari ini disorot)
const renderSchedule = () => {
  const wrap = document.getElementById("weekSchedule");
  const badge = document.getElementById("scheduleToday");
  const days = app.getWeeklySchedule();
  const today = new Date().getDay(); // 0 = Minggu ... 6 = Sabtu

  const todayLabel = days.find((d) => d.day === today)?.label;
  badge.textContent = todayLabel ? `Hari ini: ${todayLabel}` : "Akhir pekan";

  wrap.innerHTML = days
    .map(({ day, label, slots }) => {
      const isToday = day === today;
      const items = slots
        .map(({ time, course }) => {
          if (!course) {
            return `
              <li class="slot slot-free">
                <span class="slot-time">${time}</span>
                <span class="slot-course">Free~</span>
              </li>`;
          }
          const parts = [
            course.name,
            course.code ? `<span class="slot-code">${course.code}</span>` : "",
            course.room ? `<span class="slot-room">${course.room}</span>` : "",
          ].filter(Boolean);
          return `
              <li class="slot">
                <span class="slot-time">${time}</span>
                <span class="slot-course">${parts.join(" ")}</span>
              </li>`;
        })
        .join("");

      return `
        <div class="day-card${isToday ? " today" : ""}">
          <div class="day-head">
            <span class="day-name">${label}</span>
            ${isToday ? '<span class="day-flag">Hari ini</span>' : ""}
          </div>
          <ul class="slot-list">${items}</ul>
        </div>`;
    })
    .join("");
};

// Render tanggal hari ini di header
const renderDate = () => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  document.getElementById("dateNow").textContent =
    new Date().toLocaleDateString("id-ID", options);
};

// Isi dropdown mata kuliah dari daftar COURSES
const populateCourses = () => {
  const select = document.getElementById("taskCourse");
  COURSES.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
};

// Gabungkan semua render
const renderAll = () => {
  renderTasks();
  renderStats();
};

// ------------------------------------------------------------
// TEMA DARK / LIGHT — memakai komponen Toggle gaya shadcn
// Ikon SVG lucide-style (menggantikan emoji)
// ------------------------------------------------------------
const MOON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

const SUN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  themeSwitch.setPressed(theme === "dark");
  localStorage.setItem("itera-hub-theme", theme);
};

const initTheme = () => {
  const saved = localStorage.getItem("itera-hub-theme");
  applyTheme(saved || "dark");
};

// Buat komponen Toggle (variant outline) dan pasang di header
const themeSwitch = createToggle({
  variant: "outline",
  size: "default",
  pressed: true,
  className: "theme-toggle",
  "aria-label": "Ganti tema",
  icons: { on: MOON_SVG, off: SUN_SVG },
  onPressedChange: (on) => applyTheme(on ? "dark" : "light"),
});
document.getElementById("themeMount").appendChild(themeSwitch);

// ------------------------------------------------------------
// FORM TAMBAH / EDIT TUGAS
// ------------------------------------------------------------
const form = document.getElementById("taskForm");
const titleInput = document.getElementById("taskTitle");
const courseInput = document.getElementById("taskCourse");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Reset form ke mode "tambah"
const resetForm = () => {
  form.reset();
  document.getElementById("taskId").value = "";
  app.editingId = null;
  submitBtn.textContent = "+ Tambah";
  cancelBtn.hidden = true;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;

  if (app.editingId) {
    // Mode EDIT
    app.updateTask(app.editingId, { title, course: courseInput.value.trim() });
  } else {
    // Mode TAMBAH
    app.addTask({ title, course: courseInput.value });
  }

  resetForm();
  renderAll();
});

cancelBtn.addEventListener("click", resetForm);

// ------------------------------------------------------------
// AKSI TOMBOL DI SETIAP TUGAS (Event Delegation)
// Satu listener untuk semua tombol toggle/edit/hapus
// ------------------------------------------------------------
document.getElementById("taskList").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const id = btn.closest(".task-item").dataset.id; // Destructuring-like
  const action = btn.dataset.action;

  if (action === "toggle") {
    app.toggleTask(id);
    renderAll();
  }

  if (action === "delete") {
    app.deleteTask(id);
    renderAll();
  }

  if (action === "edit") {
    // Isi form dengan data tugas yang dipilih
    const task = app.tasks.find((t) => t.id === id);
    if (!task) return;
    app.editingId = id;
    titleInput.value = task.title;
    courseInput.value = task.course;
    submitBtn.textContent = "Simpan";
    cancelBtn.hidden = false;
    titleInput.focus();
  }
});

// ------------------------------------------------------------
// TAB FILTER (Semua / Aktif / Selesai)
// ------------------------------------------------------------
document.getElementById("filterTabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;

  // Pindahkan class active
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");

  app.currentFilter = tab.dataset.filter;
  renderTasks();
});

// ------------------------------------------------------------
// BOOTSTRAP APLIKASI
// ------------------------------------------------------------
const startApp = async () => {
  initTheme();
  renderDate();
  renderSchedule();
  populateCourses();
  await app.init(); // muat tasks + fetch cuaca & kutipan
  renderAll();
};

startApp();
