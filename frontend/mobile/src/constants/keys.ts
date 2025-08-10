const STORAGE_KEY = {
  //AUTH
  ACCESS_TOKEN: 'accessToken',
  MEMBER_ID: 'memberId',
};

const QUERY_KEY = {
  //USER
  USER: {
    INFO: 'userInfo',
  },

  //TRIP
  TRIP: {
    SPOT: 'spot',
    LIST_SPOTS: 'spotsList',
    LIST_REGIONS: 'regionsList',
    LIST_SIGUNGUS_BY_REGION: 'sigungusByRegionList',
    LIST_REPRESENTATIVE_REGIONS: 'representativeRegionsList ',
    REPRESENTATIVE_REGION: 'representativeRegion',
  },

  GAME: {
    LIST_TRIP_THEMES: 'tripThemesList',
    LIST_DIFFICULTY: 'difficultyList',
  },
};

export { STORAGE_KEY, QUERY_KEY };
