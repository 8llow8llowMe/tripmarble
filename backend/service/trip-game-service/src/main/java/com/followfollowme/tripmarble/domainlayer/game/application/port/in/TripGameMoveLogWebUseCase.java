package com.followfollowme.tripmarble.domainlayer.game.application.port.in;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MissionResultResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameMoveLogResponse;

import java.util.List;

public interface TripGameMoveLogWebUseCase {

    MissionResultResponse skipMission(long tripGameId, long tripGameMoveLogId, long memberId);

    MissionResultResponse successMission(long tripGameId, long tripGameMoveLogId, long memberId);

    MissionResultResponse failMission(long tripGameId, long tripGameMoveLogId, long memberId);

    List<TripGameMoveLogResponse> getMoveLogsByTripGameId(long tripGameId);
}
