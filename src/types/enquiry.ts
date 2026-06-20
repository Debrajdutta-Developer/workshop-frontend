/**
 * Mirrors the backend's contract (see backend/src/types/enquiry.types.ts) so the
 * frontend and API stay in sync on field names and response shapes.
 */

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
}

export type FormErrors = Partial<Record<keyof EnquiryFormData, string>>;

export interface FieldError {
  field: keyof EnquiryFormData;
  message: string;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: FieldError[];
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface EnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

/** Submission lifecycle state driving the form's UI (button/spinner/alerts) */
export type SubmissionStatus = "idle" | "submitting" | "success" | "error";
