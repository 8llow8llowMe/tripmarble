package com.followfollowme.tripmarble.domainlayer.theme.domain.model;

import lombok.Builder;

@Builder
public record TripTheme(
    long id,
    String name
) {

}
