import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.tripmarble.com",
  withCredentials: true,
});

export default apiClient;
