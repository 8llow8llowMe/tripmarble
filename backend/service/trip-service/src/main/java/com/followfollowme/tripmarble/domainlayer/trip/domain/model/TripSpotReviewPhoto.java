package com.followfollowme.tripmarble.domainlayer.trip.domain.model;

import lombok.Builder;

@Builder
public record TripSpotReviewPhoto(
    long id,
    long tripSpotReviewId,
    String photoUrl,
    int orderNo
) {
}
