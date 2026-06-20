import { ApiResponse, EnquiryFormData, EnquiryRecord } from "../types/enquiry";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://workshop-backend-ppbs.onrender.com";

export async function submitEnquiry(
  payload: EnquiryFormData
): Promise<ApiResponse<EnquiryRecord>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return (await response.json()) as ApiResponse<EnquiryRecord>;
  } catch {
    return {
      success: false,
      message:
        "We couldn't reach the server. Please check your connection and try again.",
    };
  }
}
