package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.kakao.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import java.time.LocalDateTime;

@JsonNaming(SnakeCaseStrategy.class)
public record KakaoMemberResponse(
    long id,
    boolean hasSignedUp,
    LocalDateTime connectedAt,
    KakaoAccount kakaoAccount
) {

    public Member toDomain() {
        return Member.builder()
            .email(kakaoAccount.email())
            .name(kakaoAccount.name())
            .nickname(kakaoAccount.profile().nickname())
            .profileImageUrl(kakaoAccount.profile().profileImageUrl())
            .role(SecurityRole.USER)
            .provider(OAuthProvider.KAKAO)
            .build();
    }
}
