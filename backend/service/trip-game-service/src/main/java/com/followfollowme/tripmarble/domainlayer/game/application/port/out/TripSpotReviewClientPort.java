package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotReviewCreateInternalRequest;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotReviewCreateInternalResponse;

public interface TripSpotReviewClientPort {

    TripSpotReviewCreateInternalResponse createTripSpotReview(TripSpotReviewCreateInternalRequest request);
}
