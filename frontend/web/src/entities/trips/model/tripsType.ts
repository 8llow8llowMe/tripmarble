// 여행 콘텐트 타입 (관광 타입) 목록 조회
export interface TripContentTypesResponse {
  contentTypeId: string;
  contentTypeName: string;
}

// 여행지 상세 정보 조회
export interface TripSpotDetailResponse {
  tripSpotId: number;
  tripSpotName: string;
  contentTypeName: string;
  description: string;
  homepageUrl: string;
  phoneNumber: string;
  address: string;
  addressDetail: string;
  longitude: number;
  latitude: number;
  imageUrl: string;
  originalImageUrl: string;
}
