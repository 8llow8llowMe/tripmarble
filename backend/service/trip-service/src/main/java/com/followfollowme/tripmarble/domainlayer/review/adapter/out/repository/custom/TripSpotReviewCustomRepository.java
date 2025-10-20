package com.followfollowme.tripmarble.domainlayer.review.adapter.out.repository.custom;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.projection.TripSpotReviewPhotoProjection;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.projection.TripSpotReviewRatingDistributionProjection;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.projection.TripSpotReviewSummaryProjection;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import com.followfollowme.tripmarble.persistence.enums.OrderType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Slice;

public interface TripSpotReviewCustomRepository {

    Optional<TripSpotReviewSummaryProjection> findSummaryByTripSpotId(long tripSpotId, ReviewSourceType sourceType);

    List<TripSpotReviewRatingDistributionProjection> findRatingDistributionByTripSpotId(long tripSpotId, ReviewSourceType sourceType);

    List<TripSpotReviewPhotoProjection> findSamplePhotosByTripSpotId(long tripSpotId, ReviewSourceType sourceType, int limit);

    Slice<TripSpotReviewEntity> findReviewsNoOffsetByTripSpotId(long tripSpotId, ReviewSourceType sourceType, long lastReviewId, int size, OrderType orderType);

    Slice<TripSpotReviewEntity> findReviewsNoOffsetByMemberId(long memberId, ReviewSourceType sourceType, long lastReviewId, int size, OrderType orderType);
}
