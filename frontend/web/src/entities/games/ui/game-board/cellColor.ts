// 지원 키
// 1) 보드 타일 타입: 'start' | 'end' | 'mission' | 'normal'
// 2) 카테고리 타입:  '음식점' | '카페' | '관광지' | '공원' | '기타'

// 타일 타입 색상(상단, 하단)
const TILE_TYPE_COLORS: Record<string, [string, string]> = {
  PHOTO: ["#FCB6CB", "#C790A5"],
  REVIEW: ["#01C5D9", "#0296A4"],
  CHECKIN_GPS: ["#40C896", "#2E936F"],
  normal: ["#F7F7F8", "#BBBBBB"],
};

// 카테고리 색상(상단, 하단)
const CATEGORY_COLORS: Record<string, [string, string]> = {
  음식점: ["#ffc7c7", "#C790A5"],
  카페: ["#40C896", "#2E936F"],
  관광지: ["#FCB6CB", "#6bb9f3"],
  공원: ["#01C5D9", "#0296A4"],
  기타: ["#F7F7F8", "#BBBBBB"],
};

/**
 * 주어진 type에 맞는 [상단색, 하단색]을 반환
 * - 우선순위: 타일 타입(start/end/mission/normal) → 카테고리(음식점 등) → 기본
 */
export function getCell3DColors(type: string): [string, string] {
  if (!type) return ["#eee", "#bbb"];

  const key = String(type).toLowerCase();
  if (TILE_TYPE_COLORS[key]) return TILE_TYPE_COLORS[key];

  if (CATEGORY_COLORS[type]) return CATEGORY_COLORS[type];

  return ["#eee", "#bbb"];
}

// (선택) 외부에서 카테고리 팔레트를 한눈에 쓰고 싶을 때
export { CATEGORY_COLORS as TYPE_COLORS };
