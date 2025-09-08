package com.followfollowme.tripmarble.domainlayer.game.application.context;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import lombok.Builder;

@Builder
public record MissionContext(
    TripGame game,
    TripGameMoveLog moveLog,
    TripGameMember gameMember,
    TripGameTile gameTile
) {

}
