import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, XCircle } from "lucide-react";
import { ToastState } from "../hooks/useToast";

interface ToastProps {
  toast: ToastState | null;
  onDismiss: () => void;
}

/**
 * Floating toast rendered at the viewport's bottom-right. Mounted once at the
 * App level so it can surface feedback from any section (currently just the
 * registration form).
 */
export default function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:justify-end">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-panel backdrop-blur-xl ${
              toast.variant === "success"
                ? "border-signal-500/25 bg-ink-800/95 text-slate-250"
                : "border-red-500/25 bg-ink-800/95 text-slate-250"
            }`}
            role="status"
            aria-live="polite"
          >
            <span
              className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full ${
                toast.variant === "success" ? "bg-signal-500/15 text-signal-400" : "bg-red-500/15 text-red-400"
              }`}
            >
              {toast.variant === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            </span>

            <p className="flex-1 pt-1 text-sm leading-snug">{toast.message}</p>

            <button
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="flex-none rounded-full p-1 text-slate-350 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
