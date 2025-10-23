package com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.controller;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto.TripSpotReviewCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.review.application.port.in.TripSpotReviewInternalUseCase;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/v1/trip-spot-reviews")
@Tag(name = "여행지 리뷰", description = "여행지 리뷰 관련 내부 서비스 통신 전용 API 입니다.")
@Hidden
public class TripSpotReviewCountInternalController {

    private final TripSpotReviewInternalUseCase tripSpotReviewInternalUseCase;

    @Operation(
        summary = "회원별 여행지 리뷰 및 리뷰 사진 개수 조회 (Internal)",
        description = """
                특정 회원이 작성한 여행지 리뷰 수 및 리뷰에 첨부된 사진 개수를 조회합니다.
                - auth-service 등에서 회원 활동 통계(리뷰/사진 수) 조회 시 사용됩니다.
            """
    )
    @GetMapping("/members/{memberId}/count")
    public ResponseEntity<TripSpotReviewCountInternalResponse> getMyTripSpotReviewAndPhotoCount(@PathVariable long memberId) {
        TripSpotReviewCountInternalResponse response = tripSpotReviewInternalUseCase.getMyTripSpotReviewAndPhotoCount(memberId);
        return ResponseEntity.ok().body(response);
    }
}
