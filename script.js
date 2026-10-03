document.getElementById("tahun").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const menuNav = document.getElementById("menu-utama");

if (menuToggle && menuNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuNav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 820) {
        menuNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

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
