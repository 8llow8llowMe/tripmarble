package com.followfollowme.tripmarble.redis.exception;

import lombok.Getter;

@Getter
public class RedisInfraException extends RuntimeException {

    private final RedisErrorCode errorCode;

    public RedisInfraException(RedisErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
