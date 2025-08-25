package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record TripGame(
    long id,
    String title,
    Status status,
    Difficulty difficulty,
    LocalDate startedAt,
    LocalDate endedAt,
    int currentTurnOrder,
    int currentStepNo,
    long representativeRegionId
) {

    public TripGame start() {
        this.status.validateStartable(); // 상태에 위임

        return TripGame.builder()
            .id(this.id)
            .title(this.title)
            .status(Status.ONGOING)
            .difficulty(this.difficulty)
            .startedAt(this.startedAt)
            .endedAt(this.endedAt)
            .currentTurnOrder(this.currentTurnOrder)
            .currentStepNo(this.currentStepNo)
            .representativeRegionId(this.representativeRegionId)
            .build();
    }

    public TripGame end() {
        this.status.validateEndable(); // 상태에 위임

        return TripGame.builder()
            .id(this.id)
            .title(this.title)
            .status(Status.ENDED)
            .difficulty(this.difficulty)
            .startedAt(this.startedAt)
            .endedAt(this.endedAt)
            .currentTurnOrder(this.currentTurnOrder)
            .currentStepNo(this.currentStepNo)
            .representativeRegionId(this.representativeRegionId)
            .build();
    }

    public TripGame updateCurrentStepNo(int updatedStepNo) {
        return TripGame.builder()
            .id(this.id)
            .title(this.title)
            .status(this.status)
            .difficulty(this.difficulty)
            .startedAt(this.startedAt)
            .endedAt(this.endedAt)
            .currentTurnOrder(this.currentTurnOrder)
            .currentStepNo(updatedStepNo)
            .representativeRegionId(this.representativeRegionId)
            .build();
    }

    public TripGame updateTurnAndStep(int updatedStepNo, int nextTurnOrder) {
        return TripGame.builder()
            .id(this.id)
            .title(this.title)
            .status(this.status)
            .difficulty(this.difficulty)
            .startedAt(this.startedAt)
            .endedAt(this.endedAt)
            .currentTurnOrder(nextTurnOrder)
            .currentStepNo(updatedStepNo)
            .representativeRegionId(this.representativeRegionId)
            .build();
    }
}
