package com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.repository.custom;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.projection.TripSpotReviewPhotoProjection;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.projection.TripSpotReviewRatingDistributionProjection;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.projection.TripSpotReviewSummaryProjection;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import com.followfollowme.tripmarble.persistence.enums.OrderType;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.Optional;

public interface TripSpotReviewCustomRepository {

    Optional<TripSpotReviewSummaryProjection> findSummaryByTripSpotId(long tripSpotId, ReviewSourceType sourceType);

    List<TripSpotReviewRatingDistributionProjection> findRatingDistributionByTripSpotId(long tripSpotId, ReviewSourceType sourceType);

    List<TripSpotReviewPhotoProjection> findSamplePhotosByTripSpotId(long tripSpotId, ReviewSourceType sourceType, int limit);

    Slice<TripSpotReviewEntity> findReviewsNoOffsetByTripSpotId(long tripSpotId, ReviewSourceType sourceType, long lastReviewId, int size, OrderType orderType);

    Slice<TripSpotReviewEntity> findReviewsNoOffsetByMemberId(long memberId, ReviewSourceType sourceType, long lastReviewId, int size, OrderType orderType);
}
