package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Status;
import java.time.LocalDate;
import lombok.Builder;

@Builder
public record TripGame(
    long id,
    String title,
    Status status,
    Difficulty difficulty,
    LocalDate startedAt,
    LocalDate endedAt,
    long representativeRegionId
) {

    public TripGame start() {
        if (this.status != Status.WAITING) {
            throw new IllegalStateException("게임은 대기 상태에서만 시작할 수 있습니다.");
        }
        return TripGame.builder()
            .id(this.id)
            .title(this.title)
            .status(Status.ONGOING)
            .difficulty(this.difficulty)
            .startedAt(LocalDate.now())
            .endedAt(null)
            .representativeRegionId(this.representativeRegionId)
            .build();
    }

    public TripGame end() {
        return TripGame.builder()
            .id(this.id)
            .title(this.title)
            .status(Status.ENDED)
            .difficulty(this.difficulty)
            .startedAt(this.startedAt)
            .endedAt(LocalDate.now())
            .representativeRegionId(this.representativeRegionId)
            .build();
    }
}
