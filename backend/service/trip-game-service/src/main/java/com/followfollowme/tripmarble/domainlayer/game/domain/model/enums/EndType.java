package com.followfollowme.tripmarble.domainlayer.game.domain.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EndType {
    NORMAL("정상 종료"),
    FORCED("강제 종료");

    private final String description;
}
