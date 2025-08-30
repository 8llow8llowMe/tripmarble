package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MissionResultResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.MissionResultInfo;
import org.springframework.stereotype.Component;

@Component
public class TripGameMoveLogPresenter {

    public MissionResultResponse toMissionResultResponse(MissionResultInfo info) {
        return MissionResultResponse.builder()
            .tripGameMoveLogId(String.valueOf(info.tripGameMoveLogId()))
            .tripGameTileId(String.valueOf(info.tripGameTileId()))
            .tripGameMemberId(String.valueOf(info.tripGameMemberId()))
            .dice(info.dice())
            .turnOrder(info.turnOrder())
            .arrivedAt(info.arrivedAt())
            .missionResultCode(info.missionResult().name())
            .missionResultDescription(info.missionResult().getDescription())
            .missionProcessedAt(info.missionProcessedAt() != null ? info.missionProcessedAt() : null)
            .build();
    }
}
