package com.followfollowme.tripmarble.domainlayer.game.domain.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Difficulty {
    EASY("쉬움"),
    NORMAL("보통"),
    HARD("어려움");

    private final String description;
}
