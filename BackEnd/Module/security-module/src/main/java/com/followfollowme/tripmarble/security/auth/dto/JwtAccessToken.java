package com.followfollowme.tripmarble.security.auth.dto;

import lombok.Builder;

@Builder
public record JwtAccessToken(
    String accessToken
) {

}
