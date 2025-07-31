package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import java.util.List;

public interface TripGameTileRepositoryPort {

    List<TripGameTile> saveAll(List<TripGameTile> tripGameTiles, TripGame tripGame);
}
