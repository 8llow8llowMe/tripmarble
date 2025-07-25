package com.followfollowme.tripmarble.domainlayer.auth.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AuthErrorCode {

    INVALID_VERIFICATION_CODE("AUTH_001", "인증코드가 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
    NOT_FOUND_VERIFICATION_CODE("AUTH_002", "인증코드가 존재하지 않습니다. 이메일 인증코드 재요청을 클릭해주세요.", HttpStatus.NOT_FOUND);

    private final String code;
    private final String errorMessage;
    private final HttpStatus httpStatus;
}
