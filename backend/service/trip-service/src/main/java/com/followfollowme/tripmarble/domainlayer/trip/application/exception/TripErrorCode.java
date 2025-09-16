package com.followfollowme.tripmarble.domainlayer.trip.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TripErrorCode {

    TRIP_SPOT_NOT_FOUND("TRIP_001", "해당 여행지 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    TRIP_CONTENT_TYPE_NOT_FOUND("TRIP_002", "해당 여행지 콘텐츠 타입을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    TRIP_SPOT_DETAIL_NOT_FOUND("TRIP_003", "해당 여행지 상세 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    TRIP_SPOT_REVIEW_NOT_FOUND("TRIP_004", "해당 여행지 리뷰를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    UPLOAD_REVIEW_PHOTO_FAILED("TRIP_005", "여행지 리뷰 사진 업로드에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String errorMessage;
    private final HttpStatus httpStatus;
}
