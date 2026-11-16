# ==============================================================================
# Berkas: library.py
# Deskripsi: Class Library untuk menyimpan dan mengelola koleksi LibraryItem
# ==============================================================================

from library_item import LibraryItem
from member import Member


class Library:
    """Mengelola koleksi item. Koleksi disimpan private (__koleksi)."""

    def __init__(self, nama: str):
        self.nama = nama
        self.__koleksi = {}  # PRIVATE: {item_id: LibraryItem}

    # --------------------------------------------------------------------------
    # Menambahkan item
    # --------------------------------------------------------------------------
    def tambah_item(self, item: LibraryItem) -> bool:
        """Menambah item ke koleksi. Gagal jika id sudah terdaftar."""
        if item.item_id in self.__koleksi:
            print(f"Gagal: ID '{item.item_id}' sudah terdaftar!")
            return False
        self.__koleksi[item.item_id] = item
        print(f"Berhasil menambahkan: {item.judul} [{item.item_id}]")
        return True

    # --------------------------------------------------------------------------
    # Menampilkan daftar item (polymorphism: get_detail() beda tiap subclass)
    # --------------------------------------------------------------------------
    def tampilkan_katalog(self, hanya_tersedia: bool = True):
        judul = "ITEM TERSEDIA" if hanya_tersedia else "SELURUH KOLEKSI"
        print(f"\n=== KATALOG {judul} - {self.nama} ===")
        ditemukan = False
        for item in self.__koleksi.values():
            if hanya_tersedia and item.is_dipinjam:
                continue
            print(item.get_detail())
            ditemukan = True
        if not ditemukan:
            print("(tidak ada item)")

    # --------------------------------------------------------------------------
    # Pencarian
    # --------------------------------------------------------------------------
    def cari_by_id(self, item_id: str):
        """Mengembalikan item dengan id tertentu, atau None."""
        return self.__koleksi.get(item_id)

    def cari_by_judul(self, kata_kunci: str) -> list:
        """Mencari item yang judulnya memuat kata kunci (tidak peka huruf besar/kecil)."""
        kunci = kata_kunci.lower()
        return [item for item in self.__koleksi.values() if kunci in item.judul.lower()]

    # --------------------------------------------------------------------------
    # Peminjaman & pengembalian
    # --------------------------------------------------------------------------
    def pinjam_item(self, item_id: str, member: Member) -> bool:
        item = self.cari_by_id(item_id)
        if item is None:
            print(f"Gagal: item '{item_id}' tidak ditemukan!")
            return False
        if not member.bisa_meminjam():
            print(
                f"Gagal: {member.nama} sudah mencapai batas {Member.MAKS_PINJAM} pinjaman!"
            )
            return False
        if not item.pinjam():
            print(f"Gagal: '{item.judul}' sedang dipinjam!")
            return False
        member.tambah_pinjaman(item)
        print(
            f"{member.nama} berhasil meminjam '{item.judul}' (maks {item.get_masa_pinjam()} hari)"
        )
        return True

    def kembalikan_item(
        self, item_id: str, member: Member, hari_terlambat: int = 0
    ) -> float:
        """Mengembalikan item dan mengembalikan nilai denda (0 jika tepat waktu)."""
        item = self.cari_by_id(item_id)
        if item is None or not item.kembalikan():
            print(f"Gagal: item '{item_id}' tidak valid atau tidak sedang dipinjam!")
            return 0.0
        member.hapus_pinjaman(item)
        denda = item.hitung_denda(hari_terlambat)  # POLYMORPHISM
        print(f"{member.nama} mengembalikan '{item.judul}'. Denda: Rp {denda:,.0f}")
        return denda

    @property
    def jumlah_item(self) -> int:
        return len(self.__koleksi)
