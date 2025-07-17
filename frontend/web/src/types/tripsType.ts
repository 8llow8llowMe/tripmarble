export interface TripSpot {
  tripSpotId: number;
  contentId: number;
  tripSpotName: string;
  thumbnailImageUrl: string;
}

export interface dataHeader {
  success: boolean;
  resultCode: string | null;
  resultMessage: string | null;
}

export interface ApiResponse<T> {
  dataHeader: dataHeader;
  dataBody: T;
}

// 여행 콘텐트 타입 (관광 타입) 목록 조회
export interface TripContentTypesResponse {
  contentTypeId: string;
  contentTypeName: string;
}

// 대표 여행지 목록 전체 조회
export interface RegionsRepresentativeResponse {
  representativeRegionId: number;
  representativeRegionName: string;
  imageUrl: string | null;
  regionId: number | null;
  sigunguId: number | null;
}

// 대표 여행지에 따른 여행지 목록 조회 (무한 스크롤 방식)
export interface TripSpotsResponse {
  dataHeader: dataHeader;
  dataBody: {
    contents: TripSpot[];
    hasNext: boolean;
  };
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
  thumbnailImageUrl: string;
}
