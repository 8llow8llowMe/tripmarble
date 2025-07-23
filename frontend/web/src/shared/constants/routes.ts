// 예시

// 메인 탭 라우트
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SEARCH: "/search",
  MYPAGE: "/mypage",
  TRIP_DETAIL: (id: string) => `/trip/${id}`, // 동적 라우트
};

// API 경로 상수로도 확장 가능
export const API_ROUTES = {
  TRIPS: "/api/trips",
  USERS: "/api/users",
};

/* 
사용 예시
-----
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

<Link href={ROUTES.SEARCH}>검색하기</Link>

-----

import { ROUTES } from '@/constants/routes';
router.push(ROUTES.TRIP_DETAIL('123'));

*/
