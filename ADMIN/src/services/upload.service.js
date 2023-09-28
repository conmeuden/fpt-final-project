import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL;

const UploadService = {
  singleFile: async ({ file }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        `${baseURL}api/upload/single`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.filePath) {
        throw new Error("Failed to upload file");
      }

      const filepath = `${baseURL.slice(0, -1)}${response.data.filePath}`;

      return filepath;
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
      const response = await axios.post(
        `${baseURL}api/upload/multiple`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.filePaths) {
        throw new Error("Failed to upload files");
      }

      const filePaths = response.data.filePaths.map(
        (filePath) => `${baseURL.slice(0, -1)}${filePath}`
      );

      return filePaths;
    } catch (error) {
      console.error("Error uploading multiple files:", error);
      throw error;
    }
  },
};

export default UploadService;
