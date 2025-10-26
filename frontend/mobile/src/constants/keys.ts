const STORAGE_KEY = {
  //AUTH
  ACCESS_TOKEN: 'accessToken',
  MEMBER_ID: 'memberId',
};

const QUERY_KEY = {
  //USER
  USER: {
    INFO: 'userInfo',
    ACTIVITY_INFO: 'userActivityInfo',
  },

  //TRIP
  TRIP: {
    SPOT: 'spot',
    LIST_SPOTS: 'spotsList',
    LIST_REGIONS: 'regionsList',
    LIST_SIGUNGUS_BY_REGION: 'sigungusByRegionList',
    LIST_REPRESENTATIVE_REGIONS: 'representativeRegionsList ',
    REPRESENTATIVE_REGION: 'representativeRegion',
    LIST_CONTENT_TYPES: 'contentTypesList',
  },

  GAME: {
    LIST_TRIP_THEMES: 'tripThemesList',
    LIST_DIFFICULTY: 'difficultyList',
    GET_GAME_TILES: 'getGameTiles',
    GAME_START: 'gameStart',
    GAME_LIST_INFO: 'gameList',
    GAME_DETAIL_INFO: 'gameDetail',
    GAME_DICE: 'dice',
    GAME_FORCE_END: 'forceEnd',
    MOVE_LOGS: 'moveLogs',
    MOVE_LOGS_SUCCESS: 'moveLogsSuccess',
  },

  REVIEW: {
    LIST_REVIEWS: 'reviewsList',
    DETAIL: 'reviewDetail',
    SUMMARY: 'reviewSummary',
  },
};

export { STORAGE_KEY, QUERY_KEY };
