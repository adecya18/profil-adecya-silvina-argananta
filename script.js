document.getElementById("tahun").textContent = new Date().getFullYear();

const formKontak = document.getElementById("form-kontak");
const tujuanEmail = "adecyasilvi10@gmail.com";

formKontak.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = formKontak.nama.value.trim();
  const email = formKontak.email.value.trim();
  const pesan = formKontak.pesan.value.trim();

  if (!nama || !email || !pesan) {
    return;
  }

  const subjek = encodeURIComponent(`Pesan dari ${nama}`);
  const isiPesan = encodeURIComponent(
    `Nama: ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`
  );

  window.location.href = `mailto:${tujuanEmail}?subject=${subjek}&body=${isiPesan}`;
  formKontak.reset();
});
