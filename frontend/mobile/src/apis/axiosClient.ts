import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAsyncStorageItem,
  removeAsyncStorageItem,
  setAsyncStorageItem,
} from '@/utils/asyncStorage';
import { STORAGE_KEY } from '@/constants/keys';
import { store } from '@/store/store';
import { logout } from '@/store/redux/auth/auth';

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_AUTH_SERVICE || 'https://api.tripmarble.com'}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const authApiClient: AxiosInstance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_SERVICE || 'https://api.tripmarble.com'}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 요청 인터셉터: 토큰 자동 주입
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 → 토큰 재발급 후 재요청
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰 재발급 + 재요청 함수
      return reissueTokenAndRetryRequest(originalRequest, authApiClient);
    }

    // 다른 오류는 그대로 반환
    return Promise.reject(error);
  },
);

// 토큰 재발급 & 원본 요청 재시도 함수
async function reissueTokenAndRetryRequest(
  originalRequest: InternalAxiosRequestConfig,
  instance: AxiosInstance,
) {
  try {
    // TODO: 토큰 재발급 API 호출

    // AsyncStorage에 저장된 유저 email 정보 불러오기
    // const session = await AsyncStorage.getItem('USER_SESSION'); // USER_SESSION 등 실제 사용 값으로!
    // if (!session) throw new Error('세션 없음');

    // const memberEmail = JSON.parse(session).email; // { email: "..." } 구조로 저장했다고 가정

    const memberEmail = 'lsh1751@naver.com';

    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_AUTH_SERVICE}/member/reissue/accessToken/${memberEmail}`,
    );

    if (res.data.dataHeader.successCode === 0) {
      const newToken = res.data.dataBody;
      await setAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN, newToken);
    } else {
      throw new Error('토큰 재발급 실패');
    }

    // 새 토큰으로 Authorization 헤더 세팅
    const accessToken = await getAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN);
    if (accessToken && originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 원래 요청 재시도
    return await instance.request(originalRequest);
  } catch (error) {
    // TODO: 재발급 실패 처리
    console.error('Token reissue failed:', error);
    removeAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN);
    store.dispatch(logout());

    throw error;
  }
}
