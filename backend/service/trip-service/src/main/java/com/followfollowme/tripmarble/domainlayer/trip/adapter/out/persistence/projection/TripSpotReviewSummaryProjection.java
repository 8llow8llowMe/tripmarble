package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection;

public record TripSpotReviewSummaryProjection(
    long totalCount,
    double averageRating
) {

}
