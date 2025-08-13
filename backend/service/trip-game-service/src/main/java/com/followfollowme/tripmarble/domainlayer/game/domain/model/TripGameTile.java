package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionType;
import lombok.Builder;

@Builder
public record TripGameTile(
    long id,
    long tripGameId,
    long tripSpotId,
    int stepNo,
    MissionType missionType
) {

}
