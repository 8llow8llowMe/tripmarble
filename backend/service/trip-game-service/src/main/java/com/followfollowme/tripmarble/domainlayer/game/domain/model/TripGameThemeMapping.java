package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import lombok.Builder;

@Builder
public record TripGameThemeMapping(
    long id,
    long tripGameId,
    long tripThemeId
) {
}
