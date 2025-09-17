package com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.dto.TripThemeResponse;
import com.followfollowme.tripmarble.domainlayer.theme.application.port.in.TripThemeWebUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-themes")
@Tag(name = "여행 테마", description = "여행 테마 관련 클라이언트에 제공하는 API 입니다.")
public class TripThemeWebController {

    private final TripThemeWebUseCase tripThemeWebUseCase;

    @Operation(
        summary = "여행 테마 목록 조회",
        description = "여행 테마 목록을 조회하는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<List<TripThemeResponse>>> getAllTripThemes() {
        List<TripThemeResponse> tripThemeResponses = tripThemeWebUseCase.getAllTripThemes();
        return ResponseEntity.ok().body(Response.success(tripThemeResponses));
    }
}
