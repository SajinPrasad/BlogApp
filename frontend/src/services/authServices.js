import { toast } from "react-toastify";
import privateAxiosInstance, { publicAxiosInstance } from "../api/api";

export const userRegistrationService = async (formData) => {
  const { firstName, lastName, email, password, confirmPassword } = formData;

  try {
    const response = await publicAxiosInstance.post("api/register/", {
      first_name: firstName,
      last_name: lastName,
      email,
      password1: password,
      password2: confirmPassword,
    });
    console.log(response);
    if (response.status >= 200 && response.status < 301) {
      toast.success("User registered successfully");
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
};

export const loginService = async (formData) => {
  try {
    const response = await publicAxiosInstance.post("/api/token/", formData);
    if (response.status >= 200 && response.status < 301) {
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
};

export const handleError = (error) => {
  if (error.response) {
    const responseData = error.response.data;

    // Check if detailed error information exists
    if (responseData?.error) {
      const { message, details } = responseData.error;

      // Toast the main error message
      if (message) {
        toast.error(`${message}`);
        return;
      }

      // Handle field-specific validation errors
      if (details) {
        Object.entries(details).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => {
              toast.error(`${msg}`);
            });
          } else {
            toast.error(`${messages}`);
          }
        });
      }
    } else if (responseData) {
      // Handle non-standard error structures (e.g., field-level errors directly)
      Object.entries(responseData).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => {
            toast.error(`${msg}`);
          });
        } else {
          toast.error(`${messages}`);
        }
      });
    }
  } else if (error.request) {
    // Handle cases where no response was received from the backend
    toast.error(
      "No response received from the server. Please check your connection."
    );
  } else {
    // Handle other unexpected errors
    toast.error(
      `Unexpected error: ${error.message || "Unknown issue occurred."}`
    );
  }
};

export const logoutService = async (refreshToken) => {
  console.log("refresh token: ", refreshToken);
  try {
    const response = await privateAxiosInstance.post("/api/logout/", {
      refresh: refreshToken,
    });
    if (response.status >= 200 && response.status < 301) {
      return true;
    }
  } catch (error) {
    handleError(error);
  }
};

export default handleError;
