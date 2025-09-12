package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotReviewSummary;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;
import java.util.Optional;

public interface TripSpotReviewRepositoryPort {

    TripSpotReview save(TripSpotReview tripSpotReview, TripSpot tripSpot);

    Optional<TripSpotReview> findById(long tripSpotReviewId);

    TripSpotReviewSummary findSummaryByTripSpotId(long tripSpotId, int photoLimit);
}
