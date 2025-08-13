package com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.controller;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto.RepresentativeRegionInfoInternalResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RepresentativeRegionInternalUseCase;
import io.swagger.v3.oas.annotations.Hidden;
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
@RequestMapping("/internal/v1/regions/representative")
@Tag(name = "대표 여행지", description = "대표 여행지 관련 내부 서비스 통신 전용 API 입니다.")
@Hidden
public class RepresentativeRegionInternalController {

    private final RepresentativeRegionInternalUseCase representativeRegionInternalUseCase;

    @Operation(
        summary = "해당 대표 여행지 정보 조회",
        description = "대표 여행지 정보를 조회합니다."
    )
    @GetMapping("/{representativeRegionId}")
    public ResponseEntity<RepresentativeRegionInfoInternalResponse> getRepresentativeRegionInfo(@PathVariable long representativeRegionId) {
        RepresentativeRegionInfoInternalResponse response = representativeRegionInternalUseCase.getRepresentativeRegionInfo(
            representativeRegionId);
        return ResponseEntity.ok().body(response);
    }

    @Operation(
        summary = "여러 대표 여행지 정보 조회",
        description = "대표 여행지 ID 리스트를 기반으로 여러 정보를 조회합니다."
    )
    @GetMapping
    public ResponseEntity<List<RepresentativeRegionInfoInternalResponse>> getRepresentativeRegionsByIds(
        @RequestParam List<Long> representativeRegionIds) {
        List<RepresentativeRegionInfoInternalResponse> responses = representativeRegionInternalUseCase.getRepresentativeRegionsByIds(
            representativeRegionIds);
        return ResponseEntity.ok().body(responses);
    }
}
