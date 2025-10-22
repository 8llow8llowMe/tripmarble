package com.followfollowme.tripmarble.domainlayer.game.application.info;

import lombok.Builder;

@Builder
public record TripGameCountInfo(
    long memberId,
    int tripGameCount
) {

    public static TripGameCountInfo of(long memberId, int tripGameCount) {
        return TripGameCountInfo.builder()
            .memberId(memberId)
            .tripGameCount(tripGameCount)
            .build();
    }
}
