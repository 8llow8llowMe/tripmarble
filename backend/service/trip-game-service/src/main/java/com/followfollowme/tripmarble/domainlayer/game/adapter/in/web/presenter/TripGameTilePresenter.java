package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameTileResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameTileQueryInfo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class TripGameTilePresenter {

    public List<TripGameTileResponse> toGameTileResponses(TripGameTileQueryInfo info) {
        Map<Long, TripSpotQueryInternalResponse> tripSpotMap = info.tripSpotInfos().stream()
            .collect(Collectors.toMap(TripSpotQueryInternalResponse::tripSpotId, Function.identity()));

        return info.tripGameTiles().stream()
            .map(tile -> {
                TripSpotQueryInternalResponse spotInfo = tripSpotMap.get(tile.tripSpotId());
                return TripGameTileResponse.builder()
                    .tripGameTileId(String.valueOf(tile.id()))
                    .tripSpotId(String.valueOf(tile.tripSpotId()))
                    .stepNo(tile.stepNo())
                    .missionTypeCode(tile.missionType().name())
                    .missionTypeDescription(tile.missionType().getDescription())
                    .tripSpotName(spotInfo.tripSpotName())
                    .build();
            })
            .toList();
    }
}
