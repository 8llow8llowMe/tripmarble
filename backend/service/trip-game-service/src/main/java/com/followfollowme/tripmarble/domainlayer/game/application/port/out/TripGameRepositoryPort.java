package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.GameStatus;
import org.springframework.data.domain.Slice;

import java.util.Optional;

public interface TripGameRepositoryPort {

    TripGame save(TripGame tripGame);

    Optional<TripGame> findById(long tripGameId);

    Slice<TripGame> findMyGameNoOffset(long memberId, long lastTripGameId, int size, GameStatus status);
}
