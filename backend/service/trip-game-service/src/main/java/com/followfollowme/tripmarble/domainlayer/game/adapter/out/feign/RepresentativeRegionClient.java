package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(
    name = "trip-service",
    contextId = "representativeRegionClient",
    path = "/internal/v1/regions/representative"
)
public interface RepresentativeRegionClient {

}
