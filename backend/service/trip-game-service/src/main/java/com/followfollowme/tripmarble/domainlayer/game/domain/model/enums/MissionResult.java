package com.followfollowme.tripmarble.domainlayer.game.domain.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MissionResult {
    SUCCESS("성공"), // 미션 성공
    SKIPPED("넘어감"), // 미션 건너뜀 (패스)
    FAILED("실패"), // 미션 실패
    PENDING("대기중"); // 아직 미션 미수행 (디폴트)

    private final String description;
}
