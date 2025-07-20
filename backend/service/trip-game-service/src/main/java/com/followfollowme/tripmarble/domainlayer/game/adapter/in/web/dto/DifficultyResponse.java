package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행 난이도 응답 DTO")
public record DifficultyResponse(

    @Schema(description = "난이도 코드", example = "EASY")
    String code,

    @Schema(description = "난이도 설명", example = "쉬움")
    String description
) {
}
