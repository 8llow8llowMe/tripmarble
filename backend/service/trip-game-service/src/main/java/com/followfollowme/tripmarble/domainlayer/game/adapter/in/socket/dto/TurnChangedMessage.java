package com.followfollowme.tripmarble.domainlayer.game.adapter.in.socket.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "게임 턴 전환 WebSocket 메시지 DTO")
public record TurnChangedMessage(

    @Schema(description = "여행 게임 ID", example = "1001")
    long tripGameId,

    @Schema(description = "현재 턴인 회원 ID", example = "202507110001")
    long currentTurnMemberId,

    @Schema(description = "현재 턴 순서 (1부터 시작)", example = "2")
    int currentTurnOrder,

    @Schema(description = "현재 라운드", example = "1")
    int currentRound
) {

}
