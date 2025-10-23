package com.followfollowme.tripmarble.domainlayer.member.application.info;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.Builder;

@Builder
public record MemberMyInfo(
    long memberId,
    String email,
    String name,
    String nickname,
    String profileImageUrl,
    SecurityRole role,
    OAuthProvider provider
) {

    public static MemberMyInfo of(Member member) {
        return MemberMyInfo.builder()
            .memberId(member.id())
            .email(member.email())
            .name(member.name())
            .nickname(member.nickname())
            .profileImageUrl(member.profileImageUrl())
            .role(member.role())
            .provider(member.provider())
            .build();
    }
}
