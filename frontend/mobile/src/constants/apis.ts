const END_POINTS = {
  //AUTH
  SIGN_UP: `/members/signup`,
  LOGIN: `/auth/login`,
  LOGOUT: `/auth/logout`,
  SEND_CODE: `/auth/mail/send-code`,
  VERIFY_CODE: `/auth/mail/verfiy-code`,

  //USER
  USER: {
    INFO: `/members/me`,
  },

  //TRIP
  TRIP: {
    // 여행지 정보
    SPOT: (tripSpotId: number) => `/trip-spots/${tripSpotId}`,
    LIST_SPOTS: (representativeRegionId: number) =>
      `/trip-spots/by-representative-region/${representativeRegionId}`,

    // 지역
    LIST_REGIONS: '/regions',
    LIST_SIGUNGUS_BY_REGION: (regionId: number) => `/regions/${regionId}/sigungus`,

    // 대표 여행지
    LIST_REPRESENTATIVE_REGIONS: '/regions/representative',
    REPRESENTATIVE_REGION: (representativeRegionId: number) =>
      `/regions/representative/${representativeRegionId}`,

    // 여행 콘텐츠 타입
    LIST_CONTENT_TYPES: '/trip-content-types',
  },
};

export { END_POINTS };
