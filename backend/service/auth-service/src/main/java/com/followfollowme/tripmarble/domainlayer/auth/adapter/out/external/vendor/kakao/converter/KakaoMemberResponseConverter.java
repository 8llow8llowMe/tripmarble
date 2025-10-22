package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.kakao.converter;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.kakao.dto.KakaoMemberResponse;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KakaoMemberResponseConverter {

    @Value("${spring.profiles.active}")
    private String activeProfile;

    public Member toDomain(KakaoMemberResponse response) {
        String name = resolveName(response);
        return Member.builder()
            .email(response.kakaoAccount().email())
            .name(name)
            .nickname(response.kakaoAccount().profile().nickname())
            .profileImageUrl(response.kakaoAccount().profile().profileImageUrl())
            .role(SecurityRole.USER)
            .provider(OAuthProvider.KAKAO)
            .build();
    }

    private String resolveName(KakaoMemberResponse response) {
        boolean isProd = "prod".equalsIgnoreCase(activeProfile)
            || "production".equalsIgnoreCase(activeProfile);
        return isProd
            ? response.kakaoAccount().profile().nickname()
            : response.kakaoAccount().name();
    }
}
