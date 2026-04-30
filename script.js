const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const form = document.querySelector(".contact-form");
const note = document.querySelector("[data-form-note]");
const tiltStage = document.querySelector("[data-tilt-stage]");
const scene = document.querySelector(".medical-scene");
const cleanPreviewCard = document.querySelector(".clean-preview-card");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
});

form?.addEventListener("submit", (event) => {
  if (window.location.protocol === "file:") {
    event.preventDefault();
    note.textContent = "Local preview: this form will submit when the site is deployed on Netlify.";
    form.reset();
  }
});

tiltStage?.addEventListener("pointermove", (event) => {
  if (window.matchMedia("(max-width: 980px)").matches) return;

  const bounds = tiltStage.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  if (scene) {
    scene.style.transform = `rotateX(${9 - y * 5}deg) rotateY(${-13 + x * 7}deg) rotateZ(1deg)`;
  }

  if (cleanPreviewCard) {
    cleanPreviewCard.style.transform = `rotateX(${6 - y * 9}deg) rotateY(${-10 + x * 14}deg) translateY(${y * -10}px)`;
  }
});

tiltStage?.addEventListener("pointerleave", () => {
  if (window.matchMedia("(max-width: 980px)").matches) return;
  if (scene) scene.style.transform = "rotateX(9deg) rotateY(-13deg) rotateZ(1deg)";
  if (cleanPreviewCard) cleanPreviewCard.style.transform = "rotateX(6deg) rotateY(-10deg)";
});
