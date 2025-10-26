package com.followfollowme.tripmarble.domainlayer.region.domain.model;

import lombok.Builder;

@Builder
public record RepresentativeRegion(
    long id,
    String name,
    String imageUrl,
    String description,
    double latitude,
    double longitude,
    String boundaryGeoJson
) {

}
