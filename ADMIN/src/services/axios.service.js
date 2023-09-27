import axios from "axios";

class AxiosService {
  constructor() {
    this.initializeHttpClient();
    this.setupRequestInterceptor();
  }

  async get({ url, params }) {
    return this.sendRequest({ method: "get", url, params });
  }

  async post({ url, data }) {
    return this.sendRequest({ method: "post", url, data });
  }

  async put({ url, data }) {
    return this.sendRequest({ method: "put", url, data });
  }

  async delete({ url }) {
    return this.sendRequest({ method: "delete", url });
  }

  initializeHttpClient() {
    const baseURL = import.meta.env.VITE_REACT_API_URL;

    this.httpClient = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        baseUrl: baseURL,
      },
    });
  }

  setupRequestInterceptor() {
    this.httpClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  setupResponseInterceptor() {
    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleResponseError(error);
        return Promise.reject(error);
      }
    );
  }

  async sendRequest(config) {
    try {
      const response = await this.httpClient(config);
      return response;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    }
  }

  handleResponseError(error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);

      const errorMessage =
        error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred";

      // Gửi thông điệp lỗi về cho client
      throw new Error(errorMessage);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }

  handleRequestError(error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
}

export default new AxiosService();
