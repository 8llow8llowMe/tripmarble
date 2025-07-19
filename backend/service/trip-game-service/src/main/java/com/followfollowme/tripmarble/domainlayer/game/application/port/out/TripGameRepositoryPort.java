package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;

public interface TripGameRepositoryPort {

    TripGame save(TripGame tripGame, TripTheme tripTheme);
}
