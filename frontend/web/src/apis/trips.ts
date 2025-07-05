import apiClient from "./client";

// 시도 목록 조회
export const getRegions = () => apiClient.get("/regions");

// 특정 시도의 시군구 목록 조회
export const getSigungusByRegion = (regionId: string) =>
  apiClient.get(`/regions/${regionId}/sigungus`);

// 여행 콘텐츠 타입 (관광 타입) 목록 조회
export const getTripContentTypes = () => apiClient.get("/trip-content-types");

// 대표 여행지 목록 전체 조회
export const getRepresentativeRegions = () =>
  apiClient.get("/regions/representative");

// 대표 여행지에 따른 여행지 목록 조회 (무한 스크롤)
export const getTripSpotsByRepresentativeRegion = (
  representativeRegionId: string
) =>
  apiClient.get(
    `/trip-spots/by-representative-region/${representativeRegionId}`
  );

// 여행지 상세 정보 조회
export const getTripSpotById = (tripSpotId: string) =>
  apiClient.get(`/trip-spots/${tripSpotId}`);
