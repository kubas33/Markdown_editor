document.addEventListener('DOMContentLoaded', function () {

  const currentURL = new URL(window.location.href);

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkHref = link.getAttribute("href");

    if (
      (currentURL.pathname === linkHref && linkHref === "/") || // Strona główna - tylko link do strony głównej będzie aktywny
      (currentURL.pathname.startsWith(linkHref) && linkHref !== "/") // Pozostałe podstrony
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
});
