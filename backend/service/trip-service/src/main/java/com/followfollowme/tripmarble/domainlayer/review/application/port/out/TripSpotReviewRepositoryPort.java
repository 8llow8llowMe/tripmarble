package com.followfollowme.tripmarble.domainlayer.review.application.port.out;

import com.followfollowme.tripmarble.domainlayer.review.application.readmodel.TripSpotReviewSummary;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.util.Optional;
import org.springframework.data.domain.Slice;

public interface TripSpotReviewRepositoryPort {

    TripSpotReview save(TripSpotReview tripSpotReview, TripSpot tripSpot);

    Optional<TripSpotReview> findById(long tripSpotReviewId);

    TripSpotReviewSummary findSummaryByTripSpotId(long tripSpotId, int photoLimit);

    Slice<TripSpotReview> findReviewsNoOffsetByTripSpotId(long tripSpotId, long lastTripSpotReviewId, int size);
}
