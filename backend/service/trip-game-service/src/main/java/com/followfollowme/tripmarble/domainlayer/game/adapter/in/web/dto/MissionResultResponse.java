package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record MissionResultResponse(
    String tripGameMoveLogId,
    String tripGameTileId,
    String missionResultCode,
    String missionResultDescription
) {

}
