package com.followfollowme.tripmarble.domainlayer.theme.domain.model;

import lombok.Builder;

@Builder
public record TripThemeContentTypeMapping(
    long id,
    long tripThemeId,
    long tripContentTypeId
) {
}
