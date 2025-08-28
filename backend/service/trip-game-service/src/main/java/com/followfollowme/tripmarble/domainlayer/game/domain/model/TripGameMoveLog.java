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

}
