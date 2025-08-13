package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.controller;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripContentTypeQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeInternalUseCase;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/v1/trip-content-types")
@Tag(name = "여행 콘텐츠 타입 (관광 타입)", description = "여행지 정보 관련 내부 서비스 통신 전용 API 입니다.")
@Hidden
public class TripContentTypeInternalController {

    private final TripContentTypeInternalUseCase tripContentTypeInternalUseCase;

    @Operation(
        summary = "여행 콘텐츠 타입 ID(인조키)를 이용한 여행 콘텐츠 목록 조회",
        description = "여행 콘텐츠 타입 ID 목록(tripContentTypeIds)을 기반으로, 여행 콘텐츠 타입 목록을 조회하는 기능입니다."
    )
    @GetMapping
    public ResponseEntity<List<TripContentTypeQueryInternalResponse>> getTripContentTypes(
        @RequestParam List<Long> tripContentTypeIds) {
        List<TripContentTypeQueryInternalResponse> contentTypeIds = tripContentTypeInternalUseCase.getTripContentTypes(
            tripContentTypeIds);
        return ResponseEntity.ok().body(contentTypeIds);
    }
}
