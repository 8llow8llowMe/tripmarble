import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const authApiClient: AxiosInstance = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_AUTH_SERVICE || "https://api.tripmarble.com"
  }/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_GATEWAY || "https://api.tripmarble.com"
  }/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정 - 쿠키에서 accessToken을 읽어 Authorization 헤더에 추가
authApiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정 - 401 발생 시 토큰 재발급 및 재시도
authApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return reissueTokenAndRetryRequest(originalRequest, authApiClient);
    }
    return Promise.reject(error);
  }
);

async function reissueTokenAndRetryRequest(
  originalRequest: InternalAxiosRequestConfig,
  instance: AxiosInstance
) {
  try {
    const session = sessionStorage.getItem("email");
    if (!session) return;

    const memberEmail = JSON.parse(session).state.email;

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE}/api/v1/member/reissue/accessToken/${memberEmail}`
    );

    if (res.data.dataHeader.successCode === 0) {
      const { accessToken } = res.data.dataBody;
      localStorage.setItem("accessToken", accessToken);
    } else {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return await instance.request(originalRequest);
  } catch (error) {
    console.error("Token reissue failed:", error);
    throw error;
  }
}
