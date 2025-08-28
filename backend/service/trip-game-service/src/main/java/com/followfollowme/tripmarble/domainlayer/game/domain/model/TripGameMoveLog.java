package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record TripGameMoveLog(
    long id,
    long tripGameTileId,
    LocalDateTime arrivedAt,
    int dice,
    int turnOrder,
    MissionResult missionResult
) {

    public TripGameMoveLog updateMissionResult(MissionResult result) {
        this.missionResult.validateChangeable(); // 상태 전환 가능 여부 검증
        
        return TripGameMoveLog.builder()
            .id(this.id)
            .tripGameTileId(this.tripGameTileId)
            .arrivedAt(this.arrivedAt)
            .dice(this.dice)
            .turnOrder(this.turnOrder)
            .missionResult(result)
            .build();
    }
}
