package com.followfollowme.tripmarble.domainlayer.member.application.exception;

import lombok.Getter;

@Getter
public class MemberException extends RuntimeException {

    private final MemberErrorCode errorCode;

    public MemberException(MemberErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
