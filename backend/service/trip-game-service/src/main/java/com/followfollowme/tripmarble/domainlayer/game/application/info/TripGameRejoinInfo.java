package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import lombok.Builder;

@Builder
public record TripGameRejoinInfo(
    long tripGameId,
    Status status
) {

    public static TripGameRejoinInfo of(TripGame tripGame) {
        return TripGameRejoinInfo.builder()
            .tripGameId(tripGame.id())
            .status(tripGame.status())
            .build();
    }
}
