package com.followfollowme.tripmarble.domainlayer.trip.domain.model;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.enums.ReviewSourceType;
import lombok.Builder;

@Builder
public record TripSpotReview(
    long id,
    long tripSpotId,
    long memberId,
    String content,
    double rating,
    ReviewSourceType sourceType
) {
}
