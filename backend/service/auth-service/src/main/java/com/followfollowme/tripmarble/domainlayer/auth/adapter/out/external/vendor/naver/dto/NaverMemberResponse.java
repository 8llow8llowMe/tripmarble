package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;

@JsonNaming(SnakeCaseStrategy.class)
public record NaverMemberResponse(
    String resultCode,
    String message,
    NaverAccount response
) {

    public Member toDomain() {
        return Member.builder()
            .email(response.email())
            .name(response.name())
            .nickname(response.nickname())
            .profileImageUrl(response.profileImage())
            .role(SecurityRole.USER)
            .provider(OAuthProvider.NAVER)
            .build();
    }
}
