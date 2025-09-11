package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.MissionResult;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record TripGameMoveLog(
    long id,
    long tripGameTileId,
    long tripGameMemberId,
    LocalDateTime arrivedAt,
    int dice,
    int turnOrder,
    MissionResult missionResult,
    LocalDateTime missionProcessedAt,
    Long missionReferenceId
) {

    public TripGameMoveLog updateMissionResultWithReference(MissionResult result, Long referenceId) {
        this.missionResult.validateChangeable(); // 상태 전환 가능 여부 검증

        LocalDateTime processedAt = switch (result) {
            case SUCCESS, FAILED -> LocalDateTime.now(); // 성공/실패는 처리 시각 기록
            case SKIPPED, GAME_END -> null; // 스킵/게임 종료는 기록하지 않음
            case PENDING -> this.missionProcessedAt; // 대기 상태는 기존 값 유지
        };

        return TripGameMoveLog.builder()
            .id(this.id)
            .tripGameTileId(this.tripGameTileId)
            .tripGameMemberId(this.tripGameMemberId)
            .arrivedAt(this.arrivedAt)
            .dice(this.dice)
            .turnOrder(this.turnOrder)
            .missionResult(result)
            .missionProcessedAt(processedAt)
            .missionReferenceId(referenceId)
            .build();
    }
}
