// src/components/BookList/BookList.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/bookStore';
import { toast } from '../Toast/toastBus';
import './BookList.css';

const STATUS_LABEL = {
  milik: 'Milik',
  baca: 'Dibaca',
  beli: 'Dibeli',
};

function EmptyIlustrasi() {
  return (
    <svg
      className="empty-illustration"
      width="88"
      height="88"
      viewBox="0 0 88 88"
      fill="none"
      aria-hidden="true"
    >
      <rect x="14" y="18" width="42" height="56" rx="4" fill="var(--paper-deep)" stroke="var(--line-strong)" strokeWidth="2" />
      <rect x="24" y="14" width="42" height="56" rx="4" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="2" />
      <rect x="34" y="10" width="42" height="56" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <path d="M44 26h22M44 34h16" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="62" cy="60" r="13" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M68 66l6 6" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function BookList({ filterStatus, searchQuery, onEdit, onRequestAdd }) {
  const { books, deleteBook } = useBooks();
  const [confirmingId, setConfirmingId] = useState(null);

  const filteredBooks = books.filter((book) => {
    const matchesStatus = filterStatus === 'semua' || book.status === filterStatus;
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesSearch =
      book.judul.toLowerCase().includes(lowerCaseQuery) ||
      book.penulis.toLowerCase().includes(lowerCaseQuery);
    return matchesStatus && matchesSearch;
  });

  const handleDelete = (id, judul) => {
    deleteBook(id);
    setConfirmingId(null);
    toast(`“${judul}” dihapus`, 'danger');
  };

  const hasFilterActive = filterStatus !== 'semua' || searchQuery.trim() !== '';

  return (
    <div className="book-list-container">
      <div className="list-head">
        <h3>Koleksi</h3>
        <span className="list-count">
          {filteredBooks.length} {filteredBooks.length === 1 ? 'judul' : 'judul'}
        </span>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <EmptyIlustrasi />
          <h4>Belum ada buku</h4>
          <p>Rakmu masih kosong. Mulai catat koleksimu dari form di samping.</p>
          {onRequestAdd && (
            <button type="button" className="btn-empty-cta" onClick={onRequestAdd}>
              Tambah buku pertama
            </button>
          )}
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="empty-state">
          <EmptyIlustrasi />
          <h4>Tidak ada yang cocok</h4>
          <p>Coba ubah kata kunci atau filter statusmu.</p>
        </div>
      ) : (
        <ul className="book-list">
          {filteredBooks.map((book) => {
            const isConfirming = confirmingId === book.id;
            return (
              <li key={book.id} className={`book-item spine-${book.status}`}>
                <div className="book-info">
                  <h4 className="book-title">{book.judul}</h4>
                  <p className="book-author">{book.penulis}</p>
                  <span className={`book-status status-${book.status}`}>
                    {STATUS_LABEL[book.status] || book.status}
                  </span>
                </div>

                <div className="book-actions">
                  {isConfirming ? (
                    <div className="inline-confirm" role="alertdialog" aria-label={`Konfirmasi hapus ${book.judul}`}>
                      <span className="confirm-text">Hapus?</span>
                      <button
                        type="button"
                        className="btn-confirm-yes"
                        onClick={() => handleDelete(book.id, book.judul)}
                      >
                        Ya
                      </button>
                      <button
                        type="button"
                        className="btn-confirm-no"
                        onClick={() => setConfirmingId(null)}
                      >
                        Batal
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => onEdit(book)}
                        className="btn-edit"
                        title={`Sunting “${book.judul}”`}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M4 20h4L19 9a2.8 2.8 0 1 0-4-4L4 16v4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Sunting
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingId(book.id)}
                        className="btn-delete"
                        title={`Hapus “${book.judul}”`}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 13h8l1-13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Hapus
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {hasFilterActive && filteredBooks.length > 0 && (
        <p className="list-footnote">Menampilkan hasil tersaring dari {books.length} buku.</p>
      )}
    </div>
  );
}

BookList.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRequestAdd: PropTypes.func,
};

export default BookList;
