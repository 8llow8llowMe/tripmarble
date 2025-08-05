package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.MemberProfileResponse;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
    name = "${feign-client.target-services.auth-service}",
    contextId = "memberClient",
    path = "/internal/v1/members"
)
public interface MemberClient {

    @GetMapping
    List<MemberProfileResponse> getMemberProfiles(@RequestParam List<Long> memberIds);
}
