package com.followfollowme.tripmarble.domainlayer.game.application.command;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateRequest;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import java.time.LocalDate;
import lombok.Builder;

@Builder
public record TripGameCreateCommand(
    String title,
    Difficulty difficulty,
    LocalDate startedAt,
    LocalDate endedAt,
    long representativeRegionId,
    long tripThemeId
) {

    public static TripGameCreateCommand from(TripGameCreateRequest request) {
        return TripGameCreateCommand.builder()
            .title(request.title())
            .difficulty(request.difficulty())
            .startedAt(request.startedAt())
            .endedAt(request.endedAt())
            .representativeRegionId(request.representativeRegionId())
            .tripThemeId(request.tripThemeId())
            .build();
    }
}
