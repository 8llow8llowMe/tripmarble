package com.followfollowme.tripmarble.domainlayer.auth.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AuthErrorCode {

    INVALID_VERIFICATION_CODE("AUTH_001", "인증코드가 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
    NOT_FOUND_VERIFICATION_CODE("AUTH_002", "인증코드가 존재하지 않습니다. 이메일 인증코드 재요청을 클릭해주세요.", HttpStatus.NOT_FOUND),
    UNSUPPORTED_OAUTH_PROVIDER("AUTH_003", "지원하지 않는 소셜 로그인 제공자입니다. (입력값: %s)", HttpStatus.BAD_REQUEST),
    UNMATCHED_OAUTH_PROVIDER("AUTH_004", "다른 방식으로 이미 가입된 계정입니다. 기존: %s", HttpStatus.CONFLICT);

    private final String code;
    private final String errorMessage;
    private final HttpStatus httpStatus;
}
