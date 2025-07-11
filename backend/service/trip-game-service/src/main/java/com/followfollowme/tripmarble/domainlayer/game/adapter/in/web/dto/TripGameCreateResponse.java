package com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto;

import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import java.time.LocalDate;
import lombok.Builder;

@Builder
public record TripGameCreateResponse(
    long tripGameId,
    Difficulty difficulty,
    LocalDate startedAt,
    LocalDate endedAt,
    String representativeRegionName,
    String tripThemeName
) {

}
