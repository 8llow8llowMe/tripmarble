package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMoveLog;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;

public interface TripGameMoveLogRepositoryPort {

    TripGameMoveLog save(TripGameMoveLog tripGameMoveLog, TripGameTile tripGameTile);
}
