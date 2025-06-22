package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record TripSpotSimpleResponse(
    long tripSpotId,
    int contentId,
    String title,
    String thumbnailImage
) {
}
