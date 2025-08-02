package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripContentTypeInternalResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(
    name = "${feign-client.target-services.trip-service}",
    contextId = "tripContentTypeClient",
    path = "/internal/v1/trip-content-types"
)
public interface TripContentTypeClient {

    @GetMapping
    List<TripContentTypeInternalResponse> getTripContentTypes(@RequestParam List<Long> tripContentTypeIds);
}
