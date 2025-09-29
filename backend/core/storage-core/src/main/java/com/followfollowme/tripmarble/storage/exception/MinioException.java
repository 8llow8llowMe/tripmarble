package com.followfollowme.tripmarble.storage.exception;

import lombok.Getter;

@Getter
public class MinioException extends RuntimeException {

    private final MinioErrorCode errorCode;

    public MinioException(MinioErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
