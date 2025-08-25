package com.followfollowme.tripmarble.domainlayer.theme.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행 테마 조회 응답 DTO")
public record TripThemeResponse(

    @Schema(description = "여행 테마 ID", example = "1")
    String tripThemeId,

    @Schema(description = "여행 테마 이름", example = "관광")
    String tripThemeName
) {

}
