package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record RegionResponse(
    long regionId,
    int regionCode,
    String regionName
) {
}
