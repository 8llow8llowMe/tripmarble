package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import lombok.Builder;

@Builder
public record MissionResultInfo(
    long tripGameMoveLogId,
    long tripGameTileId,
    MissionResult missionResult
) {

    public static MissionResultInfo of(TripGameMoveLog log) {
        return MissionResultInfo.builder()
            .tripGameMoveLogId(log.id())
            .tripGameTileId(log.tripGameTileId())
            .missionResult(log.missionResult())
            .build();
    }
}
