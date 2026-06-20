import { useCallback, useRef, useState } from "react";

export type ToastVariant = "success" | "error";

export interface ToastState {
  id: number;
  variant: ToastVariant;
  message: string;
}

/**
 * Minimal toast manager — holds a single active toast (sufficient for this
 * page's needs) with auto-dismiss. Swap for a queue if multiple concurrent
 * toasts are ever needed.
 */
export function useToast(autoDismissMs = 5000) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (variant: ToastVariant, message: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setToast({ id: Date.now(), variant, message });

      timeoutRef.current = setTimeout(() => setToast(null), autoDismissMs);
    },
    [autoDismissMs]
  );

  const dismissToast = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(null);
  }, []);

  return { toast, showToast, dismissToast };
}
