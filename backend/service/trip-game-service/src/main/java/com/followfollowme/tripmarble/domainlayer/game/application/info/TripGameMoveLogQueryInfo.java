package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record TripGameMoveLogQueryInfo(
    long tripGameMoveLogId,
    long tripGameTileId,
    long tripGameMemberId,
    LocalDateTime arrivedAt,
    int diceValue,
    int turnOrder,
    MissionResult missionResult,
    LocalDateTime missionProcessedAt
) {

    public static TripGameMoveLogQueryInfo of(TripGameMoveLog log) {
        return TripGameMoveLogQueryInfo.builder()
            .tripGameMoveLogId(log.id())
            .tripGameTileId(log.tripGameTileId())
            .tripGameMemberId(log.tripGameMemberId())
            .arrivedAt(log.arrivedAt())
            .diceValue(log.dice())
            .turnOrder(log.turnOrder())
            .missionResult(log.missionResult())
            .missionProcessedAt(log.missionProcessedAt())
            .build();
    }
}
