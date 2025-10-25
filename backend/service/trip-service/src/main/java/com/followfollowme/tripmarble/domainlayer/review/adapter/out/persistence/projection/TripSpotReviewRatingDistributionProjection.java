package com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.projection;

public record TripSpotReviewRatingDistributionProjection(
    double rating,
    long count
) {

}
