package com.followfollowme.tripmarble.domainlayer.game.domain.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {
    WAITING("시작 전"),
    ONGOING("진행 중"),
    ENDED("종료됨");

    private final String description;
}
