package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RepresentativeRegionWebUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/regions/representative")
@Tag(name = "대표 여행지", description = "대표 여행지 관련 API 입니다.")
public class RepresentativeRegionWebController {

    private final RepresentativeRegionWebUseCase representativeRegionWebUseCase;

    @Operation(
        summary = "대표 여행지 전체 목록 조회",
        description = "대표 여행지 전체 목록을 조회 기능입니다."
    )
    @GetMapping
    public ResponseEntity<Response<List<RepresentativeRegionSummaryResponse>>> getAllRepresentativeRegions() {
        List<RepresentativeRegionSummaryResponse> responses = representativeRegionWebUseCase.getAllRepresentativeRegions();
        return ResponseEntity.ok().body(Response.success(responses));
    }

    @Operation(
        summary = "대표 여행지 상세 조회",
        description = "해당 대표 여행지 정보를 상세하게 조회하는 기능입니다."
    )
    @GetMapping("/{representativeRegionId}")
    public ResponseEntity<Response<RepresentativeRegionDetailResponse>> getRepresentativeRegionDetail(
        @PathVariable long representativeRegionId) {
        RepresentativeRegionDetailResponse response = representativeRegionWebUseCase.getRepresentativeRegionDetail(
            representativeRegionId);
        return ResponseEntity.ok().body(Response.success(response));
    }
}
