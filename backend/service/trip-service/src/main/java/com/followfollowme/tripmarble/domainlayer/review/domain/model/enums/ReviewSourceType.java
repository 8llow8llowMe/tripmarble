package com.followfollowme.tripmarble.domainlayer.review.domain.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReviewSourceType {
    GENERAL("일반 리뷰"),
    GAME_MISSION("게임 미션을 통해 인증된 리뷰");

    private final String description;
}