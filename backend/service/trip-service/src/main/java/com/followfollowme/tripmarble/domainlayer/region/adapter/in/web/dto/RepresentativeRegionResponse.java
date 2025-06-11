package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record RepresentativeRegionResponse(
    long id,
    String name,
    String imageUrl
) {

}
