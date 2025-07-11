package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;

public interface TripGameRepositoryPort {

    TripGame save(TripGame domain);
}
