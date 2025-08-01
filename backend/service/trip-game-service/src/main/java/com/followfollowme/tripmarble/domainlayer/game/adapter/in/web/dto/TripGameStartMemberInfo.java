package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record TripGameStartMemberInfo(
    long memberId,
    String nickname,
    String profileImageUrl,
    int turnOrder,
    boolean isHost
) {

}
