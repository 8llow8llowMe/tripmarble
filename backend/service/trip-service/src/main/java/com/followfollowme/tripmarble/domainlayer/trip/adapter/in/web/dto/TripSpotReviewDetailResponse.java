package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(description = "여행지 리뷰 상세 조회 응답 DTO")
public record TripSpotReviewDetailResponse(

    @Schema(description = "리뷰 ID", example = "1001")
    String tripSpotReviewId,

    @Schema(description = "여행지 이름", example = "경복궁")
    String tripSpotName,

    @Schema(description = "작성자 닉네임", example = "여행왕동근")
    String reviewerNickname,

    @Schema(description = "작성자 프로필 이미지 URL", example = "https://cdn.tripmarble.com/profile.jpg")
    String reviewerProfileImageUrl,

    @Schema(description = "리뷰 내용", example = "정말 멋진 장소였어요!")
    String content,

    @Schema(description = "별점 (1~5, 0.5 단위)", example = "4.5")
    double rating,

    @Schema(description = "리뷰 출처 타입 코드 (GENERAL / GAME_MISSION)", example = "GENERAL")
    String reviewSourceTypeCode,

    @Schema(description = "리뷰 출처 타입 설명", example = "일반 리뷰")
    String reviewSourceTypeDescription,

    @Schema(description = "작성 날짜 (생성일시)", example = "2025-09-10 14:23:45")
    LocalDateTime createdAt,

    @Schema(description = "수정 날짜 (최종수정일시)", example = "2025-09-12 09:15:20")
    LocalDateTime updatedAt,

    @Schema(description = "리뷰 사진 목록")
    List<PhotoDetailResponse> photos
) {

    @Builder
    @Schema(description = "리뷰 사진 조회 응답 DTO")
    public record PhotoDetailResponse(

        @Schema(description = "리뷰 사진 ID", example = "3001")
        String tripSpotReviewPhotoId,

        @Schema(description = "사진 URL", example = "https://cdn.../review1.jpg")
        String photoUrl,

        @Schema(description = "사진 순서 (1~5)", example = "1")
        int orderNo
    ) {

    }
}
