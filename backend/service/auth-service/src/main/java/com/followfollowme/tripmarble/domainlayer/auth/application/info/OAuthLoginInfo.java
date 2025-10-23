package com.followfollowme.tripmarble.domainlayer.auth.application.info;

import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.Builder;

@Builder
public record OAuthLoginInfo(
    long memberId,
    SecurityRole role
) {

    public static OAuthLoginInfo of(long memberId, SecurityRole role) {
        return OAuthLoginInfo.builder()
            .memberId(memberId)
            .role(role)
            .build();
    }
}
