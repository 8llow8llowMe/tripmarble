package com.followfollowme.tripmarble.domainlayer.review.adapter.in.internal.dto;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Hidden
@Schema(description = "회원별 여행지 리뷰 및 사진 개수 조회 응답 DTO")
public record TripSpotReviewCountInternalResponse(

    @Schema(description = "회원 ID", example = "1001")
    long memberId,

    @Schema(description = "작성한 여행지 리뷰 개수", example = "8")
    int tripSpotReviewCount,

    @Schema(description = "업로드한 리뷰 사진 개수", example = "15")
    int photoCount
) {

}
