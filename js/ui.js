document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".mobile-menu-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nav = document.querySelector(".nav-links");
      if (!nav) return;
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      // swap icon
      const icon = btn.querySelector("i");
      if (open) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  });
});
