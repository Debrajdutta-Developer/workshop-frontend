import { EnquiryFormData, FormErrors } from "../types/enquiry";

/**
 * Validation rules deliberately mirror backend/src/validations/enquiry.validation.ts
 * so the user sees the *same* rules client-side (fast feedback) as the server
 * will ultimately enforce (source of truth).
 */

export const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,59}$/;
export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const PHONE_REGEX = /^(?:\+91|91|0)?[6-9]\d{9}$/;

/** Validates a single field and returns an error message, or undefined if valid. */
export function validateField(field: keyof EnquiryFormData, value: string): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      if (trimmed.length === 0) return "Name is required.";
      if (!NAME_REGEX.test(trimmed)) {
        return "Use 2–60 letters, spaces, hyphens or apostrophes only.";
      }
      return undefined;

    case "email":
      if (trimmed.length === 0) return "Email is required.";
      if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address.";
      return undefined;

    case "phone": {
      if (trimmed.length === 0) return "Phone number is required.";
      const normalized = trimmed.replace(/[\s-]/g, "");
      if (!PHONE_REGEX.test(normalized)) {
        return "Enter a valid 10-digit mobile number (optionally with +91).";
      }
      return undefined;
    }

    default:
      return undefined;
  }
}

/** Validates the full form payload, returning an errors object (empty = valid). */
export function validateForm(data: EnquiryFormData): FormErrors {
  const errors: FormErrors = {};

  (Object.keys(data) as Array<keyof EnquiryFormData>).forEach((field) => {
    const message = validateField(field, data[field]);
    if (message) errors[field] = message;
  });

  return errors;
}
