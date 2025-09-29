package com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(description = "여행지 리뷰 종합 요약 응답 DTO")
public record TripSpotReviewSummaryResponse(

    @Schema(description = "리뷰 총 개수", example = "253")
    long totalCount,

    @Schema(description = "평균 평점 (0.5 단위)", example = "4.3")
    double averageRating,

    @Schema(description = "별점 분포 (별점별 리뷰 개수)",
        example = "[{\"rating\":5.0,\"count\":116},{\"rating\":4.5,\"count\":50}]")
    List<RatingDistributionResponse> ratingDistributions,

    @Schema(description = "대표 사진 목록 (최신순/랜덤 3~5장)",
        example = "[{\"tripSpotReviewPhotoId\":101,\"photoUrl\":\"https://cdn.../review1.jpg\"}," +
            "{\"tripSpotReviewPhotoId\":102,\"photoUrl\":\"https://cdn.../review2.jpg\"}]")
    List<PhotoSampleResponse> samplePhotos
) {

    @Builder
    @Schema(description = "별점 분포 응답 DTO")
    public record RatingDistributionResponse(

        @Schema(description = "별점 값 (0.5 단위)", example = "4.5")
        double rating,

        @Schema(description = "해당 별점을 준 리뷰 개수", example = "50")
        long count
    ) {

    }

    @Builder
    @Schema(description = "리뷰 대표 (샘플) 사진 응답 DTO")
    public record PhotoSampleResponse(

        @Schema(description = "리뷰 사진 ID", example = "101")
        String tripSpotReviewPhotoId,

        @Schema(description = "사진 URL", example = "https://cdn.../review1.jpg")
        String photoUrl
    ) {

    }
}
