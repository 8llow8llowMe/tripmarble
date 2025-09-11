package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.GameStatus;
import lombok.Builder;

@Builder
public record TripGameStartInfo(
    long tripGameId,
    GameStatus status
) {

    public static TripGameStartInfo of(TripGame tripGame) {
        return TripGameStartInfo.builder()
            .tripGameId(tripGame.id())
            .status(tripGame.status())
            .build();
    }
}
