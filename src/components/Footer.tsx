import { Cpu, Github, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-ink-950 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wider text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-ink-900">
            <Cpu size={18} strokeWidth={2.5} />
          </span>
          Workshop<span className="text-amber-400">Lab</span>
        </a>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-350">
          {["Privacy Policy", "Terms of Service", "Contact Us", "Refund Policy"].map((link) => (
            <a key={link} href="#" className="transition-colors hover:text-white">
              {link}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-3">
          {[Github, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-350 transition-colors hover:border-amber-500/30 hover:text-amber-400"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <p className="text-[11px] text-slate-350/50">
          © {year} WorkshopLab. Crafted with ❤️ for young innovators across India.
        </p>
      </div>
    </footer>
  );
}
