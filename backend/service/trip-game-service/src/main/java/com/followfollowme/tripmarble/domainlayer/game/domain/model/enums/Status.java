package com.followfollowme.tripmarble.domainlayer.game.domain.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {
    WAITING("게임 시작 전"),
    ONGOING("게임 진행 중"),
    ENDED("게임 종료됨");

    private final String description;
}
