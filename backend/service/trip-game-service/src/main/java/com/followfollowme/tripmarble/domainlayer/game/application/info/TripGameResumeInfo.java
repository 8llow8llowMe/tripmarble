package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import lombok.Builder;

@Builder
public record TripGameResumeInfo(
    long tripGameId,
    Status status
) {

    public static TripGameResumeInfo of(TripGame tripGame) {
        return TripGameResumeInfo.builder()
            .tripGameId(tripGame.id())
            .status(tripGame.status())
            .build();
    }
}
