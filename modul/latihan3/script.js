// ============================================================
// SOAL 1: Array 5 objek mahasiswa, tampilkan dalam tabel HTML
// ============================================================
let mahasiswa = [
  {
    nama: "Andi Pratama",
    nim: "231140001",
    jurusan: "Teknik Informatika",
    nilai: 88,
  },
  {
    nama: "Budi Santoso",
    nim: "231140002",
    jurusan: "Sistem Informasi",
    nilai: 92,
  },
  {
    nama: "Citra Dewi",
    nim: "231140003",
    jurusan: "Teknik Informatika",
    nilai: 75,
  },
  {
    nama: "Dian Lestari",
    nim: "231140004",
    jurusan: "Teknik Elektro",
    nilai: 80,
  },
  { nama: "Eka Saputra", nim: "231140005", jurusan: "Sains Data", nilai: 95 },
];

// ============================================================
// SOAL 2: Cari mahasiswa dengan nilai tertinggi
// ============================================================
function cariNilaiTertinggi(data) {
  return data.reduce((max, m) => (m.nilai > max.nilai ? m : max), data[0]);
}

// ============================================================
// SOAL 3: Filter mahasiswa di atas rata-rata
// ============================================================
function filterDiAtasRataRata(data) {
  const rataRata = data.reduce((sum, m) => sum + m.nilai, 0) / data.length;
  return {
    rataRata: rataRata.toFixed(2),
    mahasiswa: data.filter((m) => m.nilai > rataRata),
  };
}

// ============================================================
// SOAL 4: Sort berdasarkan nama (asc/desc)
// ============================================================
function urutkanNama(data, arah = "asc") {
  return [...data].sort((a, b) => {
    if (arah === "asc") return a.nama.localeCompare(b.nama);
    return b.nama.localeCompare(a.nama);
  });
}

// ============================================================
// RENDER TABEL
// ============================================================
function renderTabel() {
  const terbaik = cariNilaiTertinggi(mahasiswa);
  const { rataRata, mahasiswa: diAtasRata } = filterDiAtasRataRata(mahasiswa);

  let barisTabel = mahasiswa
    .map(
      (m, i) => `
    <tr class="border-b">
      <td class="p-2">${i + 1}</td>
      <td class="p-2">${m.nama}</td>
      <td class="p-2">${m.nim}</td>
      <td class="p-2">${m.jurusan}</td>
      <td class="p-2">${m.nilai}</td>
      <td class="p-2">
        <button onclick="editMahasiswa(${i})" class="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Edit</button>
        <button onclick="hapusMahasiswa(${i})" class="bg-red-500 text-white px-2 py-1 rounded text-sm">Hapus</button>
      </td>
    </tr>
  `,
    )
    .join("");

  document.getElementById("result").innerHTML = `
    <div class="p-4 bg-white rounded border">
      <h2 class="font-bold mb-2">Tabel Mahasiswa</h2>
      <table class="w-full text-sm border">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-2">No</th><th class="p-2">Nama</th><th class="p-2">NIM</th>
            <th class="p-2">Jurusan</th><th class="p-2">Nilai</th><th class="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>${barisTabel}</tbody>
      </table>
    </div>

    <div class="p-4 bg-green-50 rounded border">
      <h2 class="font-bold">🏆 Nilai Tertinggi</h2>
      <p>${terbaik.nama} (${terbaik.nim}) — Nilai: <strong>${terbaik.nilai}</strong></p>
    </div>

    <div class="p-4 bg-yellow-50 rounded border">
      <h2 class="font-bold">📊 Di Atas Rata-rata (${rataRata})</h2>
      <ul class="list-disc ml-6">
        ${diAtasRata.map((m) => `<li>${m.nama} — ${m.nilai}</li>`).join("")}
      </ul>
    </div>
  `;
}

// ============================================================
// SOAL 5: CRUD dengan event handler
// ============================================================
function validasiForm() {
  const nama = document.getElementById("input-nama").value.trim();
  const nim = document.getElementById("input-nim").value.trim();
  const jurusan = document.getElementById("input-jurusan").value.trim();
  const nilai = parseFloat(document.getElementById("input-nilai").value);

  if (nama.length < 3) return "Nama minimal 3 karakter!";
  if (nim === "") return "NIM wajib diisi!";
  if (jurusan === "") return "Jurusan wajib diisi!";
  if (isNaN(nilai) || nilai < 0 || nilai > 100) return "Nilai harus 0-100!";
  return null;
}

document.getElementById("btn-tambah").addEventListener("click", () => {
  const error = validasiForm();
  if (error) {
    document.getElementById("pesan-form").innerHTML =
      `<p class="text-red-500">${error}</p>`;
    return;
  }
  mahasiswa.push({
    nama: document.getElementById("input-nama").value.trim(),
    nim: document.getElementById("input-nim").value.trim(),
    jurusan: document.getElementById("input-jurusan").value.trim(),
    nilai: parseFloat(document.getElementById("input-nilai").value),
  });
  resetForm();
  renderTabel();
});

function editMahasiswa(index) {
  const m = mahasiswa[index];
  document.getElementById("edit-index").value = index;
  document.getElementById("input-nama").value = m.nama;
  document.getElementById("input-nim").value = m.nim;
  document.getElementById("input-jurusan").value = m.jurusan;
  document.getElementById("input-nilai").value = m.nilai;
  document.getElementById("btn-update").disabled = false;
}

document.getElementById("btn-update").addEventListener("click", () => {
  const error = validasiForm();
  if (error) {
    document.getElementById("pesan-form").innerHTML =
      `<p class="text-red-500">${error}</p>`;
    return;
  }
  const index = parseInt(document.getElementById("edit-index").value);
  mahasiswa[index] = {
    nama: document.getElementById("input-nama").value.trim(),
    nim: document.getElementById("input-nim").value.trim(),
    jurusan: document.getElementById("input-jurusan").value.trim(),
    nilai: parseFloat(document.getElementById("input-nilai").value),
  };
  resetForm();
  renderTabel();
});

function hapusMahasiswa(index) {
  if (confirm(`Hapus ${mahasiswa[index].nama}?`)) {
    mahasiswa.splice(index, 1);
    renderTabel();
  }
}

document.getElementById("btn-sort-asc").addEventListener("click", () => {
  mahasiswa = urutkanNama(mahasiswa, "asc");
  renderTabel();
});

document.getElementById("btn-sort-desc").addEventListener("click", () => {
  mahasiswa = urutkanNama(mahasiswa, "desc");
  renderTabel();
});

function resetForm() {
  document.getElementById("input-nama").value = "";
  document.getElementById("input-nim").value = "";
  document.getElementById("input-jurusan").value = "";
  document.getElementById("input-nilai").value = "";
  document.getElementById("edit-index").value = -1;
  document.getElementById("btn-update").disabled = true;
  document.getElementById("pesan-form").innerHTML = "";
}

// Render pertama kali
renderTabel();
