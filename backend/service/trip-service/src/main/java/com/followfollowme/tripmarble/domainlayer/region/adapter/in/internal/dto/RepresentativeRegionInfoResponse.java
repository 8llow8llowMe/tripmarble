package com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(hidden = true, description = "내부 서비스 통신 전용 대표 여행지 조회 응답 DTO")
public record RepresentativeRegionInfoResponse(

    @Schema(description = "대표 여행지 아이디", example = "1")
    long representativeRegionId,

    @Schema(description = "대표 여행지 이름", example = "서울")
    String representativeRegionName
) {

}
