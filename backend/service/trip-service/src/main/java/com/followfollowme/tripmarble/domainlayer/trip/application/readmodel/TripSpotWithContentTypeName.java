package com.followfollowme.tripmarble.domainlayer.trip.application.readmodel;

import lombok.Builder;

@Builder
public record TripSpotWithContentTypeName(
    long tripSpotId,
    String contentTypeName,
    String tripSpotName,
    double longitude,
    double latitude
) {

}
