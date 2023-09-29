import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL;

const UploadService = {
  singleFile: async ({ file }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("access_token");

      const response = await axios.post(`${baseURL}single`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.filePath) {
        throw new Error("Failed to upload file");
      }

      return response.data.filePath;
    } catch (error) {
      console.error("Error uploading single file:", error);
      throw error;
    }
  },

  multipleFiles: async ({ files }) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const token = localStorage.getItem("access_token");

      const response = await axios.post(`${baseURL}multiple`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.filePaths) {
        throw new Error("Failed to upload files");
      }

      return response.data.filePaths;
    } catch (error) {
      console.error("Error uploading multiple files:", error);
      throw error;
    }
  },
};

export default UploadService;
