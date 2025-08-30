package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record MissionResultInfo(
    long tripGameMoveLogId,
    long tripGameTileId,
    long tripGameMemberId,
    int dice,
    int turnOrder,
    LocalDateTime arrivedAt,
    MissionResult missionResult,
    LocalDateTime missionProcessedAt
) {

    public static MissionResultInfo of(TripGameMoveLog log) {
        return MissionResultInfo.builder()
            .tripGameMoveLogId(log.id())
            .tripGameTileId(log.tripGameTileId())
            .tripGameMemberId(log.tripGameMemberId())
            .dice(log.dice())
            .turnOrder(log.turnOrder())
            .arrivedAt(log.arrivedAt())
            .missionResult(log.missionResult())
            .missionProcessedAt(log.missionProcessedAt())
            .build();
    }
}
