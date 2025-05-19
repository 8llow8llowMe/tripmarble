package com.followfollowme.tripmarble.core.auth.application.service;

import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.core.auth.adapter.out.persistence.external.oauth.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.core.auth.application.port.out.OAuthMemberFetcher;
import com.followfollowme.tripmarble.core.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.core.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthLoginProcessor {

    private final OAuthMemberFetcher oAuthMemberFetcher;
    private final MemberRepositoryPort memberRepositoryPort;
    private final TokenService tokenService;

    public AuthLoginResponse login(OAuthProvider provider, String authCode) {
        Member oAuthMember = oAuthMemberFetcher.fetchMember(provider, authCode);
        Member member = findOrCreateMember(provider, oAuthMember);
        return tokenService.issueTokens(member.id(), member.role());
    }

    private Member findOrCreateMember(OAuthProvider provider, Member oAuthMember) {
        return memberRepositoryPort.findByEmail(oAuthMember.email())
            .map(existing -> validateExistingProvider(existing, provider))
            .orElseGet(() -> memberRepositoryPort.save(oAuthMember));
    }

    private Member validateExistingProvider(Member existing, OAuthProvider provider) {
        if (!existing.provider().equals(provider)) {
            throw new IllegalArgumentException(
                "다른 방식으로 이미 가입된 계정입니다: " + existing.provider()
            );
        }
        return existing;
    }
}
