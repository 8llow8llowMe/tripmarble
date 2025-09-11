package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;

import java.util.Optional;

public interface TripSpotReviewRepositoryPort {

    TripSpotReview save(TripSpotReview tripSpotReview, TripSpot tripSpot);

    Optional<TripSpotReview> findById(long tripSpotReviewId);

    Optional<Double> findAverageRatingByTripSpotId(long tripSpotId);
}
