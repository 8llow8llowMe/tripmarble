package com.followfollowme.tripmarble.domainlayer.member.domain.model;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.enums.MemberStatus;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.Builder;

@Builder
public record Member(
    Long id,
    String email,
    String password,
    String name,
    String nickname,
    String profileImageUrl,
    SecurityRole role,
    OAuthProvider provider,
    MemberStatus status
) {

    public Member withdraw() {
        this.status.validateWithdrawable();
        return Member.builder()
            .id(this.id)
            .email(this.email)
            .password(this.password)
            .name("탈퇴회원")
            .nickname("탈퇴회원")
            .profileImageUrl(null)
            .role(this.role)
            .provider(this.provider)
            .status(MemberStatus.WITHDRAWN)
            .build();
    }

    public Member restore(String newName, String newNickname) {
        this.status.validateRestorable();
        return Member.builder()
            .id(this.id)
            .email(this.email)
            .password(this.password)
            .name(newName)
            .nickname(newNickname)
            .profileImageUrl(this.profileImageUrl)
            .role(this.role)
            .provider(this.provider)
            .status(MemberStatus.ACTIVE)
            .build();
    }

    public Member suspend() {
        return Member.builder()
            .id(this.id)
            .email(this.email)
            .password(this.password)
            .name(this.name)
            .nickname(this.nickname)
            .profileImageUrl(this.profileImageUrl)
            .role(this.role)
            .provider(this.provider)
            .status(MemberStatus.SUSPENDED)
            .build();
    }
}
