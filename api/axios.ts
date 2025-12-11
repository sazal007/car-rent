import axios, { AxiosError } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define the API error response structure
interface ApiErrorResponse {
  error?: {
    message?: string;
    params?: Record<string, string>;
  };
  message?: string;

  [key: string]: unknown;
}

// Define the normalized error structure
export interface NormalizedError {
  message: string;
  status?: number;
  fieldErrors?: Record<string, string>;
  isAxiosError: boolean;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const responseData = error.response?.data;
    const fieldErrors: Record<string, string> = {};
    let message = "Something went wrong";

    // Extract field-specific errors
    if (responseData) {
      // Handle nested error.params structure
      if (responseData.error?.params) {
        Object.assign(fieldErrors, responseData.error.params);
      }

      // Handle direct field errors (like { email: "Error message" })
      Object.keys(responseData).forEach((key) => {
        if (key !== "error" && key !== "message") {
          const value = responseData[key];
          if (typeof value === "string") {
            fieldErrors[key] = value;
          } else if (Array.isArray(value) && value.length > 0) {
            fieldErrors[key] = value[0];
          }
        }
      });

      // Determine the main message
      if (responseData.error?.message) {
        message = responseData.error.message;
      } else if (responseData.message) {
        message = responseData.message;
      } else if (Object.keys(fieldErrors).length > 0) {
        // Use the first field error as the main message
        message = Object.values(fieldErrors)[0];
      }
    }

    // Fallback to error message if no response data
    if (message === "Something went wrong" && error.message) {
      message = error.message;
    }

    const normalizedError: NormalizedError = {
      message,
      status: error.response?.status,
      fieldErrors:
        Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
      isAxiosError: true,
    };

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
