package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(description = "여행지 리뷰 생성 응답 DTO")
public record TripSpotReviewCreateResponse(

    @Schema(description = "여행지 리뷰 ID", example = "194728374923874923")
    String tripSpotReviewId,

    @Schema(description = "여행지 정보 ID", example = "1827364519283")
    String tripSpotId,

    @Schema(description = "리뷰 작성자 ID", example = "1001")
    String reviewerId,

    @Schema(description = "리뷰 내용", example = "여행지가 너무 예쁘고 추천할 만해요!")
    String content,

    @Schema(description = "별점 (1~5)", example = "4.5")
    double rating,

    @Schema(description = "리뷰 출처 타입 코드", example = "GENERAL")
    String reviewSourceTypeCode,

    @Schema(description = "리뷰 출처 타입 설명", example = "일반 리뷰")
    String reviewSourceTypeDescription,

    @Schema(description = "리뷰 사진 URL 목록", example = "[\"http://.../review1.jpg\", \"http://.../review2.jpg\"]")
    List<String> photoUrls
) {
}
