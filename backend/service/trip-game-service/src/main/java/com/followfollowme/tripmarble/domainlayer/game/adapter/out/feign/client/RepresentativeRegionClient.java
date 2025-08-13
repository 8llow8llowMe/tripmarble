package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoInternalResponse;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
    name = "${feign-client.target-services.trip-service:trip-service}",
    contextId = "representativeRegionClient",
    path = "/internal/v1/regions/representative"
)
public interface RepresentativeRegionClient {

    @GetMapping("/{representativeRegionId}")
    RepresentativeRegionInfoInternalResponse getRepresentativeRegionInfo(@PathVariable long representativeRegionId);

    @GetMapping
    List<RepresentativeRegionInfoInternalResponse> getRepresentativeRegionsByIds(@RequestParam List<Long> representativeRegionIds);
}
