// 지원 키
// 1) 보드 타일 타입: 'start' | 'end' | 'mission' | 'normal'
// 2) 카테고리 타입:  '음식점' | '카페' | '관광지' | '공원' | '기타'

// 타일 타입 색상(상단, 하단)
const TILE_TYPE_COLORS: Record<string, [string, string]> = {
  start: ["#d4f6da", "#7edb8a"], // 연한 초록 / 진한 초록
  end: ["#ffd6d6", "#ff7b7b"], // 연한 빨강 / 진한 빨강
  mission: ["#ffe0f0", "#ff9ec5"], // 연한 핑크 / 진한 핑크
  normal: ["#eaf0f8", "#b6c5da"], // 연한 블루그레이 / 진한 블루그레이
};

// 카테고리 색상(상단, 하단)
const CATEGORY_COLORS: Record<string, [string, string]> = {
  음식점: ["#ffc7c7", "#fa7676"],
  카페: ["#cdfcd7", "#5ed17d"],
  관광지: ["#c9e7ff", "#6bb9f3"],
  공원: ["#e2d4fd", "#a694e8"],
  기타: ["#f1f1f1", "#bdbdbd"],
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

  return ["#eee", "#bbb"]; // fallback
}

// (선택) 외부에서 카테고리 팔레트를 한눈에 쓰고 싶을 때
export { CATEGORY_COLORS as TYPE_COLORS };
