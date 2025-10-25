package com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.projection;

public record TripSpotReviewSummaryProjection(
    long totalCount,
    double averageRating
) {

}
