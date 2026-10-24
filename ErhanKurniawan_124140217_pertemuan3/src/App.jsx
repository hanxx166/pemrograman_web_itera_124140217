// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/Stats";
import Toast from "./components/Toast/Toast";
import "./App.css";

const NAV_ITEMS = [
  { to: "/", label: "Koleksi" },
  { to: "/stats", label: "Statistik" },
];

function BrandMark() {
  return (
    <svg
      className="brand-mark"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M4 18.5h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 7.5h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar" aria-label="Navigasi utama">
      <Link to="/" className="navbar-brand">
        <BrandMark />
        <span>MyBookManager</span>
      </Link>
      <ul className="navbar-menu">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.to;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`nav-link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function AppShell() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>
          © 2026 · Tugas 3 Praktikum Pengembangan Aplikasi Web · Teknik Informatika ITERA
        </p>
      </footer>

      <Toast />
    </div>
  );
}

function App() {
  return (
    <BookProvider>
      <Router>
        <AppShell />
      </Router>
    </BookProvider>
  );
}

export default App;
