package com.followfollowme.tripmarble.domainlayer.review.application.port.out;

import com.followfollowme.tripmarble.domainlayer.review.application.readmodel.TripSpotReviewSummary;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.persistence.enums.OrderType;
import java.util.Optional;
import org.springframework.data.domain.Slice;

public interface TripSpotReviewRepositoryPort {

    TripSpotReview save(TripSpotReview tripSpotReview, TripSpot tripSpot);

    Optional<TripSpotReview> findById(long tripSpotReviewId);

    TripSpotReviewSummary findSummaryByTripSpotId(long tripSpotId, ReviewSourceType sourceType, int photoLimit);

    Slice<TripSpotReview> findReviewsNoOffsetByTripSpotId(long tripSpotId, ReviewSourceType sourceType, long lastTripSpotReviewId, int size,
        OrderType orderType);

    Slice<TripSpotReview> findReviewsNoOffsetByMemberId(long memberId, ReviewSourceType sourceType, long lastTripSpotReviewId, int size,
        OrderType orderType);

    void deleteById(long tripSpotReviewId);

    int countByMemberId(long memberId);
}
