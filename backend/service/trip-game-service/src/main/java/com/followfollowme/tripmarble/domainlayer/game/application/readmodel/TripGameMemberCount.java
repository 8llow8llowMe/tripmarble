package com.followfollowme.tripmarble.domainlayer.game.application.readmodel;

import lombok.Builder;

@Builder
public record TripGameMemberCount(
    long tripGameId,
    long memberCount
) {

}
