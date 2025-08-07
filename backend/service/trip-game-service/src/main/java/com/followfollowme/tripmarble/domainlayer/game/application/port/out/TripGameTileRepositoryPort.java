package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import java.util.List;
import java.util.Optional;

public interface TripGameTileRepositoryPort {

    List<TripGameTile> saveAll(List<TripGameTile> tripGameTiles, TripGame tripGame);

    int findMaxStepNoByTripGameId(long tripGameId);

    Optional<TripGameTile> findByTripGameIdAndStepNo(long tripGameId, int stepNo);
}
