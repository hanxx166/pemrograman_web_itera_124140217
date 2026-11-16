# ==============================================================================
# Berkas: member.py
# Deskripsi: Class Member (anggota perpustakaan) yang meminjam LibraryItem
# ==============================================================================

from library_item import LibraryItem


class Member:
    """Anggota perpustakaan dengan batas maksimal peminjaman."""

    MAKS_PINJAM = 3

    def __init__(self, member_id: str, nama: str):
        self.__member_id = member_id  # PRIVATE
        self._nama = nama  # PROTECTED
        self.__daftar_pinjam = []  # PRIVATE: hanya diubah lewat method

    @property
    def member_id(self) -> str:
        return self.__member_id

    @property
    def nama(self) -> str:
        return self._nama

    @property
    def jumlah_pinjaman(self) -> int:
        """Jumlah item yang sedang dipinjam anggota."""
        return len(self.__daftar_pinjam)

    def bisa_meminjam(self) -> bool:
        return self.jumlah_pinjaman < self.MAKS_PINJAM

    def tambah_pinjaman(self, item: LibraryItem):
        self.__daftar_pinjam.append(item)

    def hapus_pinjaman(self, item: LibraryItem):
        if item in self.__daftar_pinjam:
            self.__daftar_pinjam.remove(item)

    def tampilkan_pinjaman(self):
        print(
            f"\nPinjaman {self._nama} ({self.__member_id}): {self.jumlah_pinjaman}/{self.MAKS_PINJAM}"
        )
        if not self.__daftar_pinjam:
            print("  (tidak ada pinjaman aktif)")
        for item in self.__daftar_pinjam:
            print(f"  - {item.judul} (masa pinjam {item.get_masa_pinjam()} hari)")

    def __str__(self) -> str:
        return f"Member[{self.__member_id}] {self._nama}"
