package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(description = "여행지 리뷰 + 사진 조회 응답 DTO")
public record TripSpotReviewAndPhotosResponse(

    @Schema(description = "리뷰 ID", example = "1001")
    String tripSpotReviewId,

    @Schema(description = "여행지 ID", example = "501")
    String tripSpotId,

    @Schema(description = "작성자 회원 ID", example = "2001")
    String memberId,

    @Schema(description = "리뷰 내용", example = "정말 멋진 장소였어요!")
    String content,

    @Schema(description = "별점 (1~5)", example = "4.5")
    double rating,

    @Schema(description = "리뷰 출처 타입 코드 (GENERAL / GAME_MISSION)", example = "GENERAL")
    String reviewSourceTypeCode,

    @Schema(description = "리뷰 출처 타입 설명 (일반 리뷰 / 게임 미션을 통해 인증된 리뷰)", example = "일반 리뷰")
    String reviewSourceTypeDescription,

    @Schema(description = "리뷰 사진 목록")
    List<PhotoResponse> photos
) {

    @Builder
    @Schema(description = "리뷰 사진 조회 응답 DTO")
    public record PhotoResponse(

        @Schema(description = "리뷰 사진 ID", example = "3001")
        String tripSpotReviewPhotoId,

        @Schema(description = "사진 URL", example = "https://cdn.../review1.jpg")
        String photoUrl,

        @Schema(description = "사진 순서 (1~5)", example = "1")
        int orderNo
    ) {

    }
}
