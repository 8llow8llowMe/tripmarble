const REGISTER_FORM = {
  EMAIL: {
    LABEL: '이메일',
    REQUIRED: '이메일을 입력해 주세요.',
    PLACEHOLDER: '이메일을 입력하세요.',
    PATTERN: '입력하신 이메일이 형식에 맞지 않습니다.',
  },
  ID: {
    LABEL: '아이디',
    REQUIRED: '아이디를 입력해 주세요.',
    PLACEHOLDER: '영문/숫자 포함 5~20자',
    PATTERN: '입력하신 아이디가 형식에 맞지 않습니다.',
  },
  NAME: {
    LABEL: '이름',
    REQUIRED: '이름을 입력해 주세요.',
    PLACEHOLDER: '이름을 입력해 주세요.',
    PATTERN: '입력하신 이름이 올바르지 않습니다.',
  },
  PASSWORD: {
    LABEL: '비밀번호',
    REQUIRED: '비밀번호를 입력해 주세요.',
    PLACEHOLDER: '영문/숫자/특수문자 포함 8~16자',
    PATTERN: '비밀번호는 영문/숫자/특수문자 포함 8~16자로 입력해야 합니다.',
  },
  CONFIRM_PASSWORD: {
    LABEL: '비밀번호 확인',
    REQUIRED: '비밀번호를 확인해 주세요.',
    VALIDATE: '입력한 비밀번호와 일치하지 않습니다.',
    PLACEHOLDER: '비밀번호를 한 번 더 입력하세요.',
  },
  ALERT: {
    EXISTING_ACCOUNT: '이미 가입된 계정입니다.',
    DONE: '회원가입이 완료되었습니다. ',
  },
  CONSENT: {
    TERMS: {
      TEXT: '[필수] 이용약관 동의',
      REQUIRED: '이용약관에 동의해 주세요.',
    },
    PRIVACY_POLICY: {
      TEXT: '[필수] 개인정보 수집 및 이용 동의',
      REQUIRED: '개인정보 수집 및 이용에 동의해 주세요.',
    },
    ALL_ACCEPT: '전체 동의',
    FULL_TEXT: '전문보기',
  },
};

const SIGNUP_FORM = {
  ID: {
    LABEL: '아이디',
    REQUIRED: '아이디를 입력해 주세요.',
    PLACEHOLDER: '영문 또는 숫자 5~20자 입력',
    PATTERN: '입력하신 아이디가 형식에 맞지 않습니다.',
  },
  NAME: {
    LABEL: '이름',
    REQUIRED: '이름을 입력해 주세요.',
    PLACEHOLDER: '이름을 입력해 주세요.',
    PATTERN: '입력하신 이름이 올바르지 않습니다.',
  },
  PHONE: {
    LABEL: '휴대폰 번호',
    REQUIRED: '휴대폰 번호를 입력해 주세요.',
    PLACEHOLDER: '휴대폰 번호를 - 없이 입력하세요.',
    PATTERN: '입력하신 정보가 올바르지 않습니다.',
  },
  VERIFY_NUMBER: {
    LABEL: '인증번호',
    PLACEHOLDER: '인증번호를 입력하세요.',
    REQUIRED: '인증번호를 입력해 주세요.',
    PATTERN: '입력하신 정보가 올바르지 않습니다.',
  },
  PASSWORD: {
    LABEL: '비밀번호',
    REQUIRED: '비밀번호를 입력해 주세요.',
    PLACEHOLDER: '영문/숫자/특수문자 포함 8~16자',
    PATTERN: '비밀번호는 영문/숫자/특수문자 포함 8~16자로 입력해야 합니다.',
  },
  CONFIRM_PASSWORD: {
    LABEL: '비밀번호 확인',
    REQUIRED: '비밀번호를 확인해 주세요.',
    VALIDATE: '입력한 비밀번호와 일치하지 않습니다.',
    PLACEHOLDER: '비밀번호를 한 번 더 입력하세요.',
  },
  CONSENT: {
    TERMS: {
      TEXT: '[필수] 이용약관 동의',
      REQUIRED: '이용약관에 동의해 주세요.',
    },
    PRIVACY_POLICY: {
      TEXT: '[필수] 개인정보 수집 및 이용 동의',
      REQUIRED: '개인정보 수집 및 이용에 동의해 주세요.',
    },
    ALL_ACCEPT: '전체 동의',
    FULL_TEXT: '전문보기',
  },
};

const LOGIN_FORM = {
  ID: {
    LABEL: '아이디',
    REQUIRED: '아이디를 입력해주세요.',
    PLACEHOLDER: '아이디를 입력하세요.',
    PATTERN: '아이디가 올바르지 않습니다.',
  },
  PASSWORD: {
    LABEL: '비밀번호',
    REQUIRED: '비밀번호를 입력해 주세요.',
    PLACEHOLDER: '비밀번호를 입력해 주세요.',
    PATTERN: '비밀번호가 올바르지 않습니다.',
  },
};

const PHONE_FORM = {
  NAME: {
    LABEL: '이름',
    PLACEHOLDER: '이름을 입력해 주세요.',
    REQUIRED: '이름을 입력해 주세요.',
    PATTERN: '입력하신 정보가 올바르지 않습니다.',
  },
  PHONE: {
    LABEL: '휴대폰 번호',
    PLACEHOLDER: '휴대폰 번호를 - 없이 입력하세요.',
    REQUIRED: '휴대폰 번호를 입력해 주세요.',
    PATTERN: '입력하신 정보가 올바르지 않습니다.',
  },
  VERIFY_NUMBER: {
    LABEL: '인증번호',
    PLACEHOLDER: '인증번호를 입력하세요.',
    REQUIRED: '인증번호를 입력해 주세요.',
    PATTERN: '입력하신 정보가 올바르지 않습니다.',
  },
};

const EMAIL_FORM = {
  NAME: {
    LABEL: '이름',
    PLACEHOLDER: '이름을 입력해 주세요.',
    REQUIRED: '이름을 입력해 주세요.',
    PATTERN: '입력하신 정보가 올바르지 않습니다.',
  },
  EMAIL: {
    LABEL: '이메일',
    PLACEHOLDER: '이메일을 입력해 주세요',
    REQUIRED: '이메일을 입력해 주세요.',
    PATTERN: '입력하신 정보가 올바르지 않습니다.',
  },
  VERIFY_NUMBER: {
    LABEL: '인증번호',
    PLACEHOLDER: '인증번호를 입력하세요.',
    REQUIRED: '인증번호를 입력해 주세요.',
    PATTERN: '입력하신 정보가 올바르지 않습니다.',
  },
};

const CHANGE_PHONE_FORM = {
  PASSWORD: {
    LABEL: '현재 비밀번호',
    PLACEHOLDER: '현재 비밀번호 입력',
    REQUIRED: '비밀번호를 입력해 주세요.',
    PATTERN: '비밀번호가 올바르지 않습니다.',
  },
  PHONE: {
    LABEL: '변경할 휴대폰 번호',
    PLACEHOLDER: '휴대폰 번호 입력',
    REQUIRED: '휴대폰 번호를 입력해 주세요.',
    PATTERN: '입력하신 정보가 올바르지 않습니다.',
  },
  VERIFY_NUMBER: {
    LABEL: '인증번호',
    PLACEHOLDER: '인증번호 입력',
    REQUIRED: '인증번호를 입력해 주세요.',
    PATTERN: '입력하신 인증번호가 올바르지 않습니다.',
  },
};

export { REGISTER_FORM, SIGNUP_FORM, LOGIN_FORM, PHONE_FORM, EMAIL_FORM, CHANGE_PHONE_FORM };
