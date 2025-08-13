package com.followfollowme.tripmarble.domainlayer.game.application.info;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.TripGameTile;
import java.util.List;
import lombok.Builder;

@Builder
public record TripGameTileQueryInfo(
    List<TripGameTile> tripGameTiles,
    List<TripSpotQueryInternalResponse> tripSpotInfos
) {

    public static TripGameTileQueryInfo of(List<TripGameTile> tiles, List<TripSpotQueryInternalResponse> infos) {
        return TripGameTileQueryInfo.builder()
            .tripGameTiles(tiles)
            .tripSpotInfos(infos)
            .build();
    }
}
