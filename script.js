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

if (formKontak) {
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
}

const modal = document.getElementById("gambar-modal");
const modalGambar = document.getElementById("modal-gambar");
const tombolTutupModal = document.querySelector(".gambar-modal .tutup");
const sertifikatLinks = document.querySelectorAll(".sertifikat-link");

sertifikatLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const gambar = link.getAttribute("href");
    modalGambar.src = gambar;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  });
});

if (tombolTutupModal) {
  tombolTutupModal.addEventListener("click", () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  });
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}
