package com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Schema(description = "여행지 리뷰 생성 요청 DTO")
public record TripSpotReviewCreateRequest(

    @Schema(description = "리뷰 내용", example = "여행지가 너무 멋지고 깨끗했어요. 꼭 다시 오고 싶습니다!")
    @NotBlank(message = "리뷰 내용은 필수입니다.")
    @Size(min = 5, max = 1000, message = "리뷰 내용은 5자 이상 1000자 이하로 입력해주세요.")
    String content,

    @Schema(description = "별점 (1~5)", example = "4.5")
    @NotNull(message = "별점은 필수입니다.")
    @DecimalMin(value = "1.0", message = "별점은 최소 1점이어야 합니다.")
    @DecimalMax(value = "5.0", message = "별점은 최대 5점이어야 합니다.")
    double rating,

    @Schema(description = "리뷰 사진 URL 목록", example = "[\"http://.../photo1.jpg\", \"http://.../photo2.jpg\"]")
    @Size(max = 5, message = "리뷰 사진은 최대 5장까지 등록할 수 있습니다.")
    List<String> photoUrls
) {

}
