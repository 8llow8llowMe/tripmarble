package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RepresentativeRegionWebUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/regions/representative")
public class RepresentativeRegionWebController {

    private final RepresentativeRegionWebUseCase representativeRegionWebUseCase;

    @GetMapping
    public ResponseEntity<Response<List<RepresentativeRegionResponse>>> getAllRepresentativeRegions() {
        List<RepresentativeRegionResponse> representativeRegionResponses = representativeRegionWebUseCase.getAllRepresentativeRegions();
        return ResponseEntity.ok().body(Response.success(representativeRegionResponses));
    }
}
