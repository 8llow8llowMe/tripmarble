package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "대표 여행지 자동완성 검색 응답 DTO")
public record RepresentativeRegionSearchResponse(

    @Schema(description = "대표 여행지 ID", example = "1")
    String representativeRegionId,

    @Schema(description = "대표 여행지 이름", example = "서울")
    String representativeRegionName
) {
}
