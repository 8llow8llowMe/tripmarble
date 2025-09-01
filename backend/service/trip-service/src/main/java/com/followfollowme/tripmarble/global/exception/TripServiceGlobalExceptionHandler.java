package com.followfollowme.tripmarble.global.exception;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionException;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class TripServiceGlobalExceptionHandler {

    @ExceptionHandler(TripException.class)
    public ResponseEntity<Response<Void>> tripException(TripException e) {
        log.error("여행 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(Response.fail(e.getErrorCode().getCode(), e.getMessage()));
    }

    @ExceptionHandler(RegionException.class)
    public ResponseEntity<Response<Void>> regionException(RegionException e) {
        log.error("지역 및 대표 여행지 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(Response.fail(e.getErrorCode().getCode(), e.getMessage()));
    }
}
