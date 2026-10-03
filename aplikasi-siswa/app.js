const kunciPenyimpanan = "portofolio:data-siswa";
const formSiswa = document.getElementById("form-siswa");
const inputNis = document.getElementById("nis");
const inputNama = document.getElementById("nama");
const inputKelas = document.getElementById("kelas");
const inputPencarian = document.getElementById("pencarian");
const daftarSiswa = document.getElementById("daftar-siswa");
const jumlahSiswa = document.getElementById("jumlah-siswa");
const statusAplikasi = document.getElementById("status");
const tombolSimpan = document.getElementById("tombol-simpan");
const tombolBatalEdit = document.getElementById("batal-edit");

let siswa = [];
let idSedangDiedit = null;

function tampilkanStatus(pesan, error = false) {
  statusAplikasi.textContent = pesan;
  statusAplikasi.classList.toggle("error", error);
}

function muatData() {
  try {
    const tersimpan = localStorage.getItem(kunciPenyimpanan);
    if (!tersimpan) return [];

    const data = JSON.parse(tersimpan);
    if (!Array.isArray(data) || data.some((item) =>
      !item || typeof item.id !== "string" || typeof item.nis !== "string" ||
      typeof item.nama !== "string" || typeof item.kelas !== "string"
    )) {
      throw new Error("Format data siswa tidak valid.");
    }
    return data;
  } catch (error) {
    tampilkanStatus("Data siswa gagal dimuat dari browser. Penyimpanan mungkin tidak tersedia atau datanya rusak.", true);
    return [];
  }
}

function simpanData(data) {
  try {
    localStorage.setItem(kunciPenyimpanan, JSON.stringify(data));
    return true;
  } catch (error) {
    tampilkanStatus("Data gagal disimpan. Periksa pengaturan penyimpanan browser dan coba lagi.", true);
    return false;
  }
}

function buatTeks(tag, isi) {
  const elemen = document.createElement(tag);
  elemen.textContent = isi;
  return elemen;
}

function render() {
  const kueri = inputPencarian.value.trim().toLocaleLowerCase("id");
  const hasil = siswa.filter((item) =>
    [item.nis, item.nama, item.kelas].some((nilai) =>
      nilai.toLocaleLowerCase("id").includes(kueri)
    )
  );

  jumlahSiswa.textContent = String(siswa.length);
  daftarSiswa.replaceChildren();

  if (hasil.length === 0) {
    const baris = document.createElement("tr");
    const sel = buatTeks("td", kueri ? "Tidak ada siswa yang cocok dengan pencarian." : "Belum ada data siswa. Tambahkan siswa melalui formulir di atas.");
    sel.colSpan = 4;
    sel.className = "kosong";
    baris.append(sel);
    daftarSiswa.append(baris);
    return;
  }

  hasil.forEach((item) => {
    const baris = document.createElement("tr");
    baris.append(buatTeks("td", item.nis), buatTeks("td", item.nama), buatTeks("td", item.kelas));

    const selAksi = document.createElement("td");
    selAksi.className = "aksi";

    const tombolEdit = buatTeks("button", "Edit");
    tombolEdit.type = "button";
    tombolEdit.className = "sekunder";
    tombolEdit.setAttribute("aria-label", `Edit data ${item.nama}`);
    tombolEdit.addEventListener("click", () => mulaiEdit(item));

    const tombolHapus = buatTeks("button", "Hapus");
    tombolHapus.type = "button";
    tombolHapus.className = "hapus";
    tombolHapus.setAttribute("aria-label", `Hapus data ${item.nama}`);
    tombolHapus.addEventListener("click", () => hapusSiswa(item));

    selAksi.append(tombolEdit, tombolHapus);
    baris.append(selAksi);
    daftarSiswa.append(baris);
  });
}

function mulaiEdit(item) {
  idSedangDiedit = item.id;
  inputNis.value = item.nis;
  inputNama.value = item.nama;
  inputKelas.value = item.kelas;
  tombolSimpan.textContent = "Simpan perubahan";
  tombolBatalEdit.hidden = false;
  document.getElementById("judul-form").textContent = "Edit data siswa";
  tampilkanStatus(`Sedang mengedit data ${item.nama}.`);
  inputNis.focus();
}

function batalEdit() {
  idSedangDiedit = null;
  formSiswa.reset();
  tombolSimpan.textContent = "Tambah siswa";
  tombolBatalEdit.hidden = true;
  document.getElementById("judul-form").textContent = "Tambah siswa";
}

function hapusSiswa(item) {
  if (!window.confirm(`Hapus data siswa ${item.nama}?`)) return;

  const dataBaru = siswa.filter((siswaItem) => siswaItem.id !== item.id);
  if (!simpanData(dataBaru)) return;

  siswa = dataBaru;
  if (idSedangDiedit === item.id) batalEdit();
  tampilkanStatus(`Data ${item.nama} berhasil dihapus.`);
  render();
}

formSiswa.addEventListener("submit", (event) => {
  event.preventDefault();

  const nis = inputNis.value.trim();
  const nama = inputNama.value.trim();
  const kelas = inputKelas.value.trim();
  const nisSudahAda = siswa.some((item) => item.nis === nis && item.id !== idSedangDiedit);

  if (nisSudahAda) {
    tampilkanStatus(`NIS ${nis} sudah digunakan. Gunakan NIS yang berbeda.`, true);
    inputNis.focus();
    return;
  }

  const dataBaru = idSedangDiedit
    ? siswa.map((item) => item.id === idSedangDiedit ? { ...item, nis, nama, kelas } : item)
    : [...siswa, { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, nis, nama, kelas }];

  if (!simpanData(dataBaru)) return;

  siswa = dataBaru;
  const pesanSukses = idSedangDiedit ? `Data ${nama} berhasil diperbarui.` : `Data ${nama} berhasil ditambahkan.`;
  batalEdit();
  tampilkanStatus(pesanSukses);
  render();
});

tombolBatalEdit.addEventListener("click", () => {
  batalEdit();
  tampilkanStatus("Edit dibatalkan.");
});
inputPencarian.addEventListener("input", render);

siswa = muatData();
render();
