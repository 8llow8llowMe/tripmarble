package com.followfollowme.tripmarble.domainlayer.auth.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AuthErrorCode {

    INVALID_VERIFICATION_CODE("AUTH_001", "인증코드가 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
    NOT_FOUND_VERIFICATION_CODE("AUTH_002", "해당 이메일에 대한 인증코드가 존재하지 않습니다. 이메일 인증코드 재요청을 클릭해주세요.", HttpStatus.NOT_FOUND),
    UNSUPPORTED_OAUTH_PROVIDER("AUTH_003", "지원하지 않는 소셜 로그인 제공자입니다. (입력값: %s)", HttpStatus.BAD_REQUEST),
    UNMATCHED_OAUTH_PROVIDER("AUTH_004", "다른 방식으로 이미 가입된 계정입니다. (기존: %s)", HttpStatus.CONFLICT),
    EXPIRED_REFRESH_TOKEN("AUTH_005", "로그인 정보가 만료되었습니다. 다시 로그인해주세요.", HttpStatus.UNAUTHORIZED),
    EMAIL_VERIFICATION_STORE_FAILURE("AUTH_006", "이메일 인증 서비스를 사용할 수 없습니다. 잠시 후 다시 시도해 주세요", HttpStatus.SERVICE_UNAVAILABLE),
    UNSUPPORTED_LOGIN_METHOD("AUTH_007", "해당 계정은 %s 로그인 전용 계정입니다. 소셜 로그인을 이용해주세요.", HttpStatus.FORBIDDEN);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
}
