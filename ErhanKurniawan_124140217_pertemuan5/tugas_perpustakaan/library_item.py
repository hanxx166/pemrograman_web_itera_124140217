# ==============================================================================
# Berkas: library_item.py
# Deskripsi: Abstract class LibraryItem beserta subclass Book dan Magazine
# ==============================================================================

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract base class untuk seluruh item di perpustakaan.
    Tidak bisa diinstansiasi langsung; subclass wajib mengimplementasikan
    get_detail(), hitung_denda(), dan get_masa_pinjam().
    """

    def __init__(self, item_id: str, judul: str, tahun_terbit: int):
        self.__item_id = item_id  # PRIVATE: id tidak boleh diubah dari luar
        self._judul = judul  # PROTECTED: diakses lewat property + subclass
        self._tahun_terbit = tahun_terbit  # PROTECTED
        self.__dipinjam = (
            False  # PRIVATE: status hanya diubah lewat pinjam()/kembalikan()
        )

    # --------------------------------------------------------------------------
    # PROPERTY (getter / setter)
    # --------------------------------------------------------------------------
    @property
    def item_id(self) -> str:
        """Getter read-only untuk id item."""
        return self.__item_id

    @property
    def judul(self) -> str:
        """Getter judul item."""
        return self._judul

    @judul.setter
    def judul(self, judul_baru: str):
        """Setter judul dengan validasi: tidak boleh kosong."""
        if not judul_baru or not judul_baru.strip():
            raise ValueError("Judul tidak boleh kosong!")
        self._judul = judul_baru.strip()

    @property
    def is_dipinjam(self) -> bool:
        """Getter status peminjaman (read-only dari luar class)."""
        return self.__dipinjam

    # --------------------------------------------------------------------------
    # METHOD CONCRETE (dibagikan ke seluruh subclass)
    # --------------------------------------------------------------------------
    def pinjam(self) -> bool:
        """Menandai item sebagai dipinjam. Mengembalikan False jika sudah dipinjam."""
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self) -> bool:
        """Menandai item sebagai tersedia. Mengembalikan False jika memang tidak dipinjam."""
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    def __str__(self) -> str:
        status = "Dipinjam" if self.__dipinjam else "Tersedia"
        return f"[{self.__item_id}] {self._judul} ({self._tahun_terbit}) - {status}"

    # --------------------------------------------------------------------------
    # METHOD ABSTRACT (wajib dioverride subclass)
    # --------------------------------------------------------------------------
    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan detail lengkap item sesuai jenisnya."""

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> float:
        """Menghitung denda keterlambatan sesuai aturan jenis item."""

    @abstractmethod
    def get_masa_pinjam(self) -> int:
        """Mengembalikan lama peminjaman maksimal (dalam hari)."""


class Book(LibraryItem):
    """Buku: denda Rp 1.000/hari, masa pinjam 14 hari."""

    DENDA_PER_HARI = 1000
    MASA_PINJAM = 14

    def __init__(
        self,
        item_id: str,
        judul: str,
        tahun_terbit: int,
        penulis: str,
        jumlah_halaman: int,
    ):
        super().__init__(item_id, judul, tahun_terbit)
        self._penulis = penulis
        self._jumlah_halaman = jumlah_halaman

    def get_detail(self) -> str:
        return (
            f"BUKU     | {self}\n"
            f"           Penulis: {self._penulis} | Halaman: {self._jumlah_halaman}"
        )

    def hitung_denda(self, hari_terlambat: int) -> float:
        return max(0, hari_terlambat) * self.DENDA_PER_HARI

    def get_masa_pinjam(self) -> int:
        return self.MASA_PINJAM


class Magazine(LibraryItem):
    """Majalah: denda Rp 500/hari, masa pinjam 7 hari."""

    DENDA_PER_HARI = 500
    MASA_PINJAM = 7

    def __init__(
        self, item_id: str, judul: str, tahun_terbit: int, edisi: str, penerbit: str
    ):
        super().__init__(item_id, judul, tahun_terbit)
        self._edisi = edisi
        self._penerbit = penerbit

    def get_detail(self) -> str:
        return (
            f"MAJALAH  | {self}\n"
            f"           Edisi: {self._edisi} | Penerbit: {self._penerbit}"
        )

    def hitung_denda(self, hari_terlambat: int) -> float:
        return max(0, hari_terlambat) * self.DENDA_PER_HARI

    def get_masa_pinjam(self) -> int:
        return self.MASA_PINJAM
