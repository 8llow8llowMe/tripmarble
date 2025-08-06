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
import { Alert } from 'react-native';

export const authApiClient: AxiosInstance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_AUTH_SERVICE || 'https://api.tripmarble.com'}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_GATEWAY || 'https://api.tripmarble.com'}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 요청 인터셉터: 토큰 자동 주입
authApiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN);
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.request.use(
  async (config) => {
    console.log('[Axios Request]', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    const accessToken = await getAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN);
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('[Axios Request Error]', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 401 → 토큰 재발급 후 재요청
authApiClient.interceptors.response.use(
  (response) => {
    console.log('[Axios Response]', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    console.error('[Axios Response Error]', {
      url: error.config.url,
      status: error.response.status,
      data: error.response.data,
    });

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
    const memberIdString = await getAsyncStorageItem(STORAGE_KEY.MEMBER_ID);
    const memberId = memberIdString ? Number(memberIdString) : 0;

    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_AUTH_SERVICE}/api/v1/auth/token/reissue`,
      {
        memberId,
      },
    );

    if (res.data.dataHeader.success) {
      const newToken = res.data.dataBody.accessToken;
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
    if (axios.isAxiosError(error)) {
      console.error('Token reissue failed:', error, error.response);
    } else {
      console.error('Token reissue failed:', error);
    }

    // 로그아웃 및 AsyncStorage 초기화
    removeAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN);
    removeAsyncStorageItem(STORAGE_KEY.MEMBER_ID);
    store.dispatch(logout());
    Alert.alert('알림', '로그인 정보가 만료되었습니다. 다시 로그인 해주세요.');

    throw error;
  }
}
