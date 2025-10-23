package com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(
    name = "${feign-client.target-services.trip-service:trip-service}",
    contextId = "tripSpotReviewCountClinet",
    path = "/internal/v1/trip-spot-reviews"
)
public interface TripSpotReviewClient {

}
