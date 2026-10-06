// ============================================================
// SOAL 1: Data diri menggunakan const dan let
// ============================================================
const NAMA = "Erhan kurniawan"; // const: data tetap
let umur = 20; // let: bisa berubah (misal ulang tahun)
let kotaAsal = "Bandar Lampung";

document.getElementById("result").innerHTML = `
  <div class="p-4 bg-blue-50 rounded border">
    <h2 class="font-bold">1. Data Diri</h2>
    <p>Nama: <strong>${NAMA}</strong></p>
    <p>Umur: <strong>${umur}</strong></p>
    <p>Kota Asal: <strong>${kotaAsal}</strong></p>
  </div>
`;

// ============================================================
// SOAL 2: Program pengecekan kelulusan (syarat nilai >= 70)
// ============================================================
function cekKelulusan(nilai) {
  if (nilai >= 70) {
    return "Lulus ✅";
  } else {
    return "Tidak Lulus ❌";
  }
}

const nilaiUjian = 85;
document.getElementById("result").innerHTML += `
  <div class="p-4 bg-green-50 rounded border">
    <h2 class="font-bold">2. Cek Kelulusan (syarat >= 70)</h2>
    <p>Nilai: <strong>${nilaiUjian}</strong></p>
    <p>Status: <strong>${cekKelulusan(nilaiUjian)}</strong></p>
  </div>
`;

// ============================================================
// SOAL 3: Kategori umur
// anak: <12 | remaja: 12-17 | dewasa: 18-59 | lansia: >=60
// ============================================================
function cekKategoriUmur(umurInput) {
  if (umurInput < 12) {
    return "Anak-anak";
  } else if (umurInput <= 17) {
    return "Remaja";
  } else if (umurInput <= 59) {
    return "Dewasa";
  } else {
    return "Lansia";
  }
}

const contohUmur = [8, 15, 25, 65];
let hasilKategori = contohUmur
  .map((u) => `<li>Umur ${u} → <strong>${cekKategoriUmur(u)}</strong></li>`)
  .join("");

document.getElementById("result").innerHTML += `
  <div class="p-4 bg-yellow-50 rounded border">
    <h2 class="font-bold">3. Kategori Umur</h2>
    <ul class="list-disc ml-6">${hasilKategori}</ul>
  </div>
`;

// ============================================================
// SOAL 4: Switch-case konversi angka hari (1-7) ke bahasa Inggris
// ============================================================
function konversiHari(angka) {
  let namaHari;
  switch (angka) {
    case 1:
      namaHari = "Monday";
      break;
    case 2:
      namaHari = "Tuesday";
      break;
    case 3:
      namaHari = "Wednesday";
      break;
    case 4:
      namaHari = "Thursday";
      break;
    case 5:
      namaHari = "Friday";
      break;
    case 6:
      namaHari = "Saturday";
      break;
    case 7:
      namaHari = "Sunday";
      break;
    default:
      namaHari = "Invalid day";
  }
  return namaHari;
}

let hasilHari = "";
for (let i = 1; i <= 7; i++) {
  hasilHari += `<li>${i} → <strong>${konversiHari(i)}</strong></li>`;
}

document.getElementById("result").innerHTML += `
  <div class="p-4 bg-purple-50 rounded border">
    <h2 class="font-bold">4. Konversi Hari (Switch-Case)</h2>
    <ul class="list-disc ml-6">${hasilHari}</ul>
  </div>
`;

// ============================================================
// SOAL 5: Kalkulator grade nilai dengan ternary operator
// ============================================================
function gradeDenganTernary(nilai) {
  const grade =
    nilai >= 90
      ? "A"
      : nilai >= 80
        ? "B"
        : nilai >= 70
          ? "C"
          : nilai >= 60
            ? "D"
            : "E";
  return grade;
}

const daftarNilai = [95, 82, 75, 63, 50];
let hasilGrade = daftarNilai
  .map(
    (n) =>
      `<li>Nilai ${n} → Grade <strong>${gradeDenganTernary(n)}</strong></li>`,
  )
  .join("");

document.getElementById("result").innerHTML += `
  <div class="p-4 bg-pink-50 rounded border">
    <h2 class="font-bold">5. Grade dengan Ternary Operator</h2>
    <ul class="list-disc ml-6">${hasilGrade}</ul>
  </div>
`;
