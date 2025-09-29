package com.followfollowme.tripmarble.domainlayer.review.application.port.in;

import com.followfollowme.tripmarble.domainlayer.review.adapter.in.web.dto.TripSpotReviewAndPhotosResponse;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;
import com.followfollowme.tripmarble.persistence.enums.OrderType;

public interface MyReviewWebUseCase {

    SliceResponse<TripSpotReviewAndPhotosResponse> getMyTripSpotReviews(
        long memberId, long lastTripSpotReviewId, int size, OrderType orderType);
}
