package com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.Builder;

@Builder
public record MemberMyInfoResponse(
    Long id,
    String email,
    String name,
    String nickname,
    String profileImage,
    SecurityRole role,
    OAuthProvider provider
) {

}
