import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const PUBLIC_PATHS = [
  "/auth/login",
  "/members/signup",
  "/auth/KAKAO/login",
  "/auth/KAKAO/authorize",
];

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

// 전역 인증 실패 리다이렉트 제어 플래그
let __authRedirected = false;

const handleAuthFailure = (message?: string) => {
  if (typeof window === "undefined") return;
  if (__authRedirected) return;
  __authRedirected = true;
  try {
    toast.error(message ?? "로그인이 만료되었습니다. 다시 로그인해주세요.");
  } catch (_) {}
  try {
    const next = encodeURIComponent(
      `${window.location.pathname}${window.location.search}`
    );
    setTimeout(() => {
      window.location.href = `/login?next=${next}`;
    }, 800);
  } catch (_) {}
};

// 요청 인터셉터 설정 - localStorage에서 accessToken을 읽어 Authorization 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    try {
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    } catch (_) {
      // ignore SSR/localStorage access errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authApiClient.interceptors.request.use(
  (config) => {
    if (PUBLIC_PATHS.some((path) => config.url?.includes(path))) {
      return config;
    }
    try {
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    } catch (_) {
      // ignore SSR/localStorage access errors
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

// 일반 API도 401 시 토큰 재발급 후 재시도
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

async function reissueTokenAndRetryRequest(
  originalRequest: InternalAxiosRequestConfig,
  instance: AxiosInstance
) {
  try {
    // localStorage에서 memberId 읽기
    const memberId =
      typeof window !== "undefined" ? localStorage.getItem("memberId") : null;
    if (!memberId) {
      handleAuthFailure();
      throw new Error("No memberId found");
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE}/api/v1/auth/token/reissue`,
      {
        memberId,
      }
    );

    if (res.data.dataHeader.successCode === 0) {
      const { accessToken } = res.data.dataBody;
      localStorage.setItem("accessToken", accessToken);
    } else {
      throw new Error("토큰 재발급 실패");
    }

    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (accessToken) {
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    }
    return await instance.request(originalRequest);
  } catch (error) {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("memberId");
      }
    } catch (_) {}
    console.error("Token reissue failed:", error);
    handleAuthFailure();
    throw error;
  }
}
