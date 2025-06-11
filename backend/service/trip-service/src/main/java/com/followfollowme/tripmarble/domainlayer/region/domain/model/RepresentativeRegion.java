package com.followfollowme.tripmarble.domainlayer.region.domain.model;

import lombok.Builder;

@Builder
public record RepresentativeRegion(
    Long id,
    String name,
    String imageUrl,
    Long regionId,
    Long sigunguId
) {
}
