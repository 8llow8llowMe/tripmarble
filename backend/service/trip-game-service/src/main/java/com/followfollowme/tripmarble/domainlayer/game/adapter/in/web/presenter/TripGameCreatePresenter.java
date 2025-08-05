package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameTileView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameView;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameTileCreateInfo;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import com.followfollowme.tripmarble.domainlayer.theme.domain.model.TripTheme;
import java.util.List;
import java.util.stream.IntStream;
import org.springframework.stereotype.Component;

@Component
public class TripGameCreatePresenter {

    public TripGameView toGameInfo(TripGameCreateInfo info) {
        return TripGameView.builder()
            .tripGameId(info.tripGame().id())
            .gameStatus(info.tripGame().status().name())
            .gameStatusDescription(info.tripGame().status().getDescription())
            .difficultyCode(info.tripGame().difficulty().name())
            .difficultyDescription(info.tripGame().difficulty().getDescription())
            .startedAt(info.tripGame().startedAt())
            .endedAt(info.tripGame().endedAt())
            .representativeRegionName(info.representativeRegionInfo().representativeRegionName())
            .tripThemeNames(info.tripThemes().stream().map(TripTheme::name).toList())
            .isHost(true)
            .isReady(false)
            .build();
    }

    public List<TripGameTileView> toTileInfos(TripGameTileCreateInfo tileInfo) {
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

    public TripGameCreateResponse toCreateResponseFrom(TripGameView gameView, List<TripGameTileView> tileViews) {
        return TripGameCreateResponse.builder()
            .tripGameView(gameView)
            .tripGameTileViews(tileViews)
            .build();
    }
}
