import { ApiResponse, EnquiryFormData, EnquiryRecord } from "../types/enquiry";

// Configure via .env (VITE_API_BASE_URL=https://your-api.example.com) for production builds.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

/**
 * Submits the registration form to POST /api/enquiry.
 * Returns the parsed ApiResponse regardless of HTTP status — callers branch
 * on `success` rather than try/catching non-2xx responses, since the backend
 * always returns a well-formed JSON envelope (see backend/src/app.ts).
 */
export async function submitEnquiry(payload: EnquiryFormData): Promise<ApiResponse<EnquiryRecord>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return (await response.json()) as ApiResponse<EnquiryRecord>;
  } catch {
    // Network failure, CORS issue, server down, etc. — the fetch itself threw.
    return {
      success: false,
      message: "We couldn't reach the server. Please check your connection and try again.",
    };
  }
}
