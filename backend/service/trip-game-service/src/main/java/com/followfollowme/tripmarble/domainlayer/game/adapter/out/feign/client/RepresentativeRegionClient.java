package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoInternalResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
    name = "${feign-client.target-services.trip-service:trip-service}",
    contextId = "representativeRegionClient",
    path = "/internal/v1/regions/representative"
)
public interface RepresentativeRegionClient {

    @GetMapping("/{representativeRegionId}")
    RepresentativeRegionInfoInternalResponse getRepresentativeRegionInfo(@PathVariable long representativeRegionId);
}
