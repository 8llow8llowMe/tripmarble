package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RepresentativeRegionWebUseCase;
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
@RequestMapping("/api/v1/regions/representative")
@Tag(name = "대표 여행지", description = "대표 여행지 관련 API 입니다.")
public class RepresentativeRegionWebController {

    private final RepresentativeRegionWebUseCase representativeRegionWebUseCase;

    @Operation(
        summary = "대표 여행지 전체 목록 조회",
        description = "대표 여행지 전체 목록을 조회 기능입니다."
    )
    @GetMapping
    public ResponseEntity<Response<List<RepresentativeRegionResponse>>> getAllRepresentativeRegions() {
        List<RepresentativeRegionResponse> representativeRegionResponses = representativeRegionWebUseCase.getAllRepresentativeRegions();
        return ResponseEntity.ok().body(Response.success(representativeRegionResponses));
    }
}
