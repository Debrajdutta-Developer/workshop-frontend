import { motion } from "framer-motion";
import { Binary, Bot, Brain, FlaskConical, Rocket, Shield } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface Outcome {
  icon: React.ElementType;
  title: string;
  body: string;
}

const OUTCOMES: Outcome[] = [
  {
    icon: Bot,
    title: "Design & Assemble Real Robots",
    body: "Students build and program functional robots from scratch — understanding servos, sensors, and control loops through hands-on challenges each week.",
  },
  {
    icon: Brain,
    title: "Train Their First AI Model",
    body: "Using beginner-friendly tools, learners collect data, train a classification model, and evaluate it — demystifying machine learning from the ground up.",
  },
  {
    icon: Binary,
    title: "Master Python Programming Fundamentals",
    body: "From variables to loops to functions, every concept is taught through mini-projects — so coding feels like building, not memorising syntax.",
  },
  {
    icon: FlaskConical,
    title: "Apply the Engineering Design Process",
    body: "Students prototype, test, iterate and improve — developing the resilient problem-solving mindset that distinguishes great engineers.",
  },
  {
    icon: Shield,
    title: "Present a Capstone Project",
    body: "Every participant designs and demos an original AI or robotics project by week 4, building the portfolio and confidence to tackle bigger challenges.",
  },
  {
    icon: Rocket,
    title: "Gain Industry-Recognised Certification",
    body: "Completers receive a digital certificate co-branded by WorkshopLab — recognised by partner schools and STEM programmes across India.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
  }),
};

export default function LearningOutcomes() {
  return (
    <section id="outcomes" className="relative bg-ink-950 px-5 py-24 sm:px-8">
      <div className="bg-grid-overlay pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-500/25 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Learning Outcomes"
          title={
            <>
              6 transformative skills
              <br />
              <span className="text-signal-400">your child will own.</span>
            </>
          }
          subtitle="Not lectures — live-build sessions. Every concept maps to something a student creates, ships, and keeps."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((outcome, i) => (
            <motion.article
              key={outcome.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-800 p-7 shadow-panel transition-shadow hover:border-signal-500/25 hover:shadow-glow-cyan"
            >
              {/* Numbered accent */}
              <span className="absolute right-5 top-5 font-display text-5xl font-black leading-none text-white/[0.04]">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon badge */}
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-500/12 text-signal-400 ring-1 ring-signal-500/20 transition-colors group-hover:bg-signal-500/20">
                <outcome.icon size={22} strokeWidth={1.75} />
              </span>

              <h3 className="mb-3 font-display text-[15px] font-bold leading-snug text-white">
                {outcome.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-350">{outcome.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
