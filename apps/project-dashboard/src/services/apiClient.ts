import axios from "axios";

// Create configured Axios client
const apiClient = axios.create({
  timeout: 10000, // 10s timeout
});

// Request Interceptor: Logs request vectors in development
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[HTTP Request] ${config.method?.toUpperCase()} -> ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Catches errors globally for diagnostics
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn(
      `[HTTP Response Error] Status: ${error.response?.status || "Network Error"} | Message: ${error.message}`
    );
    return Promise.reject(error);
  }
);

export default apiClient;
