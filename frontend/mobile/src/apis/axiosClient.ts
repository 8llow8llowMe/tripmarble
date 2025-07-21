import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.tripmarble.com';

const createAxiosInstance = (baseURL?: string) => {
  const instance = axios.create({
    baseURL: baseURL ?? '',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    timeout: 10000,
  });

  // 요청 인터셉터: 토큰 자동 주입
  instance.interceptors.request.use(
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
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // 토큰 재발급 + 재요청 함수
        return reissueTokenAndRetryRequest(originalRequest, instance);
      }

      // 다른 오류는 그대로
      return Promise.reject(error);
    },
  );

  return instance;
};

// 토큰 재발급 & 원본 요청 재시도 함수
async function reissueTokenAndRetryRequest(
  originalRequest: InternalAxiosRequestConfig,
  instance: AxiosInstance,
) {
  try {
    // AsyncStorage에 저장된 유저 email 정보 불러오기
    const session = await AsyncStorage.getItem('USER_SESSION'); // USER_SESSION 등 실제 사용 값으로!
    if (!session) throw new Error('세션 없음');

    const memberEmail = JSON.parse(session).email; // { email: "..." } 구조로 저장했다고 가정

    // 토큰 재발급 API 호출
    const res = await axios.post(`${API_BASE_URL}/member/reissue/accessToken/${memberEmail}`);
    if (res.data.dataHeader.successCode === 0) {
      const newToken = res.data.dataBody;
      await AsyncStorage.setItem('ACCESS_TOKEN', newToken);
    } else {
      // 재발급 실패시
      throw new Error('토큰 재발급 실패');
    }

    // 새 토큰으로 Authorization 헤더 세팅
    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    if (accessToken && originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 원래 요청 재시도
    return await instance.request(originalRequest);
  } catch (error) {
    // 재발급 실패 처리: 필요시 로그아웃, 알림 등
    console.error('Token reissue failed:', error);
    // 로그아웃 등 추가 처리 가능
    throw error;
  }
}

// 실전에서 쓸 axios 인스턴스 export
const axiosClient = createAxiosInstance(API_BASE_URL);

export default axiosClient;
