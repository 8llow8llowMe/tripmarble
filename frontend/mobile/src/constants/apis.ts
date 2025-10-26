const END_POINTS = {
  //AUTH
  SIGN_UP: `/members/signup`,
  LOGIN: `/auth/login`,
  LOGOUT: `/auth/logout`,
  SEND_CODE: `/auth/mail/send-code`,
  VERIFY_CODE: `/auth/mail/verify-code`,
  SOCIAL_LOGIN: (provider: string) => `/auth/${provider}/login`,
  SOCIAL_AUTHORIZE: (provider: string) => `/auth/${provider}/authorize`,

  //USER
  USER: {
    INFO: `/members/me`,
    WITHDRAW: `/members/me/withdraw`,
    ACTIVITY_INFO: `/members/me/activity-summary`,
  },

  //TRIP
  TRIP: {
    // 여행지 정보
    SPOT: (tripSpotId: string) => `/trip-spots/${tripSpotId}`,
    LIST_SPOTS: (representativeRegionId: string) =>
      `/trip-spots/by-representative-region/${representativeRegionId}`,

    // 지역
    LIST_REGIONS: '/regions',
    LIST_SIGUNGUS_BY_REGION: (regionId: string) => `/regions/${regionId}/sigungus`,

    // 대표 여행지
    LIST_REPRESENTATIVE_REGIONS: '/regions/representative',
    REPRESENTATIVE_REGION: (representativeRegionId: string) =>
      `/regions/representative/${representativeRegionId}`,
    SEARCH_REPRESENTATIVE_REGION: `/regions/representative/search`,

    // 여행 콘텐츠 타입
    LIST_CONTENT_TYPES: '/trip-content-types',
  },

  //GAME
  GAME: {
    LIST_TRIP_THEMES: '/trip-themes',
    LIST_DIFFICULTY: '/trip-games/difficulties',
    LIST_GAMES_INFO: '/trip-games',

    CREATE: '/trip-games',
    DETAIL: (tripGameId: string) => `/trip-games/${tripGameId}`,
    START: (tripGameId: string) => `/trip-games/${tripGameId}/start`,
    TILES: (tripGameId: string) => `/trip-games/${tripGameId}/tiles`,
    DICE: (tripGameId: string) => `/trip-games/${tripGameId}/dice`,
    FORCE_END: (tripGameId: string) => `/trip-games/${tripGameId}/force-end`,
    MOVE_LOGS: (tripGameId: string) => `/trip-games/${tripGameId}/move-logs`,
    MOVE_LOGS_SUCCESS: (tripGameId: string, tripGameMoveLogId: string) =>
      `/trip-games/${tripGameId}/move-logs/${tripGameMoveLogId}/success`,
    MOVE_LOGS_FAIL: (tripGameId: string, tripGameMoveLogId: string) =>
      `/trip-games/${tripGameId}/move-logs/${tripGameMoveLogId}/fail`,
    MOVE_LOGS_SKIP: (tripGameId: string, tripGameMoveLogId: string) =>
      `/trip-games/${tripGameId}/move-logs/${tripGameMoveLogId}/skip`,

    MISSON_REVIEW: (tripGameId: string, tripGameMoveLogId: string) =>
      `/trip-games/${tripGameId}/move-logs/${tripGameMoveLogId}/review`,
  },

  //REVIEW
  REVIEW: {
    LIST_REVIEWS: (tripSpotId: string) => `/trip-spots/${tripSpotId}/reviews`,
    WRITE: (tripSpotId: string) => `/trip-spots/${tripSpotId}/reviews`,
    UPLOAD_PHOTO: (tripSpotId: string) => `/trip-spots/${tripSpotId}/reviews/photos/temp`,
    DETAIL: (tripSpotId: string, tripSpotReviewId: string) =>
      `/trip-spots/${tripSpotId}/reviews/${tripSpotReviewId}`,
    SUMMARY: (tripSpotId: string) => `/trip-spots/${tripSpotId}/reviews/summary`,
  },
};

export { END_POINTS };
