package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.EndType;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record TripGameDetailInfo(
    long tripGameId,
    RepresentativeRegionInfo representativeRegionInfo,
    List<String> tripThemeNames,
    Difficulty difficulty,
    String title,
    LocalDate startedAt,
    LocalDate endedAt,
    int currentTurnOrder,
    int currentStepNo,
    EndType endType,
    List<TripGameMemberInfo> members
) {

    public static TripGameDetailInfo of(TripGame tripGame, RepresentativeRegionInfo representativeRegionInfo,
        List<String> tripThemeNames, List<TripGameMemberInfo> members) {
        return TripGameDetailInfo.builder()
            .tripGameId(tripGame.id())
            .representativeRegionInfo(representativeRegionInfo)
            .tripThemeNames(tripThemeNames)
            .difficulty(tripGame.difficulty())
            .title(tripGame.title())
            .startedAt(tripGame.startedAt())
            .endedAt(tripGame.endedAt())
            .currentTurnOrder(tripGame.currentTurnOrder())
            .currentStepNo(tripGame.currentStepNo())
            .endType(tripGame.endType())
            .members(members)
            .build();
    }
}
