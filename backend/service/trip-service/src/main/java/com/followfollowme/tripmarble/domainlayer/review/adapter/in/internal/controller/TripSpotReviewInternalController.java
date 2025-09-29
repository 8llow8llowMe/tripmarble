package com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.controller;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto.TripSpotReviewCreateInternalRequest;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto.TripSpotReviewCreateInternalResponse;
import com.followfollowme.tripmarble.domainlayer.review.application.command.TripSpotReviewCreateInternalCommand;
import com.followfollowme.tripmarble.domainlayer.review.application.port.in.TripSpotReviewInternalUseCase;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/v1/trip-spots/{tripSpotId}/reviews")
@Tag(name = "여행지 리뷰", description = "여행지 리뷰 관련 내부 서비스 통신 전용 API 입니다.")
@Hidden
public class TripSpotReviewInternalController {

    private final TripSpotReviewInternalUseCase tripSpotReviewInternalUseCase;

    @Operation(
        summary = "게임 미션 리뷰 생성",
        description = "게임 서비스에서 호출하는 전용 API로, 여행지 리뷰를 생성합니다."
    )
    @PostMapping
    public ResponseEntity<TripSpotReviewCreateInternalResponse> createMissionReview(
        @PathVariable long tripSpotId, @RequestBody TripSpotReviewCreateInternalRequest request) {
        TripSpotReviewCreateInternalResponse response = tripSpotReviewInternalUseCase.createMissionReview(
            tripSpotId, request.memberId(), TripSpotReviewCreateInternalCommand.from(request));
        return ResponseEntity.ok().body(response);
    }
}
