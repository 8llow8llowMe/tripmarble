package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record MissionResultInfo(
    long tripGameMoveLogId,
    long tripGameTileId,
    long tripGameMemberId,
    int diceValue,
    int turnOrder,
    LocalDateTime arrivedAt,
    MissionResult missionResult,
    LocalDateTime missionProcessedAt,
    Long missionReferenceId
) {

    public static MissionResultInfo of(TripGameMoveLog log) {
        return MissionResultInfo.builder()
            .tripGameMoveLogId(log.id())
            .tripGameTileId(log.tripGameTileId())
            .tripGameMemberId(log.tripGameMemberId())
            .diceValue(log.dice())
            .turnOrder(log.turnOrder())
            .arrivedAt(log.arrivedAt())
            .missionResult(log.missionResult())
            .missionProcessedAt(log.missionProcessedAt())
            .missionReferenceId(log.missionReferenceId())
            .build();
    }
}
