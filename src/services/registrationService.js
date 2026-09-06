import { registrationConfig } from '../config/registrationConfig';

export const submitRegistration = async (data) => {
  const { GOOGLE_APPS_SCRIPT_URL } = registrationConfig;

  // Development / fallback mode
  if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL === "") {
    console.warn("GOOGLE_APPS_SCRIPT_URL is not configured. Simulating successful submission for development.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Development mode: Registration simulated successfully." });
      }, 2000);
    });
  }

  try {
    // We send data as plain text with JSON stringified to bypass CORS preflight restrictions
    // Google Apps Script can parse this easily using JSON.parse(e.postData.contents)
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      // mode: "no-cors" is no longer needed if we use text/plain, allowing us to read the response!
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.status === "success") {
      return { success: true };
    } else {
      console.error("Server returned error:", result.message);
      return { success: false, error: result.message || "Server rejected the submission." };
    }
  } catch (error) {
    console.error("Registration submission failed due to network error:", error);
    return { success: false, error: "Network error. Please check your connection and try again." };
  }
};
