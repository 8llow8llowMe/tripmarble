package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.SigunguResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RegionWebUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/regions")
@Tag(name = "지역", description = "지역 관련 API 입니다.")
public class RegionWebController {

    private final RegionWebUseCase regionWebUseCase;

    @Operation(
        summary = "시도 전체 목록 조회",
        description = "시도 전체 목록을 조회하는 기능입니다."
    )
    @GetMapping
    public ResponseEntity<Response<List<RegionResponse>>> getAllRegions() {
        List<RegionResponse> regionResponses = regionWebUseCase.getAllRegions();
        return ResponseEntity.ok().body(Response.success(regionResponses));
    }

    @Operation(
        summary = "해당 시도에 따른 시군구 목록 조회",
        description = "해당 시도(regionId)에 속한 시군구 목록을 조회하는 기능입니다."
    )
    @GetMapping("/{regionId}/sigungus")
    public ResponseEntity<Response<List<SigunguResponse>>> getSigungusByRegionId(@PathVariable long regionId) {
        List<SigunguResponse> sigunguResponses = regionWebUseCase.getSigungusByRegionId(regionId);
        return ResponseEntity.ok().body(Response.success(sigunguResponses));
    }
}
