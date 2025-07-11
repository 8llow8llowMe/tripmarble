package com.followfollowme.tripmarble.domainlayer.game.domain.model;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import java.time.LocalDate;
import lombok.Builder;

@Builder
public record TripGame(
    long id,
    String title,
    Difficulty difficulty,
    LocalDate startedAt,
    LocalDate endedAt,
    long representativeRegionId,
    long tripThemeId
) {

}
