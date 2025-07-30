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
};

export { END_POINTS };
