package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.controller;

import com.followfollowme.tripmarble.common.dto.Response;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewAndPhotosResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateRequest;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewCreateResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewDetailResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewPhotoUploadResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotReviewSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.command.TripSpotReviewCreateCommand;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripSpotReviewWebUseCase;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import com.followfollowme.tripmarble.security.common.dto.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trip-spots/{tripSpotId}/reviews")
@Tag(name = "여행지 리뷰", description = "여행지 리뷰 관련 클라이언트 전용 API 입니다.")
public class TripSpotReviewWebController {

    private final TripSpotReviewWebUseCase tripSpotReviewWebUseCase;

    @Operation(
        summary = "여행지 리뷰 등록",
        description = "특정 여행지에 대한 리뷰(별점, 내용, 사진)를 등록하는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<TripSpotReviewCreateResponse>> createGeneralReviewAndPhotos(
        @PathVariable String tripSpotId, @AuthenticationPrincipal MemberLoginActive loginActive,
        @Valid @RequestBody TripSpotReviewCreateRequest request) {
        TripSpotReviewCreateResponse response =
            tripSpotReviewWebUseCase.createGeneralReviewAndPhotos(Long.parseLong(tripSpotId), loginActive.id(),
                TripSpotReviewCreateCommand.from(request));
        return ResponseEntity.ok().body(Response.success(response));
    }

    @Operation(
        summary = "여행지 리뷰 종합 요약 조회",
        description = " 특정 여행지의 리뷰에 대한 종합 요약 정보를 조회하는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @GetMapping("/summary")
    public ResponseEntity<Response<TripSpotReviewSummaryResponse>> getTripSpotReviewSummary(
        @PathVariable String tripSpotId, @RequestParam(defaultValue = "3") int photoLimit) {
        TripSpotReviewSummaryResponse response =
            tripSpotReviewWebUseCase.getTripSpotReviewSummary(Long.parseLong(tripSpotId), photoLimit);
        return ResponseEntity.ok().body(Response.success(response));
    }

    @Operation(
        summary = "여행지 리뷰 목록 조회 (무한 스크롤)",
        description = "특정 여행지에 대한 리뷰 목록을 최신순으로 조회하는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @GetMapping
    public ResponseEntity<Response<SliceResponse<TripSpotReviewAndPhotosResponse>>> getTripSpotReviews(
        @PathVariable String tripSpotId, @RequestParam(required = false, defaultValue = "0") String lastTripSpotReviewId,
        @RequestParam(required = false, defaultValue = "10") int size) {
        SliceResponse<TripSpotReviewAndPhotosResponse> responses =
            tripSpotReviewWebUseCase.getTripSpotReviews(Long.parseLong(tripSpotId), Long.parseLong(lastTripSpotReviewId), size);
        return ResponseEntity.ok().body(Response.success(responses));
    }

    @Operation(
        summary = "여행지 리뷰 상세 조회",
        description = "특정 여행지 리뷰의 상세 정보를 조회하는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @GetMapping("/{tripSpotReviewId}")
    public ResponseEntity<Response<TripSpotReviewDetailResponse>> getTripSpotReviewDetail(
        @PathVariable String tripSpotId, @PathVariable String tripSpotReviewId) {
        TripSpotReviewDetailResponse response =
            tripSpotReviewWebUseCase.getTripSpotReviewDetail(Long.parseLong(tripSpotId), Long.parseLong(tripSpotReviewId));
        return ResponseEntity.ok().body(Response.success(response));
    }

    @Operation(
        summary = "여행지 리뷰 사진 임시 업로드",
        description = "리뷰 작성 시 업로드할 사진을 임시 저장소(Minio)에 저장하고 URL을 반환하는 기능입니다.",
        security = {@SecurityRequirement(name = "bearerAuth")}
    )
    @PostMapping("/photos/temp")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<List<TripSpotReviewPhotoUploadResponse>>> uploadTempReviewPhotos(
        @PathVariable String tripSpotId, @RequestPart List<MultipartFile> imageFiles) {
        List<TripSpotReviewPhotoUploadResponse> responses =
            tripSpotReviewWebUseCase.uploadTempReviewPhotos(Long.parseLong(tripSpotId), imageFiles);
        return ResponseEntity.ok().body(Response.success(responses));
    }
}
