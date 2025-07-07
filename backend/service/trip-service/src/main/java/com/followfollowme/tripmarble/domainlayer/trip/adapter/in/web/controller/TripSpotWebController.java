package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotWebUseCase;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-spots")
@Tag(name = "여행지 정보", description = "여행지 정보 관련 API 입니다.")
public class TripSpotWebController {

    private final TripSpotWebUseCase tripSpotWebUseCase;

    @Operation(
        summary = "대표 여행지에 따른 여행지 목록 조회 (무한 스크롤 방식)",
        description = "선택한 대표 지역에 속한 여행지 목록을 No-Offset 방식으로 조회합니다."
            + " 해당 콘텐츠 타입(예: 관광지, 문화시설, 숙박 등)이 선택되면 해당하는 여행지만 필터링하여 조회합니다."
    )
    @GetMapping("/by-representative-region/{representativeRegionId}")
    public ResponseEntity<Response<SliceResponse<TripSpotSimpleResponse>>> getTripSpotsByRepresentativeRegionId(
        @PathVariable long representativeRegionId, @RequestParam(defaultValue = "0") long lastTripSpotId,
        @RequestParam(defaultValue = "10") int size, @RequestParam(required = false) Integer contentTypeId) {

        SliceResponse<TripSpotSimpleResponse> result = tripSpotWebUseCase.getTripSpotsByRepresentativeRegionId(
            representativeRegionId, lastTripSpotId, size, contentTypeId);
        return ResponseEntity.ok(Response.success(result));
    }

    @Operation(
        summary = "여행지 상세 정보 조회",
        description = "해당 여행지의 정보 및 상세 정보를 조회하는 기능입니다."
    )
    @GetMapping("/{tripSpotId}")
    public ResponseEntity<Response<TripSpotWithDetailViewResponse>> getTripSpotWithDetail(
        @PathVariable long tripSpotId) {

        TripSpotWithDetailViewResponse response = tripSpotWebUseCase.getTripSpotWithDetail(tripSpotId);
        return ResponseEntity.ok().body(Response.success(response));
    }
}