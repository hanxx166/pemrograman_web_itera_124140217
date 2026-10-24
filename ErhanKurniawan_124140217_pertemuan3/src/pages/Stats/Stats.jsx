// src/pages/Stats/Stats.jsx
import { Link } from 'react-router-dom';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

const STATUS_ROWS = [
  { key: 'owned', label: 'Milik pribadi', tone: 'owned' },
  { key: 'reading', label: 'Sedang dibaca', tone: 'reading' },
  { key: 'wishlist', label: 'Ingin dibeli', tone: 'wishlist' },
];

function Stats() {
  const { totalBooks, ownedCount, readingCount, wishlistCount } = useBookStats();

  const counts = { owned: ownedCount, reading: readingCount, wishlist: wishlistCount };
  const maxCount = Math.max(ownedCount, readingCount, wishlistCount, 1);

  return (
    <div className="stats-container">
      <header className="stats-header">
        <p className="stats-eyebrow">Ringkasan</p>
        <h1>Statistik Perpustakaan</h1>
        <p className="stats-lede">Gambaran cepat isi rak bukumu.</p>
      </header>

      <section className="stat-total" aria-label="Total buku">
        <span className="stat-total-number">{totalBooks}</span>
        <span className="stat-total-label">buku tercatat</span>
      </section>

      <section className="stat-breakdown" aria-label="Rincian per status">
        {STATUS_ROWS.map((row) => {
          const count = counts[row.key];
          const pct = totalBooks === 0 ? 0 : Math.round((count / totalBooks) * 100);
          return (
            <div key={row.key} className="stat-row">
              <div className="stat-row-top">
                <span className={`stat-dot dot-${row.tone}`} aria-hidden="true" />
                <span className="stat-row-label">{row.label}</span>
                <span className="stat-row-meta">
                  <strong>{count}</strong>
                  <span className="stat-row-pct">{pct}%</span>
                </span>
              </div>
              <div
                className="stat-bar"
                role="img"
                aria-label={`${row.label}: ${count} buku`}
              >
                <div
                  className={`stat-bar-fill fill-${row.tone}`}
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </section>

      <div className="stats-actions">
        <Link to="/" className="btn-back">
          <span aria-hidden="true">←</span> Kembali ke koleksi
        </Link>
      </div>
    </div>
  );
}

export default Stats;
