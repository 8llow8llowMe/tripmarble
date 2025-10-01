package com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewAndPhotosResponse;
import com.followfollowme.tripmarble.domainlayer.review.application.port.in.MyReviewWebUseCase;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import com.followfollowme.tripmarble.persistence.enums.OrderType;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reviews")
@Tag(name = "나의 리뷰", description = "사용자가 작성한 리뷰 관련 클라이언트 전용 API 입니다.")
public class MyReviewWebController {

    private final MyReviewWebUseCase myReviewWebUseCase;

    @Operation(
        summary = "나의 리뷰 목록 조회 (무한 스크롤)",
        description = "로그인 사용자가 작성한 여행지 리뷰 목록을 무한 스크롤 방식으로 조회합니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @ApiResponse(responseCode = "200", description = "나의 리뷰 목록 조회 성공")
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<SliceResponse<TripSpotReviewAndPhotosResponse>>> getMyTripSpotReviews(
        @AuthenticationPrincipal MemberLoginActive loginActive,
        @RequestParam(required = false, defaultValue = "0") String lastTripSpotReviewId,
        @RequestParam(required = false, defaultValue = "10") int size,
        @RequestParam(required = false, defaultValue = "DESC") OrderType orderType
    ) {
        SliceResponse<TripSpotReviewAndPhotosResponse> responses =
            myReviewWebUseCase.getMyTripSpotReviews(loginActive.id(), Long.parseLong(lastTripSpotReviewId), size, orderType);
        return ResponseEntity.ok().body(Response.success(responses));
    }

    @Operation(
        summary = "나의 리뷰 삭제",
        description = "로그인 사용자가 본인이 작성한 특정 리뷰를 삭제합니다. (사진 포함 물리 삭제)",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @ApiResponse(responseCode = "204", description = "리뷰 삭제 성공 (응답 본문 없음)")
    @ApiResponse(responseCode = "403", description = "본인 리뷰가 아님 (REVIEW_003)")
    @ApiResponse(responseCode = "404", description = "리뷰 미존재 (REVIEW_001)")
    @DeleteMapping("/{tripSpotReviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteMyTripSpotReview(
        @AuthenticationPrincipal MemberLoginActive loginActive,
        @PathVariable String tripSpotReviewId
    ) {
        myReviewWebUseCase.deleteMyTripSpotReview(loginActive.id(), Long.parseLong(tripSpotReviewId));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

