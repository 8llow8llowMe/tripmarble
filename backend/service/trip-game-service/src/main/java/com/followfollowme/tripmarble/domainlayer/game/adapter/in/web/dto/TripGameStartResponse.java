package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record TripGameStartResponse(
    long tripGameId,
    String gameStatusCode,
    String gameStatusDescription,
    int currentRound,
    int currentTurnOrder,
    List<TripGameStartMemberInfo> members
) {

}
