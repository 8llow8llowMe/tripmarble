package com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripGameCountInternalResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
    name = "${feign-client.target-services.trip-game-service:trip-game-service}",
    contextId = "tripGameClient",
    path = "/internal/v1/trip-games"
)
public interface TripGameClient {

    @GetMapping("/members/{memberId}/count")
    TripGameCountInternalResponse getTripGameCountByMember(@PathVariable long memberId);
}
