package com.followfollowme.tripmarble.domainlayer.theme.application.exception;

import lombok.Getter;

@Getter
public class TripThemeException extends RuntimeException {

    private final TripThemeErrorCode errorCode;

    public TripThemeException(TripThemeErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
