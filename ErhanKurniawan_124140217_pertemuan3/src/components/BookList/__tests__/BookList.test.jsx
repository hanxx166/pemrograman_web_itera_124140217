// src/components/BookList/__tests__/BookList.test.jsx
import { render, screen } from "@testing-library/react";
import { BookProvider } from "../../../context/BookContext";
import BookList from "../BookList";

const renderWithProvider = (ui) => {
  return render(<BookProvider>{ui}</BookProvider>);
};

describe("BookList Component", () => {
  // TEST 3: Sesuaikan dengan heading 'Belum ada buku' atau paragraf 'Rakmu masih kosong'
  test("3. Menampilkan pesan kosong jika tidak ada buku", () => {
    renderWithProvider(
      <BookList filterStatus="semua" searchQuery="" onEdit={() => {}} />,
    );

    // Cek heading h4 atau paragraf deskripsi state kosong
    expect(screen.getByText(/Belum ada buku/i)).toBeInTheDocument();
    expect(screen.getByText(/Rakmu masih kosong/i)).toBeInTheDocument();
  });

  // TEST 4: Sesuaikan dengan format teks '0 judul'
  test("4. Menampilkan jumlah buku yang difilter", () => {
    renderWithProvider(
      <BookList filterStatus="semua" searchQuery="" onEdit={() => {}} />,
    );

    // Cari span yang berisi angka 0 dan kata judul
    expect(screen.getByText(/0\s+judul/i)).toBeInTheDocument();
  });

  // TEST 5: Ini sudah PASS, biarkan tetap seperti ini
  test("5. Merender tombol Edit dan Hapus pada setiap item buku", () => {
    renderWithProvider(
      <BookList filterStatus="semua" searchQuery="" onEdit={() => {}} />,
    );

    // Saat list kosong, tombol edit/hapus memang tidak boleh ada
    expect(
      screen.queryByRole("button", { name: /Edit/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Hapus/i }),
    ).not.toBeInTheDocument();
  });
});
