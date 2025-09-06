package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MissionResultResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameMoveLogResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.info.MissionResultInfo;
import com.followfollowme.tripmarble.domainlayer.game.application.info.TripGameMoveLogQueryInfo;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TripGameMoveLogPresenter {

    public MissionResultResponse toMissionResultResponse(MissionResultInfo info) {
        return MissionResultResponse.builder()
            .tripGameMoveLogId(String.valueOf(info.tripGameMoveLogId()))
            .tripGameTileId(String.valueOf(info.tripGameTileId()))
            .tripGameMemberId(String.valueOf(info.tripGameMemberId()))
            .diceValue(info.diceValue())
            .turnOrder(info.turnOrder())
            .arrivedAt(info.arrivedAt())
            .missionResultCode(info.missionResult().name())
            .missionResultDescription(info.missionResult().getDescription())
            .missionProcessedAt(info.missionProcessedAt() != null ? info.missionProcessedAt() : null)
            .build();
    }

    public TripGameMoveLogResponse toMoveLogResponse(TripGameMoveLogQueryInfo info) {
        return TripGameMoveLogResponse.builder()
            .tripGameMoveLogId(String.valueOf(info.tripGameMoveLogId()))
            .tripGameTileId(String.valueOf(info.tripGameTileId()))
            .tripGameMemberId(String.valueOf(info.tripGameMemberId()))
            .arrivedAt(info.arrivedAt())
            .diceValueAtRoll(info.diceValue())
            .turnOrderAtRoll(info.turnOrder())
            .missionResultCode(info.missionResult().name())
            .missionResultDescription(info.missionResult().getDescription())
            .missionProcessedAt(info.missionProcessedAt() != null ? info.missionProcessedAt() : null)
            .build();
    }

    public List<TripGameMoveLogResponse> toMoveLogResponses(List<TripGameMoveLogQueryInfo> infos) {
        return infos.stream()
            .map(this::toMoveLogResponse)
            .toList();
    }
}
