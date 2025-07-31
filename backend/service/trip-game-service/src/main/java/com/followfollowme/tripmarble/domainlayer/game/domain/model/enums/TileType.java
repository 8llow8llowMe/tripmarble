package com.followfollowme.tripmarble.domainlayer.game.domain.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TileType {
    START("출발점"),
    NORMAL("기본"),
    MISSION("미션"),
    END("도착점");

    private final String description;
}
