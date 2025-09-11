package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client.TripSpotReviewClient;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotReviewCreateInternalRequest;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotReviewCreateInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripSpotReviewClientPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripSpotReviewClientAdapter implements TripSpotReviewClientPort {

    private final TripSpotReviewClient tripSpotReviewClient;

    @Override
    public TripSpotReviewCreateInternalResponse createTripSpotReview(long tripSpotId, TripSpotReviewCreateInternalRequest request) {
        return tripSpotReviewClient.createTripSpotReview(tripSpotId, request);
    }
}
