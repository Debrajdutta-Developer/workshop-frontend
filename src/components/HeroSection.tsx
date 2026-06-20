import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Zap } from "lucide-react";
import { scrollToSection } from "../utils/scroll";

/** Stagger config for children entering the hero sequentially */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 px-5 pt-24 pb-16 text-center sm:px-8"
    >
      {/* ── Background: grid + radial glows ─────────────────────────────── */}
      <div className="bg-grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(253,184,19,0.12),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-signal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 rounded-full bg-amber-500/8 blur-3xl" />

      {/* ── Orbiting badge ring ───────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="h-[520px] w-[520px] rounded-full border border-dashed border-white/[0.06]"
        />
        {/* Amber dot orbiting the ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute h-[520px] w-[520px]"
          style={{ transformOrigin: "center center" }}
        >
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_12px_4px_rgba(253,184,19,0.55)]" />
        </motion.div>

        {/* Cyan dot on counter-orbit */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute h-[390px] w-[390px] rounded-full border border-dashed border-white/[0.04]"
          style={{ transformOrigin: "center center" }}
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-2.5 w-2.5 rounded-full bg-signal-400 shadow-[0_0_10px_4px_rgba(34,211,238,0.5)]" />
        </motion.div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl"
      >
        {/* Eyebrow pill */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
            <Sparkles size={12} />
            Summer Workshop 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="mt-6 font-display text-5xl font-black leading-[1.05] tracking-tight text-white text-glow-amber sm:text-6xl lg:text-7xl"
        >
          Build Robots.
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-signal-400 bg-clip-text text-transparent">
            Code AI.
          </span>
          <br />
          Shape the Future.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-350 sm:text-xl"
        >
          A 4-week online program for young innovators aged&nbsp;
          <strong className="font-semibold text-white">9–14</strong> — where they design
          real circuits, train machine-learning models, and ship a
          capstone project they're proud of.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollToSection("register")}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-amber-500 px-8 py-4 text-base font-bold text-ink-900 shadow-glow transition-all duration-300 hover:bg-amber-400 hover:shadow-none hover:scale-[1.03] active:scale-[0.98]"
          >
            <Zap size={18} strokeWidth={2.5} className="transition-transform group-hover:rotate-12" />
            Enroll Now — ₹2,999
            {/* Shimmer overlay */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          <button
            onClick={() => scrollToSection("details")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-350 transition-colors hover:text-white"
          >
            See what's included
            <ArrowDown size={16} className="animate-bounce" />
          </button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-350"
        >
          {["Live Expert Sessions", "Hands-On Projects", "Certificate of Completion", "Starts 15 July 2026"].map(
            (tag) => (
              <span key={tag} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
                {tag}
              </span>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
