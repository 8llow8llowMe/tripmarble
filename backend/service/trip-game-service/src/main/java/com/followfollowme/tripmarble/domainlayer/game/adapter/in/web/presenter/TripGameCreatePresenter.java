package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameInfo;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameTileInfo;
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

    public TripGameInfo toGameInfo(TripGameCreateInfo info) {
        return TripGameInfo.builder()
            .tripGameId(info.tripGame().id())
            .status(info.tripGame().status())
            .statusMessage(info.tripGame().status().getDescription())
            .difficulty(info.tripGame().difficulty())
            .difficultyMessage(info.tripGame().difficulty().getDescription())
            .startedAt(info.tripGame().startedAt())
            .endedAt(info.tripGame().endedAt())
            .representativeRegionName(info.representativeRegionInfo().representativeRegionName())
            .tripThemeNames(info.tripThemes().stream().map(TripTheme::name).toList())
            .isHost(true)
            .isReady(false)
            .build();
    }

    public List<TripGameTileInfo> toTileInfos(TripGameTileCreateInfo tileInfo) {
        return IntStream.range(0, tileInfo.tripGameTiles().size())
            .mapToObj(i -> {
                TripGameTile tile = tileInfo.tripGameTiles().get(i);
                TripSpotRandomResponse spot = tileInfo.tripSpotInfos().get(i);

                return TripGameTileInfo.builder()
                    .tripGameTileId(tile.id())
                    .tripSpotId(tile.tripSpotId())
                    .stepNo(tile.stepNo())
                    .tileType(tile.tileType())
                    .tripSpotName(spot.tripSpotName())
                    .build();
            })
            .toList();
    }

    public TripGameCreateResponse toCreateResponseFrom(TripGameInfo gameInfo, List<TripGameTileInfo> tileInfos) {
        return TripGameCreateResponse.builder()
            .tripGameInfo(gameInfo)
            .tripGameTileInfos(tileInfos)
            .build();
    }
}
