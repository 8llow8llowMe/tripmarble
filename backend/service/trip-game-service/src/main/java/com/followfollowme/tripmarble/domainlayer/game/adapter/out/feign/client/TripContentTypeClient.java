package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripContentTypeQueryInternalResponse;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
    name = "${feign-client.target-services.trip-service:trip-service}",
    contextId = "tripContentTypeClient",
    path = "/internal/v1/trip-content-types"
)
public interface TripContentTypeClient {

    @GetMapping
    List<TripContentTypeQueryInternalResponse> getTripContentTypes(@RequestParam List<Long> tripContentTypeIds);
}
