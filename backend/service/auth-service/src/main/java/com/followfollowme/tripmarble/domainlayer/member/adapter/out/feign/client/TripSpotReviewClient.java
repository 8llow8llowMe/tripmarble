package com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripSpotReviewCountInternalResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
    name = "${feign-client.target-services.trip-service:trip-service}",
    contextId = "tripSpotReviewCountClinet",
    path = "/internal/v1/trip-spot-reviews"
)
public interface TripSpotReviewClient {

    @GetMapping("/members/{memberId}/count")
    TripSpotReviewCountInternalResponse getMyTripSpotReviewAndPhotoCount(@PathVariable long memberId);
}
