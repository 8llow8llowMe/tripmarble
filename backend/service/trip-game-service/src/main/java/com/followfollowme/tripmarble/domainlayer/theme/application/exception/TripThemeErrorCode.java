package com.followfollowme.tripmarble.domainlayer.theme.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TripThemeErrorCode {

    TRIP_THEME_NOT_FOUND("TRIP_THEME_001", "존재하지 않는 여행 테마 입니다.", HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
}
