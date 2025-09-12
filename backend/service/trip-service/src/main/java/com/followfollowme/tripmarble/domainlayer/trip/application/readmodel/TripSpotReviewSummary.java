package com.followfollowme.tripmarble.domainlayer.trip.application.readmodel;

import java.util.List;
import lombok.Builder;

@Builder
public record TripSpotReviewSummary(
    long totalCount,
    double averageRating,
    List<TripSpotReviewRatingDistribution> ratingDistributions,
    List<TripSpotReviewPhoto> samplePhotos
) {

    @Builder
    public record TripSpotReviewRatingDistribution(
        double rating,
        long count
    ) {

    }

    @Builder
    public record TripSpotReviewPhoto(
        long tripSpotReviewPhotoId,
        String photoUrl
    ) {

    }
}
