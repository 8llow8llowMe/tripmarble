package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "시군구 조회 응답 DTO")
public record SigunguResponse(

    @Schema(description = "시군구 ID", example = "1")
    String sigunguId,

    @Schema(description = "시군구 코드", example = "110")
    String sigunguCode,

    @Schema(description = "시군구 이름", example = "종로구")
    String sigunguName
) {
}
