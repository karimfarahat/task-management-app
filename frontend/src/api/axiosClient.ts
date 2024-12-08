import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

const authClient = axios.create({
  baseURL: BASE_URL,
});

authClient.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export { axiosClient, authClient };
