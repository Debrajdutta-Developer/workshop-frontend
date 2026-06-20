/** Smoothly scrolls to a section by id, accounting for the sticky navbar's height. */
export function scrollToSection(id: string, offset = 80): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
