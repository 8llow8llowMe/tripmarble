package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeWebUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-content-types")
@Tag(name = "여행 콘텐츠 타입 (관광 타입)", description = "여행 콘텐츠 타입 (관광 타입) 관련 클라이언트 전용 API 입니다.")
public class TripContentTypeWebController {

    private final TripContentTypeWebUseCase tripContentTypeWebUseCase;

    @Operation(
        summary = "여행 콘텐츠 타입 (관광 타입) 목록 조회",
        description = "여행 콘텐츠 타입 (관광 타입) 목록을 조회하는 기능입니다."
    )
    @GetMapping
    public ResponseEntity<Response<List<TripContentTypeResponse>>> getAllTripContentTypes() {
        List<TripContentTypeResponse> tripContentTypeResponses = tripContentTypeWebUseCase.getAllTripContentTypes();
        return ResponseEntity.ok().body(Response.success(tripContentTypeResponses));
    }
}
