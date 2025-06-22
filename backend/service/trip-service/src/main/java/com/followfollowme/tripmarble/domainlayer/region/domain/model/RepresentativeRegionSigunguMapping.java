package com.followfollowme.tripmarble.domainlayer.region.domain.model;

import lombok.Builder;

@Builder
public record RepresentativeRegionSigunguMapping(
    long id,
    long representativeRegionId,
    long sigunguId
) {
}
