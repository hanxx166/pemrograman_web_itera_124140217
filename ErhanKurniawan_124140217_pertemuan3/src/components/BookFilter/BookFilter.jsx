// src/components/BookFilter/BookFilter.jsx
import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({ filterStatus, setFilterStatus, searchQuery, setSearchQuery }) {
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReset = () => {
    setFilterStatus('semua');
    setSearchQuery('');
  };

  const hasActiveFilter = filterStatus !== 'semua' || searchQuery.trim() !== '';

  return (
    <div className="book-filter">
      <div className="filter-controls">
        <div className="filter-group filter-search">
          <label htmlFor="search">Cari</label>
          <div className="search-wrap">
            <svg
              className="search-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              id="search"
              placeholder="Judul atau penulis…"
              value={searchQuery}
              onChange={handleSearchChange}
              className="input-search"
            />
          </div>
        </div>

        <div className="filter-group filter-status">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={handleStatusChange}
            className="select-filter"
          >
            <option value="semua">Semua</option>
            <option value="milik">Milik pribadi</option>
            <option value="baca">Sedang dibaca</option>
            <option value="beli">Ingin dibeli</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn-reset"
          disabled={!hasActiveFilter}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default BookFilter;
