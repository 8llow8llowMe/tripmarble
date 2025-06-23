package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record TripSpotWithDetailViewResponse(
    long tripSpotId,
    String contentTypeName,
    String homepageUrl,
    String overview
) {

}
