package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
@Schema(description = "여행 게임 미션 처리 응답 DTO")
public record MissionResultResponse(

    @Schema(description = "게임 이동 로그 ID", example = "202508270001")
    String tripGameMoveLogId,

    @Schema(description = "게임 타일 ID", example = "202508270045")
    String tripGameTileId,

    @Schema(description = "미션 처리한 참여자 ID", example = "1024")
    String tripGameMemberId,

    @Schema(description = "주사위 값", example = "5")
    int diceValue,

    @Schema(description = "턴 순서 (당시)", example = "2")
    int turnOrder,

    @Schema(description = "타일 도착 시각", example = "2025-08-27T14:33:12")
    LocalDateTime arrivedAt,

    @Schema(description = "미션 결과 코드", example = "SUCCESS")
    String missionResultCode,

    @Schema(description = "미션 결과 설명", example = "성공")
    String missionResultDescription,

    @Schema(description = "미션 처리 완료 시각", example = "2025-08-27T14:35:01")
    LocalDateTime missionProcessedAt
) {

}
