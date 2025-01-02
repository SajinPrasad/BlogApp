import { toast } from "react-toastify";
import privateAxiosInstance, { publicAxiosInstance } from "../api/api";
import handleError from "./authServices";

export const createPostService = async (formData) => {
  try {
    const response = await privateAxiosInstance.post(
      "/api/create-post/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if ((response.status >= 200) & (response.status < 301)) {
      toast.success("Post created");
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
};

export const getPostsService = async () => {
  try {
    const response = await publicAxiosInstance.get("/api/posts/");
    return response.data; // Return the posts data
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx
      toast.error(
        `Error: ${error.response.data.detail || "Something went wrong."}`
      );
    } else if (error.request) {
      // Request was made but no response received
      toast.error(
        "Network error: Unable to reach the server. Please try again."
      );
    } else {
      // Something else caused the error
      toast.error(`Unexpected error: ${error.message}`);
    }
    throw error; // Re-throw the error if needed for further handling
  }
};

export const retrievePostService = async (postId) => {
  try {
    const response = await publicAxiosInstance.get(`/api/posts/${postId}/`);
    return response.data; // Return the posts data
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx
      toast.error(
        `Error: ${error.response.data.detail || "Something went wrong."}`
      );
    } else if (error.request) {
      // Request was made but no response received
      toast.error(
        "Network error: Unable to reach the server. Please try again."
      );
    } else {
      // Something else caused the error
      toast.error(`Unexpected error: ${error.message}`);
    }
    throw error; // Re-throw the error if needed for further handling
  }
};

export const deltePostService = async (postId) => {
  try {
    const response = await privateAxiosInstance.delete(`/api/delete/${postId}/`);

    if (response.status >= 200 && response.status < 301) {
      toast.success("Post deleted");
      return true;
    }
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx
      toast.error(
        `Error: ${error.response.data.detail || "Something went wrong."}`
      );
    } else if (error.request) {
      // Request was made but no response received
      toast.error(
        "Network error: Unable to reach the server. Please try again."
      );
    } else {
      // Something else caused the error
      toast.error(`Unexpected error: ${error.message}`);
    }
    throw error; // Re-throw the error if needed for further handling
  }
};

export const editPostService = async (formData, postId) => {
  console.log("Form data:", formData);
  try {
    const response = await privateAxiosInstance.patch(
      `/api/edit/${postId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if ((response.status >= 200) & (response.status < 301)) {
      toast.success("Post updated");
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
};

export const listMypostsService = async () => {
  try {
    const response = await privateAxiosInstance.get("/api/myposts/");
    return response.data; // Return the posts data
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx
      toast.error(
        `Error: ${error.response.data.detail || "Something went wrong."}`
      );
    } else if (error.request) {
      // Request was made but no response received
      toast.error(
        "Network error: Unable to reach the server. Please try again."
      );
    } else {
      // Something else caused the error
      toast.error(`Unexpected error: ${error.message}`);
    }
    throw error; // Re-throw the error if needed for further handling
  }
};
