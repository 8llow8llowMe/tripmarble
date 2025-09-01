package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "대표 여행지에 따른 여행지 목록 조회 응답 DTO")
public record TripSpotSimpleResponse(

    @Schema(description = "여행지 정보 아이디", example = "1")
    String tripSpotId,

    @Schema(description = "여행 콘텐츠 아이디", example = "2820640")
    String contentId,

    @Schema(description = "여행지 정보 이름 (제목)", example = "가림상회")
    String tripSpotName,

    @Schema(description = "여행지 대표 이미지 원본 URL", example = "http://tong.visitkorea.or.kr/~~~.jpg")
    String originalImageUrl
) {
}
