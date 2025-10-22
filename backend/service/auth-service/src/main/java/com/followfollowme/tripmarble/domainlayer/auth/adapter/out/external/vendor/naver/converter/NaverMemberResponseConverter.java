package com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.converter;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.dto.NaverAccount;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.naver.dto.NaverMemberResponse;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import org.springframework.stereotype.Component;

@Component
public class NaverMemberResponseConverter {

    public Member toDomain(NaverMemberResponse response) {
        NaverAccount account = response.response();
        return Member.builder()
            .email(account.email())
            .name(account.name())
            .nickname(account.nickname())
            .profileImageUrl(account.profileImage())
            .role(SecurityRole.USER)
            .provider(OAuthProvider.NAVER)
            .build();
    }
}
