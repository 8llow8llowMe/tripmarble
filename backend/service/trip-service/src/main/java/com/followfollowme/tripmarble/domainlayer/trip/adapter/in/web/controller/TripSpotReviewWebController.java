package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateRequest;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.command.TripSpotReviewCreateCommand;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotReviewWebUseCase;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-spots/{tripSpotId}/reviews")
@Tag(name = "여행지 리뷰", description = "여행지 리뷰 관련 클라이언트 전용 API 입니다.")
public class TripSpotReviewWebController {

    private final TripSpotReviewWebUseCase tripSpotReviewWebUseCase;

    @Operation(
        summary = "여행지 리뷰 등록",
        description = "특정 여행지에 대한 리뷰(별점, 내용, 사진)를 등록하는 기능입니다."
    )
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<TripSpotReviewCreateResponse>> createGeneralReviewAndPhotos(
        @PathVariable String tripSpotId, @AuthenticationPrincipal MemberLoginActive loginActive,
        @Valid @RequestBody TripSpotReviewCreateRequest request) {
        TripSpotReviewCreateResponse response =
            tripSpotReviewWebUseCase.createGeneralReviewAndPhotos(Long.parseLong(tripSpotId), loginActive.id(), TripSpotReviewCreateCommand.from(request));
        return ResponseEntity.ok().body(Response.success(response));
    }
}
