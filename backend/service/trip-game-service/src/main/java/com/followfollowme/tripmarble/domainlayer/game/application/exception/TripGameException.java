package com.followfollowme.tripmarble.domainlayer.game.application.exception;

import lombok.Getter;

@Getter
public class TripGameException extends RuntimeException {

    private final TripGameErrorCode errorCode;

    public TripGameException(TripGameErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
