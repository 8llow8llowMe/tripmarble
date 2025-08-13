package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import java.util.List;
import lombok.Builder;

@Builder
public record TripGameQueryInfo(
    TripGame tripGame,
    long memberCount,
    List<String> tripThemeNames,
    RepresentativeRegionInfoInternalResponse representativeRegionInfo,
    boolean isHost,
    boolean isReady
) {

    public static TripGameQueryInfo of(TripGame tripGame, long memberCount, List<String> tripThemeNames,
        RepresentativeRegionInfoInternalResponse representativeRegionInfo, boolean isHost, boolean isReady) {
        return TripGameQueryInfo.builder()
            .tripGame(tripGame)
            .memberCount(memberCount)
            .tripThemeNames(tripThemeNames)
            .representativeRegionInfo(representativeRegionInfo)
            .isHost(isHost)
            .isReady(isReady)
            .build();
    }
}
