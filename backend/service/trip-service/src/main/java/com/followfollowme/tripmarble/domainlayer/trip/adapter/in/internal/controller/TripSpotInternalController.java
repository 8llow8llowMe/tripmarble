package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.controller;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotInternalUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/v1/trip-spots")
@Tag(name = "여행지 정보", description = "여행지 정보 관련 내부 서비스 통신 전용 API 입니다.")
public class TripSpotInternalController {

    private final TripSpotInternalUseCase tripSpotInternalUseCase;

    @Operation(
        summary = "대표 여행지에 따른 랜덤 여행지 목록 조회",
        description = "선택한 대표 여행지 ID와 콘텐츠 타입 ID 목록을 기준으로 무작위 여행지 목록을 조회하는 기능입니다."
    )
    @GetMapping("/by-representative-region/{representativeRegionId}/random")
    public ResponseEntity<List<TripSpotRandomResponse>> getRandomTripSpots(@PathVariable long representativeRegionId,
        @RequestParam List<Integer> contentTypeIds, @RequestParam(defaultValue = "10") int limit) {
        List<TripSpotRandomResponse> responses = tripSpotInternalUseCase.getRandomTripSpots(representativeRegionId,
            contentTypeIds, limit);
        return ResponseEntity.ok().body(responses);
    }
}
