package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewPhotoProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewRatingDistributionProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewSummaryProjection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Slice;

public interface TripSpotReviewCustomRepository {

    Optional<TripSpotReviewSummaryProjection> findSummaryByTripSpotId(long tripSpotId);

    List<TripSpotReviewRatingDistributionProjection> findRatingDistributionByTripSpotId(long tripSpotId);

    List<TripSpotReviewPhotoProjection> findSamplePhotosByTripSpotId(long tripSpotId, int limit);

    Slice<TripSpotReviewEntity> findReviewsNoOffsetByTripSpotId(long tripSpotId, long lastReviewId, int size);
}
