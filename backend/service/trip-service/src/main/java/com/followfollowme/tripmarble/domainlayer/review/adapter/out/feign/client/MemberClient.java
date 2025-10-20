package com.followfollowme.tripmarble.domainlayer.review.adapter.out.feign.client;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.feign.dto.MemberProfileInternalResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
    name = "${feign-client.target-services.auth-service:auth-service}",
    contextId = "memberClient",
    path = "/internal/v1/members"
)
public interface MemberClient {

    @GetMapping("/{memberId}")
    MemberProfileInternalResponse getMemberProfile(@PathVariable long memberId);
}
