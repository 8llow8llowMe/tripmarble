package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.EndType;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.GameStatus;
import lombok.Builder;

@Builder
public record TripGameEndInfo(
    long tripGameId,
    GameStatus status,
    EndType endType

) {

    public static TripGameEndInfo of(TripGame game) {
        return TripGameEndInfo.builder()
            .tripGameId(game.id())
            .status(game.status())
            .endType(game.endType())
            .build();
    }
}
