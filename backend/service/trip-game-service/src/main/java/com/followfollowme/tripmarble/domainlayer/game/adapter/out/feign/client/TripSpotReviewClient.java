package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotReviewCreateInternalRequest;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotReviewCreateInternalResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
    name = "${feign-client.target-services.trip-service:trip-service}",
    contextId = "tripSpotReviewClient",
    path = "/internal/v1/trip-spots/reviews"
)
public interface TripSpotReviewClient {

    @PostMapping
    TripSpotReviewCreateInternalResponse createTripSpotReview(@RequestBody TripSpotReviewCreateInternalRequest request);
}
