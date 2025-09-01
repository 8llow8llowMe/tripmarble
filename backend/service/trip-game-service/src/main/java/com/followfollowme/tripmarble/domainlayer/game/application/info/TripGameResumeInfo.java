package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import java.util.List;
import lombok.Builder;

@Builder
public record TripGameResumeInfo(
    TripGame tripGame,
    List<TripGameMember> members,
    List<TripGameTile> tiles,
    List<String> themeNames
) {

    public static TripGameResumeInfo of(
        TripGame tripGame, List<TripGameMember> members, List<TripGameTile> tiles, List<String> themeNames) {
        return TripGameResumeInfo.builder()
            .tripGame(tripGame)
            .members(members)
            .tiles(tiles)
            .themeNames(themeNames)
            .build();
    }
}
