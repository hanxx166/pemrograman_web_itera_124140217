// ============================================================
// SOAL 1: Tabel perkalian 1-10 untuk angka pilihan
// ============================================================
const angkaPilihan = 7;
let tabelPerkalian = "";

for (let i = 1; i <= 10; i++) {
  tabelPerkalian += `<li>${angkaPilihan} × ${i} = <strong>${angkaPilihan * i}</strong></li>`;
}

document.getElementById("result").innerHTML = `
  <div class="p-4 bg-blue-50 rounded border">
    <h2 class="font-bold">1. Tabel Perkalian ${angkaPilihan}</h2>
    <ul class="list-disc ml-6">${tabelPerkalian}</ul>
  </div>
`;

// ============================================================
// SOAL 2: Fungsi faktorial
// ============================================================
function hitungFaktorial(n) {
  if (n < 0) return "Tidak valid";
  if (n === 0 || n === 1) return 1;
  let hasil = 1;
  for (let i = 2; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}

// Versi rekursif (alternatif)
function faktorialRekursif(n) {
  if (n <= 1) return 1;
  return n * faktorialRekursif(n - 1);
}

let hasilFaktorial = [3, 5, 7]
  .map((n) => `<li>${n}! = <strong>${hitungFaktorial(n)}</strong></li>`)
  .join("");

document.getElementById("result").innerHTML += `
  <div class="p-4 bg-green-50 rounded border">
    <h2 class="font-bold">2. Faktorial</h2>
    <ul class="list-disc ml-6">${hasilFaktorial}</ul>
  </div>
`;

// ============================================================
// SOAL 3: Fungsi cek bilangan prima
// ============================================================
function cekPrima(angka) {
  if (angka < 2) return false;
  for (let i = 2; i <= Math.sqrt(angka); i++) {
    if (angka % i === 0) return false;
  }
  return true;
}

const angkaTes = [2, 7, 10, 13, 20, 29];
let hasilPrima = angkaTes
  .map(
    (a) =>
      `<li>${angkaTes.indexOf(a) === angkaTes.length - 1 ? a : a} → <strong>${cekPrima(a) ? "Prima ✅" : "Bukan Prima ❌"}</strong></li>`,
  )
  .join("");

document.getElementById("result").innerHTML += `
  <div class="p-4 bg-yellow-50 rounded border">
    <h2 class="font-bold">3. Cek Bilangan Prima</h2>
    <ul class="list-disc ml-6">${hasilPrima}</ul>
  </div>
`;

// ============================================================
// SOAL 4: Kalkulator BMI dengan fungsi dan event handler
// BMI = berat(kg) / (tinggi(m))²
// ============================================================
function hitungBMI(beratKg, tinggiCm) {
  const tinggiM = tinggiCm / 100;
  const bmi = beratKg / (tinggiM * tinggiM);
  return bmi.toFixed(2);
}

function kategoriBMI(bmi) {
  if (bmi < 18.5) return { kategori: "Kurus", warna: "text-blue-600" };
  if (bmi < 25) return { kategori: "Normal", warna: "text-green-600" };
  if (bmi < 30) return { kategori: "Overweight", warna: "text-yellow-600" };
  return { kategori: "Obesitas", warna: "text-red-600" };
}

document
  .getElementById("btn-hitung-bmi")
  .addEventListener("click", function () {
    const berat = parseFloat(document.getElementById("berat").value);
    const tinggi = parseFloat(document.getElementById("tinggi").value);
    const output = document.getElementById("hasil-bmi");

    if (isNaN(berat) || isNaN(tinggi) || berat <= 0 || tinggi <= 0) {
      output.innerHTML = `<p class="text-red-500">Masukkan berat dan tinggi yang valid!</p>`;
      return;
    }

    const bmi = hitungBMI(berat, tinggi);
    const { kategori, warna } = kategoriBMI(bmi);

    output.innerHTML = `
    <p>BMI Anda: <strong>${bmi}</strong></p>
    <p>Kategori: <strong class="${warna}">${kategori}</strong></p>
  `;
  });
