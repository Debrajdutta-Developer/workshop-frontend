import { motion } from "framer-motion";
import { CalendarDays, Clock, Globe2, IndianRupee, Users } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface DetailCard {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: "amber" | "cyan";
}

const DETAILS: DetailCard[] = [
  { icon: Users, label: "Age Group", value: "9 – 14 Years", accent: "amber" },
  { icon: Clock, label: "Duration", value: "4 Weeks", accent: "cyan" },
  { icon: Globe2, label: "Mode", value: "100% Online", accent: "amber" },
  { icon: IndianRupee, label: "Fee", value: "₹2,999 Only", accent: "cyan" },
  { icon: CalendarDays, label: "Start Date", value: "15 July 2026", accent: "amber" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

export default function WorkshopDetails() {
  return (
    <section id="details" className="relative bg-ink-900 px-5 py-24 sm:px-8">
      {/* Subtle top separator glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Workshop Details"
          title={
            <>
              Everything you need to
              <br />
              <span className="text-amber-400">know at a glance.</span>
            </>
          }
          subtitle="One affordable program, real skills, and a community of young builders."
        />

        {/* Cards grid — 2 cols on mobile, 3 on sm, 5 on lg */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {DETAILS.map((detail, i) => (
            <motion.div
              key={detail.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border p-6 text-center transition-shadow duration-300 hover:shadow-panel ${
                detail.accent === "amber"
                  ? "border-amber-500/15 bg-ink-800 hover:border-amber-500/30"
                  : "border-signal-500/15 bg-ink-800 hover:border-signal-500/30"
              }`}
            >
              {/* Corner glow */}
              <div
                className={`pointer-events-none absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${
                  detail.accent === "amber"
                    ? "bg-amber-500/20 opacity-0"
                    : "bg-signal-500/20 opacity-0"
                }`}
              />

              {/* Icon */}
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  detail.accent === "amber"
                    ? "bg-amber-500/15 text-amber-400"
                    : "bg-signal-500/15 text-signal-400"
                }`}
              >
                <detail.icon size={22} strokeWidth={1.75} />
              </span>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-350">
                  {detail.label}
                </p>
                <p className="mt-1 font-display text-lg font-bold leading-tight text-white">
                  {detail.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
