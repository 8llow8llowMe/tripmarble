package com.followfollowme.tripmarble.domainlayer.auth.application.info;

import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.Builder;

@Builder
public record CredentialLoginInfo(
    long memberId,
    SecurityRole role
) {

    public static CredentialLoginInfo of(long memberId, SecurityRole role) {
        return CredentialLoginInfo.builder()
            .memberId(memberId)
            .role(role)
            .build();
    }
}
