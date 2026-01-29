const header = document.getElementById("site-header");
const footer = document.getElementById("site-footer");
const logo = document.getElementById("header-logo");

const originalLogo = logo.getAttribute("src");
const altLogo = logo.getAttribute("data-alt");

let lastScrollY = window.scrollY;
let footerInView = false;

// Observe footer visibility
const footerObserver = new IntersectionObserver(
  ([entry]) => {
    footerInView = entry.isIntersecting;

    if (footerInView) {
      header.classList.add("is-hidden");
    }
  },
  {
    threshold: 0.1,
  }
);

footerObserver.observe(footer);

// Scroll behavior
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Header color + logo swap
  if (currentScrollY > 50) {
    header.classList.add("is-black");
    logo.src = altLogo;
  } else {
    header.classList.remove("is-black");
    logo.src = originalLogo;
  }

  // Footer always wins
  if (footerInView) return;

  // Scroll direction
  if (currentScrollY > lastScrollY && currentScrollY > 150) {
    header.classList.add("is-hidden");
  } else {
    header.classList.remove("is-hidden");
  }

  lastScrollY = currentScrollY;
});
