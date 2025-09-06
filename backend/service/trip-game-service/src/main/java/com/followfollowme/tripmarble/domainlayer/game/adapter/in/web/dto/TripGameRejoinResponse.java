package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행 게임 재입장 응답 DTO")
public record TripGameRejoinResponse(

    @Schema(description = "여행 게임 ID", example = "202507110001")
    String tripGameId,

    @Schema(description = "게임 상태 코드", example = "ONGOING")
    String gameStatus,

    @Schema(description = "게임 상태 설명", example = "게임 진행 중")
    String gameStatusDescription
) {

}
