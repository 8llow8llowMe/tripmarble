package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection;

public record TripSpotReviewRatingDistributionProjection(
    double rating,
    long count
) {

}
