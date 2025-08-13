package com.followfollowme.tripmarble.domainlayer.game.application.readmodel;

import lombok.Builder;

@Builder
public record TripGameThemeNames(
    long tripGameId,
    String themeName
) {

}
