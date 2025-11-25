package com.followfollowme.tripmarble.domainlayer.region.application.exception;

import lombok.Getter;

@Getter
public class RegionException extends RuntimeException {

    private final RegionErrorCode errorCode;

    public RegionException(RegionErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
