package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
@Schema(description = "여행 게임 이동 로그(타임라인) 조회 응답 DTO")
public record TripGameMoveLogResponse(

    @Schema(description = "게임 이동 로그 ID", example = "616890665435009024")
    String tripGameMoveLogId,

    @Schema(description = "게임 타일(블록) ID", example = "20250731000123")
    String tripGameTileId,

    @Schema(description = "게임 참여자 ID", example = "987654321")
    String tripGameMemberId,

    @Schema(description = "도착 시간", example = "2025-09-06T13:45:12")
    LocalDateTime arrivedAt,

    @Schema(description = "당시 던진 주사위 값", example = "4")
    int diceValueAtRoll,

    @Schema(description = "주사위를 굴릴 당시 턴 순서", example = "1")
    int turnOrderAtRoll,

    @Schema(description = "미션 결과 코드", example = "SUCCESS")
    String missionResultCode,

    @Schema(description = "미션 결과 설명", example = "성공")
    String missionResultDescription,

    @Schema(description = "미션 처리 완료 시각", example = "2025-09-06T13:46:01")
    LocalDateTime missionProcessedAt
) {
}
