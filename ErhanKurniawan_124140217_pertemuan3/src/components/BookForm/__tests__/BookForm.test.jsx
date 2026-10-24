// src/components/BookForm/__tests__/BookForm.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BookProvider } from "../../../context/BookContext";
import BookForm from "../BookForm";

const renderWithProvider = (ui) => {
  return render(<BookProvider>{ui}</BookProvider>);
};

describe("BookForm Component", () => {
  // TEST 1: Merender form tambah buku dengan benar
  test("1. Merender form tambah buku dengan benar", () => {
    renderWithProvider(<BookForm />);

    expect(screen.getByLabelText(/Judul/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Penulis/i)).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /Status/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Tambah ke koleksi/i }),
    ).toBeInTheDocument();
  });

  // TEST 2: Menampilkan pesan error jika input kosong saat submit
  test("2. Menampilkan pesan error jika judul kosong saat submit", () => {
    renderWithProvider(<BookForm />);

    const submitBtn = screen.getByRole("button", {
      name: /Tambah ke koleksi/i,
    });
    fireEvent.click(submitBtn);

    // PERBAIKAN: Gunakan getAllByText karena ada 2 pesan error yang muncul (Judul & Penulis)
    // Kita cek apakah panjang array-nya lebih dari 0 (artinya pesan error berhasil dirender)
    const errorMessages = screen.getAllByText(/wajib diisi/i);
    expect(errorMessages.length).toBeGreaterThan(0);

    // Tambahan: Pastikan class error visual juga terpasang di input
    const judulInput = screen.getByLabelText(/Judul/i);
    expect(judulInput).toHaveClass("input-error");
  });
});
