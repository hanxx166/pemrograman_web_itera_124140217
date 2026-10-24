// src/components/BookForm/BookForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/bookStore';
import { toast } from '../Toast/toastBus';
import './BookForm.css';

const EMPTY_FORM = { judul: '', penulis: '', status: 'milik' };

function BookForm({ bookToEdit, clearEdit }) {
  const { addBook, updateBook } = useBooks();

  // State di-reset lewat key remount dari parent saat bookToEdit berubah
  const [formData, setFormData] = useState(() =>
    bookToEdit
      ? { judul: bookToEdit.judul, penulis: bookToEdit.penulis, status: bookToEdit.status }
      : { ...EMPTY_FORM },
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.judul.trim()) newErrors.judul = 'Judul buku wajib diisi.';
    if (!formData.penulis.trim()) newErrors.penulis = 'Nama penulis wajib diisi.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (bookToEdit) {
      updateBook({ ...formData, id: bookToEdit.id });
      clearEdit();
      toast(`Perubahan “${formData.judul}” tersimpan`, 'success');
    } else {
      addBook(formData);
      toast(`“${formData.judul}” ditambahkan`, 'success');
    }

    setFormData({ ...EMPTY_FORM });
  };

  const handleCancel = () => {
    setFormData({ ...EMPTY_FORM });
    setErrors({});
    if (clearEdit) clearEdit();
  };

  const isEditing = Boolean(bookToEdit);

  return (
    <form className={`book-form${isEditing ? ' is-editing' : ''}`} onSubmit={handleSubmit} noValidate>
      <div className="form-head">
        <p className="form-eyebrow">{isEditing ? 'Mode sunting' : 'Entri baru'}</p>
        <h3>{isEditing ? 'Edit Buku' : 'Tambah Buku'}</h3>
      </div>

      <div className="form-group">
        <label htmlFor="judul">Judul</label>
        <input
          type="text"
          id="judul"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
          placeholder="Judul buku…"
          aria-invalid={Boolean(errors.judul)}
          aria-describedby={errors.judul ? 'judul-error' : undefined}
          className={errors.judul ? 'input-error' : ''}
        />
        {errors.judul && (
          <span className="error-text" id="judul-error">
            {errors.judul}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="penulis">Penulis</label>
        <input
          type="text"
          id="penulis"
          name="penulis"
          value={formData.penulis}
          onChange={handleChange}
          placeholder="Nama penulis…"
          aria-invalid={Boolean(errors.penulis)}
          aria-describedby={errors.penulis ? 'penulis-error' : undefined}
          className={errors.penulis ? 'input-error' : ''}
        />
        {errors.penulis && (
          <span className="error-text" id="penulis-error">
            {errors.penulis}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          <option value="milik">Milik pribadi</option>
          <option value="baca">Sedang dibaca</option>
          <option value="beli">Ingin dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {isEditing ? 'Simpan perubahan' : 'Tambah ke koleksi'}
        </button>
        {isEditing && (
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  bookToEdit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    judul: PropTypes.string.isRequired,
    penulis: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  clearEdit: PropTypes.func,
};

export default BookForm;
