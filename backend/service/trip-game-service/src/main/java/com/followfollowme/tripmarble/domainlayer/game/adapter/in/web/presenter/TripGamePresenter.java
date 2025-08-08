package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartMemberView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameStartResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameTileView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameStartInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameTileCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGame;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGamePresenter {

    public TripGameCreateResponse toCreateResponseFrom(TripGameCreateInfo createInfo, TripGameTileCreateInfo tileInfo) {
        TripGameView gameView = toGameView(createInfo);
        List<TripGameTileView> tileViews = toTileViews(tileInfo);
        return TripGameCreateResponse.builder()
            .tripGameView(gameView)
            .tripGameTileViews(tileViews)
            .build();
    }

    public TripGameStartResponse toStartResponse(TripGameStartInfo startInfo) {
        TripGame game = startInfo.tripGame();
        List<TripGameStartMemberView> members = startInfo.members().stream()
            .map(m -> TripGameStartMemberView.builder()
                .memberId(m.memberId())
                .nickname(m.nickname())
                .profileImage(m.profileImage())
                .turnOrder(m.turnOrder())
                .isHost(m.isHost())
                .build())
            .toList();

        return TripGameStartResponse.builder()
            .tripGameId(game.id())
            .gameStatusCode(game.status().name())
            .gameStatusDescription(game.status().getDescription())
            .members(members)
            .build();
    }

    private TripGameView toGameView(TripGameCreateInfo info) {
        return TripGameView.builder()
            .tripGameId(info.tripGame().id())
            .gameStatus(info.tripGame().status().name())
            .gameStatusDescription(info.tripGame().status().getDescription())
            .difficultyCode(info.tripGame().difficulty().name())
            .difficultyDescription(info.tripGame().difficulty().getDescription())
            .startedAt(info.tripGame().startedAt())
            .endedAt(info.tripGame().endedAt())
            .currentTurnOrder(info.tripGame().currentTurnOrder())
            .currentStepNo(info.tripGame().currentStepNo())
            .representativeRegionName(info.representativeRegionInfo().representativeRegionName())
            .tripThemeNames(info.tripThemes().stream().map(TripTheme::name).toList())
            .isReady(info.tripGameMember().isReady())
            .isHost(info.tripGameMember().isHost())
            .build();
    }

    private List<TripGameTileView> toTileViews(TripGameTileCreateInfo tileInfo) {
        return IntStream.range(0, tileInfo.tripGameTiles().size())
            .mapToObj(i -> {
                TripGameTile tile = tileInfo.tripGameTiles().get(i);
                TripSpotRandomResponse spot = tileInfo.tripSpotInfos().get(i);
                return TripGameTileView.builder()
                    .tripGameTileId(tile.id())
                    .tripSpotId(tile.tripSpotId())
                    .stepNo(tile.stepNo())
                    .tileTypeCode(tile.tileType().name())
                    .tileTypeDescription(tile.tileType().getDescription())
                    .tripSpotName(spot.tripSpotName())
                    .build();
            })
            .toList();
    }
}
