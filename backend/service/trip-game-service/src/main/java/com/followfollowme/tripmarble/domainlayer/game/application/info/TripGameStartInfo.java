package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import java.util.List;
import lombok.Builder;

@Builder
public record TripGameStartInfo(
    TripGame tripGame,
    List<TripGameMember> members
) {

    public static TripGameStartInfo of(TripGame tripGame, List<TripGameMember> members) {
        return TripGameStartInfo.builder()
            .tripGame(tripGame)
            .members(members)
            .build();
    }
}
