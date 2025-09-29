package com.followfollowme.tripmarble.domainlayer.review.domain.model;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record TripSpotReviewPhoto(
    long id,
    long tripSpotReviewId,
    String photoUrl,
    int orderNo,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {

}
