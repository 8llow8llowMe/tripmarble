package com.followfollowme.tripmarble.domainlayer.region.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum RegionErrorCode {

    REPRESENTATIVE_REGION_NOT_FOUND("REGION_001", "해당 대표 여행지가 존재하지 않습니다.", HttpStatus.NOT_FOUND),
    REGION_NOT_FOUND("REGION_001", "해당 지역이 존재하지 않습니다.", HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
}
