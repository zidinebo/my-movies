import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://entertainment-app-server-4pq5.onrender.com",
});

// Adding a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error); // Logging errors to the console
    return Promise.reject(error); // Passing the error to the next handler
  }
);

// Setting default headers if a token is available
const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Setting a default timeout for requests
axiosInstance.defaults.timeout = 20000; // Timeout of 20 seconds

export default axiosInstance;
