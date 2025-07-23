// src/utils/formatError.ts
import axios from "axios";

interface FormattedError {
  title: string;
  message: string;
  statusCode?: number;
}

export const formatError = (error: unknown): FormattedError => {
  // Axios error object
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    // Server responded with a known error message
    if (data && typeof data === "object") {
      const message =
        data.message || data.error || data.detail || "Something went wrong.";

      return {
        title: "Server Error",
        message: message,
        statusCode: status,
      };
    }

    // Server did not respond at all (e.g., no internet)
    if (error.request && !error.response) {
      return {
        title: "Network Error",
        message: "Unable to reach server. Please check your internet connection.",
      };
    }

    // Fallback for Axios errors
    return {
      title: "Request Error",
      message: error.message || "Unexpected request error occurred.",
    };
  }

  // Generic JavaScript error
  if (error instanceof Error) {
    return {
      title: "Error",
      message: error.message,
    };
  }

  // If we don't know what this is (e.g., string, number, null, etc.)
  return {
    title: "Unknown Error",
    message: "An unknown error occurred.",
  };
};
