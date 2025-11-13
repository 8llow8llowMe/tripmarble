package com.followfollowme.tripmarble.domainlayer.review.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ReviewErrorCode {

    TRIP_SPOT_REVIEW_NOT_FOUND("REVIEW_001", "해당 여행지 리뷰를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    UPLOAD_REVIEW_PHOTO_FAILED("REVIEW_002", "여행지 리뷰 사진 업로드에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    REVIEW_FORBIDDEN("REVIEW_003", "본인 리뷰가 아니므로 삭제할 수 없습니다.", HttpStatus.FORBIDDEN);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
}
