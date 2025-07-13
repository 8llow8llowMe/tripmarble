import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const apiClient: AxiosInstance = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_AUTH_SERVICE || "https://api.tripmarble.com"
  }/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정 - 쿠키에서 accessToken을 읽어 Authorization 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정 - 401 발생 시 토큰 재발급 및 재시도
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return reissueTokenAndRetryRequest(originalRequest, apiClient);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

async function reissueTokenAndRetryRequest(
  originalRequest: InternalAxiosRequestConfig,
  instance: AxiosInstance
) {
  try {
    const session = sessionStorage.getItem("email");
    if (!session) return;

    const cookies = new Cookies();
    const memberEmail = JSON.parse(session).state.email;

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE}/api/v1/member/reissue/accessToken/${memberEmail}`
    );

    if (res.data.dataHeader.successCode === 0) {
      cookies.set("accessToken", res.data.dataBody);
    } else {
      return;
    }

    const accessToken = cookies.get("accessToken");
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return await instance.request(originalRequest);
  } catch (error) {
    console.error("Token reissue failed:", error);
    throw error;
  }
}
