package com.followfollowme.tripmarble.domainlayer.game.application.command;

import com.followfollowme.tripmarble.domainlayer.game.adapter.in.web.dto.TripGameCreateRequest;
import com.followfollowme.tripmarble.domainlayer.game.domain.model.enums.Difficulty;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record TripGameCreateCommand(
    String title,
    Difficulty difficulty,
    LocalDate startedAt,
    LocalDate endedAt,
    long representativeRegionId,
    List<Long> tripThemeIds,
    long memberId
) {

    public static TripGameCreateCommand from(TripGameCreateRequest request, long memberId) {
        return TripGameCreateCommand.builder()
            .title(request.title())
            .difficulty(request.difficulty())
            .startedAt(request.startedAt())
            .endedAt(request.endedAt())
            .representativeRegionId(request.representativeRegionId())
            .tripThemeIds(request.tripThemeIds())
            .memberId(memberId)
            .build();
    }
}
