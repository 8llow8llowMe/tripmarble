package com.followfollowme.tripmarble.common.dto;

import org.springframework.http.HttpStatus;

public record ErrorCodeInfo(
    String serviceName,
    String code,
    String message,
    int httpStatusCode,
    String httpStatusName
) {

    public static ErrorCodeInfo from(String serviceName, String code, String message, HttpStatus httpStatus) {
        return new ErrorCodeInfo(serviceName, code, message, httpStatus.value(), httpStatus.name());
    }
}
