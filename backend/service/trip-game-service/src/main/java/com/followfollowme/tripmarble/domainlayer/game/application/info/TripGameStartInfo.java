package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import java.util.List;
import lombok.Builder;

@Builder
public record TripGameStartInfo(
    TripGame tripGame,
    List<TripGameMemberWithProfileInfo> members
) {

    public static TripGameStartInfo of(TripGame tripGame, List<TripGameMemberWithProfileInfo> members) {
        return TripGameStartInfo.builder()
            .tripGame(tripGame)
            .members(members)
            .build();
    }
}
