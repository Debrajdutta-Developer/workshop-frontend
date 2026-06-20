import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { submitEnquiry } from "../lib/api";
import { EnquiryFormData, FieldError, FormErrors, SubmissionStatus } from "../types/enquiry";
import { validateField, validateForm } from "../utils/validation";
import SectionHeading from "./SectionHeading";

const INITIAL_FORM: EnquiryFormData = { name: "", email: "", phone: "" };

/**
 * Full-featured registration form. Features:
 *  - Controlled inputs with per-field live validation on blur
 *  - Full-form validation on submit (with focus jump to first error)
 *  - Loading state disables the submit button and shows a spinner
 *  - Server-side field errors are mapped back to their respective inputs
 *  - Inline success/error alert replaces the form on completion
 */
export default function RegistrationForm() {
  const [formData, setFormData] = useState<EnquiryFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryFormData, boolean>>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  // ----- Change / blur handlers --------------------------------------------

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const field = name as keyof EnquiryFormData;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Live error clearing once the user starts correcting a field
    if (touched[field]) {
      const fieldError = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: fieldError }));
    }
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const field = name as keyof EnquiryFormData;
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldError = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  }

  // ----- Submit handler ---------------------------------------------------

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Mark all fields as touched so errors show even if user hasn't tabbed through
    setTouched({ name: true, email: true, phone: true });
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});

    const response = await submitEnquiry(formData);

    if (response.success) {
      setStatus("success");
      setServerMessage(response.message);
    } else {
      setStatus("error");
      setServerMessage(response.message);

      // Map server field-level errors back to the local error state
      if ("errors" in response && response.errors) {
        const serverErrors: FormErrors = {};
        (response.errors as FieldError[]).forEach((fe) => {
          serverErrors[fe.field] = fe.message;
        });
        setErrors(serverErrors);
      }
    }
  }

  // ----- Derived helpers ---------------------------------------------------

  const isSubmitting = status === "submitting";

  function fieldClass(field: keyof EnquiryFormData): string {
    const hasError = touched[field] && errors[field];
    return [
      "w-full rounded-xl border bg-ink-900 px-4 py-3.5 text-sm text-white placeholder-slate-350/50",
      "outline-none transition-all duration-200",
      "focus:ring-2 focus:ring-offset-0",
      hasError
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-white/10 focus:border-amber-500/60 focus:ring-amber-500/20",
    ].join(" ");
  }

  // ----- Render ------------------------------------------------------------

  return (
    <section id="register" className="relative bg-ink-950 px-5 py-24 sm:px-8">
      <div className="bg-grid-overlay pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-500/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_100%,rgba(253,184,19,0.07),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Register Now"
          title={
            <>
              Secure your child's{" "}
              <span className="text-amber-400">spot today.</span>
            </>
          }
          subtitle="Limited seats available. Fill in the form below and our team will confirm your enrollment within 24 hours."
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-lg"
        >
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800 shadow-panel">
            {/* Card header strip */}
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-7 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal-400/70" />
              <span className="ml-3 text-xs font-medium text-slate-350">workshop-registration.tsx</span>
            </div>

            <div className="px-7 py-8">
              {/* ── Success state ─────────────────────────── */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-5 py-6 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-signal-500/15 ring-1 ring-signal-500/30">
                    <CheckCircle2 size={32} className="text-signal-400" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">You're registered!</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-350">{serverMessage}</p>
                  </div>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData(INITIAL_FORM);
                      setTouched({});
                      setErrors({});
                    }}
                    className="mt-2 text-xs font-semibold text-slate-350 underline-offset-2 hover:text-white hover:underline"
                  >
                    Register another student
                  </button>
                </motion.div>
              ) : (
                /* ── Form ──────────────────────────────────── */
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Server-level error alert (not field-specific) */}
                  {status === "error" && !Object.keys(errors).length && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3"
                    >
                      <AlertCircle size={16} className="mt-0.5 flex-none text-red-400" />
                      <p className="text-sm text-red-300">{serverMessage}</p>
                    </motion.div>
                  )}

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-350">
                      Student / Parent Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Aarav Mehta"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={fieldClass("name")}
                      aria-invalid={!!(touched.name && errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {touched.name && errors.name && (
                      <motion.p
                        id="name-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-xs text-red-400"
                        role="alert"
                      >
                        <AlertCircle size={12} />
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-350">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="aarav@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={fieldClass("email")}
                      aria-invalid={!!(touched.email && errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {touched.email && errors.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-xs text-red-400"
                        role="alert"
                      >
                        <AlertCircle size={12} />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-350">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={fieldClass("phone")}
                      aria-invalid={!!(touched.phone && errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {touched.phone && errors.phone && (
                      <motion.p
                        id="phone-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-xs text-red-400"
                        role="alert"
                      >
                        <AlertCircle size={12} />
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    className={`group relative mt-2 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl py-4 text-sm font-bold transition-all duration-300 ${
                      isSubmitting
                        ? "cursor-not-allowed bg-amber-500/50 text-ink-900/60"
                        : "bg-amber-500 text-ink-900 shadow-glow hover:bg-amber-400 hover:shadow-none"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send size={16} strokeWidth={2.5} />
                        Submit Enquiry
                        {/* Shimmer */}
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[11px] leading-relaxed text-slate-350/60">
                    By submitting you agree to our Privacy Policy. We never share your data with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
