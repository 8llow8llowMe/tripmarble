package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행 게임 종료 응답 DTO")
public record TripGameEndResponse(

    @Schema(description = "종료된 여행 게임 ID", example = "202507110001")
    String tripGameId,

    @Schema(description = "게임 상태", example = "ENDED")
    String gameStatusCode,

    @Schema(description = "게임 상태 설명", example = "게임 종료됨")
    String gameStatusDescription,

    @Schema(description = "게임 종료 사유 상태", example = "NORMAL")
    String endTypeCode,

    @Schema(description = "게임 종료 사유 상태 설명", example = "정상 종료")
    String endTypeDescription
) {

}
