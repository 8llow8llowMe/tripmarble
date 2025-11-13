package com.followfollowme.tripmarble.domainlayer.trip.application.exception;

import lombok.Getter;

@Getter
public class TripException extends RuntimeException {

    private final TripErrorCode errorCode;

    public TripException(TripErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
