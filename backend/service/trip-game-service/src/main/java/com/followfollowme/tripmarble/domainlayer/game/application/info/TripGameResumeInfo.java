package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record TripGameResumeInfo(
    long tripGameId,
    String title,
    Status status,
    Difficulty difficulty,
    LocalDate statedAt,
    LocalDate endedAt,
    int currentTurnOrder,
    int currentStepNo,
    List<String> themeNames,
    List<TripGameMemberInfo> members,
    List<TripGameTileInfo> tiles
) {

    public static TripGameResumeInfo of(
        TripGame tripGame, List<String> themeNames, List<TripGameMemberInfo> members, List<TripGameTileInfo> tiles) {
        return TripGameResumeInfo.builder()
            .tripGameId(tripGame.id())
            .title(tripGame.title())
            .status(tripGame.status())
            .difficulty(tripGame.difficulty())
            .statedAt(tripGame.startedAt())
            .endedAt(tripGame.endedAt())
            .currentTurnOrder(tripGame.currentTurnOrder())
            .currentStepNo(tripGame.currentStepNo())
            .themeNames(themeNames)
            .members(members)
            .tiles(tiles)
            .build();
    }
}
