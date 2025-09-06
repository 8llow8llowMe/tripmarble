package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.EndType;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.GameStatus;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record TripGame(
    long id,
    long representativeRegionId,
    String title,
    GameStatus status,
    Difficulty difficulty,
    LocalDate startedAt,
    LocalDate endedAt,
    int currentTurnOrder,
    int currentStepNo,
    EndType endType
) {

    public TripGame start() {
        this.status.validateStartable(); // 상태에 위임
        return withStatus(GameStatus.ONGOING, null);
    }

    public void play() {
        this.status.validatePlayable();
    }

    public void resume() {
        this.status.validateResumable();
    }

    public TripGame normalEnd() {
        return endInternal(EndType.NORMAL);
    }

    public TripGame forceEnd() {
        return endInternal(EndType.FORCED);
    }

    public TripGame updateCurrentStepNo(int updatedStepNo) {
        return withStepAndTurn(updatedStepNo, this.currentTurnOrder);
    }

    public TripGame updateTurnAndStep(int updatedStepNo, int nextTurnOrder) {
        return withStepAndTurn(updatedStepNo, nextTurnOrder);
    }

    private TripGame withStatus(GameStatus newStatus, EndType endType) {
        return TripGame.builder()
            .id(this.id)
            .representativeRegionId(this.representativeRegionId)
            .title(this.title)
            .status(newStatus)
            .difficulty(this.difficulty)
            .startedAt(this.startedAt)
            .endedAt(this.endedAt)
            .currentTurnOrder(this.currentTurnOrder)
            .currentStepNo(this.currentStepNo)
            .endType(endType)
            .build();
    }

    private TripGame withStepAndTurn(int step, int turn) {
        return TripGame.builder()
            .id(this.id)
            .representativeRegionId(this.representativeRegionId)
            .title(this.title)
            .status(this.status)
            .difficulty(this.difficulty)
            .startedAt(this.startedAt)
            .endedAt(this.endedAt)
            .currentTurnOrder(turn)
            .currentStepNo(step)
            .endType(this.endType)
            .build();
    }

    private TripGame endInternal(EndType type) {
        this.status.validateEndable();
        return withStatus(GameStatus.ENDED, type);
    }
}
