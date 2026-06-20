import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}

/**
 * Shared heading pattern used across sections: small uppercase eyebrow label,
 * a display-font title, and an optional subtitle. Animates into view once as
 * the section scrolls into the viewport.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mx-auto max-w-2xl ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold leading-[1.15] text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-350 sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
}
