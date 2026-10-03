document.addEventListener("DOMContentLoaded", () => {
  const tahun = document.getElementById("tahun");
  if (tahun) tahun.textContent = new Date().getFullYear();
});
