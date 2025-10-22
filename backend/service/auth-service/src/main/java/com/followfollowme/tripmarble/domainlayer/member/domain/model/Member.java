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
        return withStatus(MemberStatus.WITHDRAWN, this.email, this.password, "탈퇴회원", "탈퇴회원", null);
    }

    public Member restore(String newName, String newNickname) {
        this.status.validateRestorable();
        return withStatus(MemberStatus.ACTIVE, this.email, this.password, newName, newNickname, this.profileImageUrl);
    }

    public Member suspend() {
        return withStatus(MemberStatus.SUSPENDED, this.email, this.password, this.name, this.nickname, this.profileImageUrl);
    }

    private Member withStatus(
        MemberStatus newStatus, String email, String password, String name, String nickname, String profileImageUrl) {
        return Member.builder()
            .id(this.id)
            .email(email)
            .password(password)
            .name(name)
            .nickname(nickname)
            .profileImageUrl(profileImageUrl)
            .role(this.role)
            .provider(this.provider)
            .status(newStatus)
            .build();
    }

    public Member withProvider(OAuthProvider newProvider) {
        return Member.builder()
            .id(this.id)
            .email(this.email)
            .password(this.password)
            .name(this.name)
            .nickname(this.nickname)
            .profileImageUrl(this.profileImageUrl)
            .role(this.role)
            .provider(newProvider)
            .status(this.status)
            .build();
    }
}
