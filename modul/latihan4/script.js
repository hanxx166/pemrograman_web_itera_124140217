// ============================================================
// SOAL 1 & 2: Todo List dengan validasi + localStorage
// ============================================================
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function simpanTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const list = document.getElementById("list-todo");
  if (todos.length === 0) {
    list.innerHTML = `<li class="text-gray-500 italic">Belum ada tugas.</li>`;
    return;
  }
  list.innerHTML = todos
    .map(
      (todo, i) => `
    <li class="flex items-center gap-2 p-2 bg-gray-100 rounded">
      <input type="checkbox" ${todo.selesai ? "checked" : ""} onchange="toggleTodo(${i})">
      <span class="flex-1 ${todo.selesai ? "line-through text-gray-400" : ""}">${todo.teks}</span>
      <button onclick="hapusTodo(${i})" class="bg-red-500 text-white px-2 py-1 rounded text-sm">Hapus</button>
    </li>
  `,
    )
    .join("");
}

document.getElementById("btn-tambah-todo").addEventListener("click", () => {
  const input = document.getElementById("input-todo");
  const teks = input.value.trim();

  if (teks.length < 3) {
    alert("Tugas minimal 3 karakter!");
    return;
  }

  todos.push({ teks, selesai: false });
  simpanTodos();
  renderTodos();
  input.value = "";
});

function toggleTodo(index) {
  todos[index].selesai = !todos[index].selesai;
  simpanTodos();
  renderTodos();
}

function hapusTodo(index) {
  todos.splice(index, 1);
  simpanTodos();
  renderTodos();
}

// ============================================================
// SOAL 3, 4, 5: Fetch API + Search + Pagination + Dark Mode
// Sumber data: jsonplaceholder (lorem/placeholder) sesuai modul
// ============================================================
let semuaPosts = [];
let postsTerfilter = [];
let halaman = 1;
const ITEM_PER_HALAMAN = 5;
const JUMLAH_POST = 0; // 0 = semua post dari API (seperti awal). Isi 10 kalau mau dibatasi 10.
let darkMode = false;

async function ambilPosts() {
  const output = document.getElementById("api-output");
  output.innerHTML = `<p class="italic text-gray-500">⏳ Memuat data...</p>`;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    semuaPosts = JUMLAH_POST > 0 ? data.slice(0, JUMLAH_POST) : data;
    postsTerfilter = semuaPosts;
    halaman = 1;
    renderPosts();
  } catch (error) {
    output.innerHTML = `<p class="text-red-500">Gagal memuat data: ${error.message}</p>`;
  }
}

function renderPosts() {
  const awal = (halaman - 1) * ITEM_PER_HALAMAN;
  const dataHalaman = postsTerfilter.slice(awal, awal + ITEM_PER_HALAMAN);
  const totalHalaman = Math.ceil(postsTerfilter.length / ITEM_PER_HALAMAN);

  document.getElementById("api-output").innerHTML = dataHalaman
    .map(
      (post) => `
    <div class="p-3 mb-2 bg-gray-100 rounded">
      <h4 class="font-semibold text-sm">${post.title}</h4>
      <p class="text-xs text-gray-600">${post.body}</p>
    </div>
  `,
    )
    .join("");

  document.getElementById("halaman-info").textContent =
    `Hal ${halaman} / ${totalHalaman}`;
  document.getElementById("btn-prev").disabled = halaman <= 1;
  document.getElementById("btn-next").disabled = halaman >= totalHalaman;
}

document.getElementById("btn-fetch").addEventListener("click", ambilPosts);

// SOAL 3: Search/filter berdasarkan title
document.getElementById("input-search").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  postsTerfilter = semuaPosts.filter((p) =>
    p.title.toLowerCase().includes(keyword),
  );
  halaman = 1;
  renderPosts();
});

// SOAL 5: Pagination
document.getElementById("btn-prev").addEventListener("click", () => {
  if (halaman > 1) {
    halaman--;
    renderPosts();
  }
});

document.getElementById("btn-next").addEventListener("click", () => {
  const totalHalaman = Math.ceil(postsTerfilter.length / ITEM_PER_HALAMAN);
  if (halaman < totalHalaman) {
    halaman++;
    renderPosts();
  }
});

// SOAL 4: Dark mode toggle (versi baru — kontras diperbaiki via CSS .dark)
document.getElementById("btn-dark-mode").addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  document.getElementById("btn-dark-mode").textContent = darkMode
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

// Init
renderTodos();
ambilPosts();
