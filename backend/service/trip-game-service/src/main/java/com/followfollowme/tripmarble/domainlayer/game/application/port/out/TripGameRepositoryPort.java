package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import java.util.Optional;

public interface TripGameRepositoryPort {

    TripGame save(TripGame tripGame);

    Optional<TripGame> findById(long tripGameId);
}
