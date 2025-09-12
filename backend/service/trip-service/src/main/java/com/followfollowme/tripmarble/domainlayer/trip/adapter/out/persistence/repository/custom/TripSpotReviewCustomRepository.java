package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewPhotoProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewRatingDistributionProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewSummaryProjection;
import java.util.List;
import java.util.Optional;

public interface TripSpotReviewCustomRepository {

    Optional<TripSpotReviewSummaryProjection> findSummaryByTripSpotId(long tripSpotId);

    List<TripSpotReviewRatingDistributionProjection> findRatingDistributionByTripSpotId(long tripSpotId);

    List<TripSpotReviewPhotoProjection> findSamplePhotosByTripSpotId(long tripSpotId, int limit);
}
