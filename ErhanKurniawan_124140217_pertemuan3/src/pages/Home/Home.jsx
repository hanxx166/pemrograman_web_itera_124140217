// src/pages/Home/Home.jsx
import { useState } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

function Home() {
  const [filterStatus, setFilterStatus] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookToEdit, setBookToEdit] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleEdit = (book) => {
    setBookToEdit(book);
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearEdit = () => {
    setBookToEdit(null);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <p className="home-eyebrow">Perpustakaan pribadi</p>
        <h1>Manajemen Buku</h1>
        <p className="home-lede">
          Catat buku yang kamu miliki, sedang dibaca, atau ingin dibeli -
          semuanya tersimpan lokal di perambanmu.
        </p>
      </header>

      <div className="home-grid">
        <div className="home-primary">
          <section className="section-filter" aria-label="Filter dan pencarian">
            <BookFilter
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </section>

          <section className="section-list" aria-label="Daftar buku">
            <BookList
              filterStatus={filterStatus}
              searchQuery={searchQuery}
              onEdit={handleEdit}
              onRequestAdd={() => setFormOpen(true)}
            />
          </section>
        </div>

        <aside className={`home-aside${formOpen ? ' is-open' : ''}`}>
          <button
            type="button"
            className="aside-toggle"
            onClick={() => setFormOpen((open) => !open)}
            aria-expanded={formOpen}
          >
            {formOpen ? 'Tutup form' : bookToEdit ? 'Sunting buku' : 'Tambah buku'}
          </button>
          <div className="aside-panel">
            <BookForm
              key={bookToEdit ? bookToEdit.id : 'new'}
              bookToEdit={bookToEdit}
              clearEdit={clearEdit}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
