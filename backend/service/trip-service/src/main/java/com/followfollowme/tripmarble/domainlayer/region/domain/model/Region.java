package com.followfollowme.tripmarble.domainlayer.region.domain.model;

import lombok.Builder;

@Builder
public record Region(
    long id,
    int regionCode,
    String regionName
) {
}
