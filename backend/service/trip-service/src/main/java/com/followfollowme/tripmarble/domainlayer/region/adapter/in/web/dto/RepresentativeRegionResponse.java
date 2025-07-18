package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record RepresentativeRegionResponse(
    long representativeRegionId,
    String representativeRegionName,
    String imageUrl,
    String description
) {

}
