/* ============================================================
   Mini POS - script.js
   Tugas Pertemuan 1: Aplikasi Kasir & Keranjang Belanja
   ============================================================ */

// ---------- Konstanta & State ----------
const STORAGE_KEY = "miniPOS_keranjang";
const PROMO_KEY = "miniPOS_promo";
const MINIMAL_DISKON = 50000; // total >= Rp 50.000 -> diskon otomatis
const PERSEN_DISKON = 0.1; // 10%
const KODE_PROMO_VALID = "HEMAT10";

let keranjang = muatDariLocalStorage();
let promoAktif = localStorage.getItem(PROMO_KEY) === KODE_PROMO_VALID;

// ---------- Referensi Elemen DOM ----------
const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("nama-barang");
const inputHarga = document.getElementById("harga-barang");
const inputQty = document.getElementById("qty-barang");
const errorNama = document.getElementById("error-nama");
const errorHarga = document.getElementById("error-harga");
const errorQty = document.getElementById("error-qty");
const tbodyKeranjang = document.getElementById("keranjang-body");
const pesanKosong = document.getElementById("keranjang-kosong");
const elTotal = document.getElementById("total-belanja");
const elDiskon = document.getElementById("total-diskon");
const elTotalAkhir = document.getElementById("total-akhir");
const elInfoDiskon = document.getElementById("info-diskon");
const inputPromo = document.getElementById("promo-kode");
const btnPromo = document.getElementById("btn-promo");
const infoPromo = document.getElementById("info-promo");
const inputUangBayar = document.getElementById("uang-bayar");
const infoKembalian = document.getElementById("info-kembalian");
const btnReset = document.getElementById("btn-reset");

// ---------- Utilitas ----------
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

// ---------- Persistensi localStorage (Syarat 3) ----------
function simpanKeLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
}

function muatDariLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// ---------- Validasi Form (Syarat 1) ----------
function validasiForm() {
  let valid = true;

  // Nama barang: wajib, minimal 3 karakter
  const nama = inputNama.value.trim();
  if (nama.length < 3) {
    errorNama.textContent = "Nama barang wajib diisi, minimal 3 karakter!";
    valid = false;
  } else {
    errorNama.textContent = "";
  }

  // Harga satuan: angka positif, minimal Rp 500
  const harga = parseFloat(inputHarga.value);
  if (inputHarga.value.trim() === "" || isNaN(harga)) {
    errorHarga.textContent = "Harga satuan wajib berupa angka!";
    valid = false;
  } else if (harga < 500) {
    errorHarga.textContent = "Harga satuan minimal Rp 500!";
    valid = false;
  } else {
    errorHarga.textContent = "";
  }

  // Qty: bilangan bulat minimal 1
  const qty = parseFloat(inputQty.value);
  if (inputQty.value.trim() === "" || isNaN(qty)) {
    errorQty.textContent = "Jumlah wajib berupa angka!";
    valid = false;
  } else if (!Number.isInteger(qty) || qty < 1) {
    errorQty.textContent = "Jumlah harus bilangan bulat minimal 1!";
    valid = false;
  } else {
    errorQty.textContent = "";
  }

  return valid ? { nama, harga, qty } : null;
}

// ---------- Tambah barang ke keranjang ----------
function tambahBarang(event) {
  event.preventDefault();

  const hasil = validasiForm();
  if (!hasil) return; // tidak valid -> barang TIDAK masuk keranjang

  keranjang.push({ nama: hasil.nama, harga: hasil.harga, qty: hasil.qty });
  simpanKeLocalStorage();
  renderKeranjang();
  formBarang.reset(); // form auto-reset saat berhasil
  inputNama.focus();
}

// ---------- Hapus barang (total & diskon ikut terhitung ulang) ----------
function hapusBarang(index) {
  keranjang.splice(index, 1);
  simpanKeLocalStorage();
  renderKeranjang();
}

// ---------- Modul Kalkulator (Syarat 2) ----------
function hitungTotalBelanja() {
  // Subtotal per baris dijumlahkan -> total belanja
  const total = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);

  let diskon = 0;
  let keterangan = "";
  if (promoAktif) {
    diskon = total * PERSEN_DISKON;
    keterangan = `Kode promo ${KODE_PROMO_VALID} aktif - diskon 10%.`;
  } else if (total >= MINIMAL_DISKON) {
    diskon = total * PERSEN_DISKON;
    keterangan = `Total belanja ≥ ${formatRupiah(MINIMAL_DISKON)} - diskon otomatis 10%.`;
  }

  return { total, diskon, totalAkhir: total - diskon, keterangan };
}

// Kembalian = Uang Bayar - Total Akhir
function hitungKembalian() {
  const { totalAkhir } = hitungTotalBelanja();
  const uangBayar = parseFloat(inputUangBayar.value);

  if (
    keranjang.length === 0 ||
    inputUangBayar.value.trim() === "" ||
    isNaN(uangBayar)
  ) {
    infoKembalian.textContent = "";
    infoKembalian.className = "info-message";
    return;
  }

  if (uangBayar < totalAkhir) {
    infoKembalian.textContent = `Uang bayar belum mencukupi! Kurang ${formatRupiah(totalAkhir - uangBayar)}.`;
    infoKembalian.className = "info-message gagal";
  } else {
    infoKembalian.textContent = `Kembalian: ${formatRupiah(uangBayar - totalAkhir)}`;
    infoKembalian.className = "info-message sukses";
  }
}

// ---------- Kode promo ----------
function pakaiPromo() {
  const kode = inputPromo.value.trim().toUpperCase();

  if (kode === KODE_PROMO_VALID) {
    promoAktif = true;
    localStorage.setItem(PROMO_KEY, kode);
    infoPromo.textContent =
      "Kode promo HEMAT10 berhasil dipakai (diskon 10%).";
    infoPromo.className = "info-message sukses";
  } else {
    promoAktif = false;
    localStorage.removeItem(PROMO_KEY);
    infoPromo.textContent = "Kode promo tidak valid. Contoh kode: HEMAT10.";
    infoPromo.className = "info-message gagal";
  }
  renderKeranjang();
}

// ---------- Render tabel keranjang + ringkasan ----------
function renderKeranjang() {
  if (keranjang.length === 0) {
    tbodyKeranjang.innerHTML = "";
    pesanKosong.style.display = "block";
  } else {
    pesanKosong.style.display = "none";
    tbodyKeranjang.innerHTML = keranjang
      .map(
        (item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.nama}</td>
        <td class="num">${formatRupiah(item.harga)}</td>
        <td class="num">${item.qty}</td>
        <td class="num">${formatRupiah(item.harga * item.qty)}</td>
        <td><button class="btn btn-hapus" data-index="${i}">Hapus</button></td>
      </tr>
    `,
      )
      .join("");
  }

  const { total, diskon, totalAkhir, keterangan } = hitungTotalBelanja();
  elTotal.textContent = formatRupiah(total);
  elDiskon.textContent = `- ${formatRupiah(diskon)}`;
  elTotalAkhir.textContent = formatRupiah(totalAkhir);
  elInfoDiskon.textContent = keterangan;

  hitungKembalian(); // kembalian ikut update setiap total berubah
}

// ---------- Tombol Transaksi Baru / Reset ----------
function resetTransaksi() {
  if (
    !confirm("Akhiri transaksi? Keranjang dan localStorage akan dikosongkan.")
  )
    return;

  keranjang = [];
  promoAktif = false;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PROMO_KEY);
  inputPromo.value = "";
  inputUangBayar.value = "";
  infoPromo.textContent = "";
  infoPromo.className = "info-message";
  renderKeranjang();
}

// ---------- Event Listeners ----------
formBarang.addEventListener("submit", tambahBarang);
btnPromo.addEventListener("click", pakaiPromo);
btnReset.addEventListener("click", resetTransaksi);
inputUangBayar.addEventListener("input", hitungKembalian);

// Event delegation untuk tombol Hapus di setiap baris
tbodyKeranjang.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-hapus")) {
    hapusBarang(parseInt(event.target.dataset.index, 10));
  }
});

// ---------- Init: muat data tersimpan saat halaman dibuka ----------
if (promoAktif) {
  inputPromo.value = KODE_PROMO_VALID;
  infoPromo.textContent =
    "Kode promo HEMAT10 aktif (dimuat dari sesi sebelumnya).";
  infoPromo.className = "info-message sukses";
}
renderKeranjang();
// ---------- Real-time feedback: hilangkan error saat user mengetik ulang ----------
inputNama.addEventListener("input", () => {
  if (inputNama.value.trim().length >= 3) errorNama.textContent = "";
});
inputHarga.addEventListener("input", () => {
  const val = parseFloat(inputHarga.value);
  if (!isNaN(val) && val >= 500) errorHarga.textContent = "";
});
inputQty.addEventListener("input", () => {
  const val = parseFloat(inputQty.value);
  if (!isNaN(val) && Number.isInteger(val) && val >= 1)
    errorQty.textContent = "";
});
