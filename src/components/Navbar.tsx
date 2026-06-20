import { motion } from "framer-motion";
import { Cpu, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToSection } from "../utils/scroll";

const NAV_LINKS = [
  { label: "Workshop", href: "details" },
  { label: "Outcomes", href: "outcomes" },
  { label: "FAQ", href: "faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-900/90 shadow-[0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wider text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-ink-900">
            <Cpu size={18} strokeWidth={2.5} />
          </span>
          <span>
            Workshop<span className="text-amber-400">Lab</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollToSection(link.href)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-350 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollToSection("register")}
          className="hidden rounded-xl bg-amber-500 px-5 py-2 text-sm font-bold text-ink-900 shadow-glow transition-all hover:bg-amber-400 hover:shadow-none sm:block"
        >
          Enroll Now
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-350 hover:bg-white/5 hover:text-white sm:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/5 bg-ink-900/98 px-5 pb-6 pt-3 backdrop-blur-xl sm:hidden"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                scrollToSection(link.href);
                setMenuOpen(false);
              }}
              className="flex w-full items-center py-3 text-base font-medium text-slate-250 hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              scrollToSection("register");
              setMenuOpen(false);
            }}
            className="mt-3 w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-ink-900"
          >
            Enroll Now
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
