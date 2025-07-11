package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import java.time.LocalDate;

public record TripGameCreateRequest(
    String title,
    Difficulty difficulty,
    LocalDate startedAt,
    LocalDate endedAt,
    long representativeRegionId,
    long tripThemeId
) {

}
