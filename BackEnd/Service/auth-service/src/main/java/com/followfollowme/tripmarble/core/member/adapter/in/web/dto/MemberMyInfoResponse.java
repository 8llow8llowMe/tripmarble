package com.followfollowme.tripmarble.core.member.adapter.in.web.dto;

import com.followfollowme.tripmarble.core.member.domain.model.Member;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.Builder;

@Builder
public record MemberMyInfoResponse(
    Long id,
    String email,
    String name,
    String nickname,
    String profileImage,
    SecurityRole role
) {

    public static MemberMyInfoResponse from(Member member) {
        return MemberMyInfoResponse.builder()
            .id(member.id())
            .email(member.email())
            .name(member.name())
            .nickname(member.nickname())
            .profileImage(member.profileImage())
            .role(member.role())
            .build();
    }
}
