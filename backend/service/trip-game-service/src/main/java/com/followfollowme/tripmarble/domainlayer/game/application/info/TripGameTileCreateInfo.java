package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotRandomInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import java.util.List;
import lombok.Builder;

@Builder
public record TripGameTileCreateInfo(
    List<TripGameTile> tripGameTiles,
    List<TripSpotRandomInternalResponse> tripSpotInfos
) {

    public static TripGameTileCreateInfo of(List<TripGameTile> tiles, List<TripSpotRandomInternalResponse> infos) {
        return TripGameTileCreateInfo.builder()
            .tripGameTiles(tiles)
            .tripSpotInfos(infos)
            .build();
    }
}
