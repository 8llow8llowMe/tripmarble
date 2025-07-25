package com.followfollowme.tripmarble.domainlayer.auth.application.exception;

import lombok.Getter;

@Getter
public class AuthException extends RuntimeException {

    private final AuthErrorCode errorCode;

    public AuthException(AuthErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }

    public AuthException(AuthErrorCode errorCode, Object... args) {
        super(String.format(errorCode.getErrorMessage(), args));
        this.errorCode = errorCode;
    }
}
