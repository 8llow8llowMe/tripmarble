package com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record AuthLoginResponse(
    String accessToken,
    long memberId
) {

}
