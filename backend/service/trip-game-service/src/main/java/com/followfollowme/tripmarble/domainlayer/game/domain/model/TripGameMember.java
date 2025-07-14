package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import lombok.Builder;

@Builder
public record TripGameMember(
    long id,
    long tripGameId,
    long memberId,
    boolean isReady,
    boolean isHost
) {

}
