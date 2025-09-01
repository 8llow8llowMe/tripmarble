package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record TripGameTurnResponse(
    int dice,
    int stepNo,
    @Schema(description = "타일 타입", example = "START")
    String tileTypeCode,

    @Schema(description = "타일 타입 설명", example = "출발점")
    String tileTypeDescription,

    boolean isGameFinished

) {

}
