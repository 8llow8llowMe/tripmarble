package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "지역(시도) 응답 DTO")
public record RegionResponse(

    @Schema(description = "시도 ID", example = "1")
    String regionId,

    @Schema(description = "Tour API 전용 시도 코드", example = "11")
    String regionCode,

    @Schema(description = "시도 이름", example = "서울특별시")
    String regionName
) {
}
