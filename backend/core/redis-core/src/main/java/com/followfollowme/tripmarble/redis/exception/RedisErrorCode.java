package com.followfollowme.tripmarble.redis.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum RedisErrorCode {

    CONNECTION_FAILURE("REDIS_001", "Redis 연결에 실패했습니다.", HttpStatus.SERVICE_UNAVAILABLE);

    private final String code;
    private final String errorMessage;
    private final HttpStatus httpStatus;
}
