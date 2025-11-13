package com.followfollowme.tripmarble.domainlayer.review.application.exception;

import lombok.Getter;

@Getter
public class ReviewException extends RuntimeException {

    private final ReviewErrorCode errorCode;

    public ReviewException(ReviewErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
