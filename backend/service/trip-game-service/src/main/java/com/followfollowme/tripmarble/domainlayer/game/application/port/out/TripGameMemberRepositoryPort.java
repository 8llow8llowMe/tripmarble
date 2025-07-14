package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;

public interface TripGameMemberRepositoryPort {

    TripGameMember save(TripGameMember domain);
}
