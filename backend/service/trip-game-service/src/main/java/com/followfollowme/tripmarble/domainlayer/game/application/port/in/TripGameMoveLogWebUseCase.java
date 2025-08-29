package com.followfollowme.tripmarble.domainlayer.game.application.port.in;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.MissionResultResponse;

public interface TripGameMoveLogWebUseCase {

    MissionResultResponse skipMission(long tripGameId, long tripGameMoveLogId, long memberId);
}
