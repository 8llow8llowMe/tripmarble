import axios from "axios";

const apiClient = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_URL || "https://tripmarble.com"
  }/api/v1`,
  withCredentials: true,
});

export default apiClient;
