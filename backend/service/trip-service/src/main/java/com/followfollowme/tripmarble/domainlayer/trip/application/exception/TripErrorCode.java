package com.followfollowme.tripmarble.domainlayer.trip.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TripErrorCode {

    TRIP_SPOT_NOT_FOUND("TRIP_001", "해당 여행지 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    TRIP_CONTENT_TYPE_NOT_FOUND("TRIP_002", "해당 여행지 콘텐츠 타입을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    TRIP_SPOT_DETAIL_NOT_FOUND("TRIP_003", "해당 여행지 상세 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
}
