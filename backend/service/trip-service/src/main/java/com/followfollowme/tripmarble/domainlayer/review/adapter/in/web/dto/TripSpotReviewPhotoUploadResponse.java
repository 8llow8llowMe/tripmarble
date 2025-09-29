package com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행지 리뷰 사진 임시 업로드 응답 DTO")
public record TripSpotReviewPhotoUploadResponse(

    @Schema(description = "임시 업로드된 여행지 리뷰 사진 URL", example = "https://cdn.tripmarble.com/tripmarble/uploads/temp/uuid_review.jpg")
    String tempPhotoUrl
) {

}
