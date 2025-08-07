package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotRandomResponse;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
    name = "${feign-client.target-services.trip-service:trip-service}",
    contextId = "tripSpotClient",
    path = "/internal/v1/trip-spots"
)
public interface TripSpotClient {

    @GetMapping("/by-representative-region/{representativeRegionId}/random")
    List<TripSpotRandomResponse> getRandomTripSpots(
        @PathVariable long representativeRegionId, @RequestParam List<Integer> contentTypeIds,
        @RequestParam(defaultValue = "10") int limit);
}
