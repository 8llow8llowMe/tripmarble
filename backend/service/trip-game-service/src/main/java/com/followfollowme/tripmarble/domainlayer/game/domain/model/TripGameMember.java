package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import lombok.Builder;

@Builder
public record TripGameMember(
    long id,
    long tripGameId,
    long memberId,
    boolean isReady,
    boolean isHost,
    int turnOrder
) {

    public TripGameMember assignTurnOrder(int newTurnOrder) {
        return TripGameMember.builder()
            .id(this.id())
            .tripGameId(this.tripGameId())
            .memberId(this.memberId())
            .isReady(this.isReady())
            .isHost(this.isHost())
            .turnOrder(newTurnOrder)
            .build();
    }
}
