# DESIGN — Warm Library / Editorial

Visual world untuk MyBookManager. Mode: **Operate** (app UI) — presisi, keterbacaan, craft halus; bukan dekorasi ramai.

## Tokens

### Warna
| Token | Nilai | Peran |
|---|---|---|
| `--paper` | `#f7f2e9` | background aplikasi |
| `--paper-deep` | `#efe7d8` | hover/track bar |
| `--surface` | `#fffdf8` | kartu, panel, form |
| `--ink` | `#241c16` | teks utama, tombol primer |
| `--muted` | `#6e6257` | teks sekunder |
| `--line` / `--line-strong` | `#e5dccd` / `#d6c9b2` | border |
| `--accent` / `--accent-strong` / `--accent-soft` | `#b85c38` / `#9c4a2b` / `#f3e2d8` | terracotta — brand, aktif, fokus |
| `--olive` (+soft) | `#5c6b4a` / `#e8ecdf` | status: milik |
| `--amber` (+soft) | `#c9852a` / `#f7ecd8` | status: dibaca |
| `--blue` (+soft) | `#5a7a8c` / `#e3ebef` | status: dibeli |
| `--danger` (+soft) | `#a83a2a` / `#f6e3df` | error, hapus |

### Tipografi
- **Display:** Syne (400–800) — h1–h4, brand, angka statistik, judul buku.
- **Body:** Manrope (200–800) — paragraf, label, tombol, badge.
- Skala: eyebrow 11–12px uppercase tracking 0.14–0.16em · body 13.5–16px · h3 18–20px · h1 clamp 2–2.9rem · angka total clamp 3–4.2rem.

### Bentuk & elevasi
- Radius: kartu 10px, kontrol 6px, badge 999px.
- Shadow lembut hangat (`--shadow-soft`); fokus = border accent + ring 3px `--accent-soft`.

## Prinsif komposisi
1. **Daftar = hero.** Form di aside kanan (sticky) di desktop; collapsible di mobile.
2. **Spine accent.** Item daftar punya border-kiri 4px warna status — motif perpustakaan.
3. **Whitespace & rhythm.** Section berjarak 20–28px, padding generous, tanpa border tebal navy.
4. **Status via warna lembut + label huruf kecil**, bukan blok warna teriak.
5. **Feedback:** toast gelap di bawah (event-based), inline two-step confirm untuk hapus (tanpa `window.confirm`).
6. **A11y:** `aria-current` nav aktif, `:focus-visible` global, `aria-invalid`/`aria-describedby` di error form, `role="status"` toast.

## Larangan
- Palet navy `#2c3e50` / biru template `#4a90e2` era lama.
- `border-top` tebal pada kartu rounded (slop detector).
- `outline: none` tanpa ganti fokus.
- Font default OS (Segoe UI) untuk judul.
