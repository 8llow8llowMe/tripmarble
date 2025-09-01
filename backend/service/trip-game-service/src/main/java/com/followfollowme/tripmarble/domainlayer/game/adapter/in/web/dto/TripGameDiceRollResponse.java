package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "여행 게임 주사위 결과 응답 DTO")
public record TripGameDiceRollResponse(

    @Schema(description = "게임 이동 로그 ID", example = "616881356269555712")
    String tripGameMoveLogId,

    @Schema(description = "주사위 값", example = "2")
    int diceValue,

    @Schema(description = "새로운 타일의 순서", example = "7")
    int newStepNo,

    @Schema(description = "한 바퀴 완주 여부 (게임 종료 여부)", example = "false")
    boolean isGameEnded,

    @Schema(description = "도착한 타일 ID", example = "20250731000123")
    String landedTileId,

    @Schema(description = "미션 타입", example = "PHOTO")
    String missionTypeCode,

    @Schema(description = "미션 타입 설명", example = "사진 인증")
    String missionTypeDescription
) {

}
