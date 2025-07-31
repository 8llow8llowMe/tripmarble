package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoResponse;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameMember;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;
import lombok.Builder;

@Builder
public record TripGameCreateInfo(
    TripGame tripGame,
    TripGameMember tripGameMember,
    List<TripTheme> tripThemes,
    RepresentativeRegionInfoResponse representativeRegionInfo
) {

    public static TripGameCreateInfo of(
        TripGame game, TripGameMember member, List<TripTheme> themes, RepresentativeRegionInfoResponse info
    ) {
        return TripGameCreateInfo.builder()
            .tripGame(game)
            .tripGameMember(member)
            .tripThemes(themes)
            .representativeRegionInfo(info)
            .build();
    }
}
