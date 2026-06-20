import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "What does my child need to participate?",
    a: "A laptop or desktop computer (Windows/Mac/Linux), a stable internet connection, and genuine curiosity. No prior coding or electronics experience is required — we start from absolute zero and build up. We recommend a screen size of at least 11 inches for the best experience during live sessions.",
  },
  {
    q: "What does a typical week look like?",
    a: "Each week has three 75-minute live sessions (recorded and available for replay), two independent project hours, and one mentor office-hours slot. Week 1 covers Python basics + circuits; Week 2 moves to sensors and control; Week 3 introduces ML concepts; Week 4 is dedicated to the capstone project and final demo.",
  },
  {
    q: "Is the fee inclusive of all materials?",
    a: "The ₹2,999 fee covers the full 4-week live curriculum, recordings, project kits (PDFs + digital files for 3D-printed parts), mentor access, and the digital certificate. A physical starter kit with components can be purchased optionally for ₹799 — details are sent after registration.",
  },
  {
    q: "What if my child misses a session?",
    a: "Every live session is recorded in full and uploaded to the learner portal within 2 hours of completion. Students can watch at their own pace, and mentor office-hours are designed to help catch up on anything they missed. We also have a community forum where peers answer each other's questions.",
  },
  {
    q: "Will there be a refund if we change our mind?",
    a: "Yes — if you cancel before the programme starts (i.e., before 15 July 2026), we issue a full refund with no questions asked. After the programme begins, a 50% refund is available within the first 7 days. After that point, no refund is issued but access to all recordings remains until 31 December 2026.",
  },
];

interface AccordionItemProps {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, index, isOpen, onToggle }: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
        isOpen ? "border-amber-500/30 bg-ink-700" : "border-white/[0.06] bg-ink-800 hover:border-white/[0.12]"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-sm font-bold leading-snug text-white sm:text-base">
          {item.q}
        </span>
        <span
          className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "border-amber-500/40 bg-amber-500/15 text-amber-400 rotate-45"
              : "border-white/10 bg-white/5 text-slate-350"
          }`}
        >
          <Plus size={15} strokeWidth={2.5} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-slate-350">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="relative bg-ink-900 px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions?{" "}
              <span className="text-amber-400">We've got answers.</span>
            </>
          }
          subtitle="Everything parents and students want to know before signing up."
        />

        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              item={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
