// 글로벌 타입
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

type ValueOf<T> = T[keyof T];

// 사용자 권한 타입
type Role = "admin" | "user" | "guest";

export interface dataHeader {
  success: boolean;
  resultCode: string | null;
  resultMessage: string | null;
}

// 공통 API 응답 타입
export interface ApiResponse<T> {
  dataHeader: dataHeader;
  dataBody: T;
}

// 에러 응답 타입
interface ApiError {
  code: number;
  message: string;
}

// 예시: 사용자 타입
interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

// 유틸리티 타입: 함수 타입
type Fn<T = void> = (...args: any[]) => T;

declare global {
  interface Window {
    Kakao?: any;
  }
}
export {};
