package com.followfollowme.tripmarble.domainlayer.game.domain.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MissionType {
    REVIEW("후기 작성"),
    CHECKIN_GPS("위치 인증");

    private final String description;
}
