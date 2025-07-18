package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "대표 여행지 전체 목록 조회 응답 DTO")
public record RepresentativeRegionSummaryResponse(

    @Schema(description = "대표 여행지 아이디", example = "1")
    long representativeRegionId,

    @Schema(description = "대표 여행지 이름", example = "서울")
    String representativeRegionName,

    @Schema(description = "대표 여행지 썸네일 이미지 URL", example = "https://cdn.tripmarble.com/seoul.jpg")
    String imageUrl
) {

}
