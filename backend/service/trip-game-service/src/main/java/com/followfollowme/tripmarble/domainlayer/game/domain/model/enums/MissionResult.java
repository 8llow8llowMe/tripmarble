package com.followfollowme.tripmarble.domainlayer.game.domain.model.enums;

import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameErrorCode;
import com.followfollowme.tripmarble.domainlayer.game.application.exception.TripGameException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MissionResult {
    SUCCESS("성공") {
        @Override
        public void validateChangeable() {
            throw new TripGameException(TripGameErrorCode.MISSION_ALREADY_PROCESSED);
        }
    },
    SKIPPED("넘어감") {
        @Override
        public void validateChangeable() {
            throw new TripGameException(TripGameErrorCode.MISSION_ALREADY_PROCESSED);
        }
    },
    FAILED("실패") {
        @Override
        public void validateChangeable() {
            throw new TripGameException(TripGameErrorCode.MISSION_ALREADY_PROCESSED);
        }
    },
    PENDING("대기중") {
        @Override
        public void validateChangeable() {
            // 가능 -> 아무것도 안함
        }
    };

    private final String description;

    // 미션 상태 변경이 가능한지 검증
    public abstract void validateChangeable();
}
