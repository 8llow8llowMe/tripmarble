package com.followfollowme.tripmarble.domainlayer.auth.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthErrorCode;
import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthException;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.OAuthMemberFetcher;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthLoginProcessor {

    private final OAuthMemberFetcher oAuthMemberFetcher;
    private final MemberRepositoryPort memberRepositoryPort;
    private final JwtTokenProcessor jwtTokenProcessor;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    public AuthLoginResponse login(OAuthProvider provider, String authCode) {
        Member oAuthMember = oAuthMemberFetcher.fetchMember(provider, authCode);
        Member member = findOrCreateMember(provider, oAuthMember);
        return jwtTokenProcessor.issueTokens(member.id(), member.role());
    }

    private Member findOrCreateMember(OAuthProvider provider, Member oAuthMember) {
        return memberRepositoryPort.findByEmail(oAuthMember.email())
            .map(existing -> validateExistingProvider(existing, provider))
            .orElseGet(() -> createNewOAuthMember(oAuthMember));
    }

    private Member createNewOAuthMember(Member oAuthMember) {
        Member newMember = Member.builder()
            .id(snowflakeIdGenerator.generateId())
            .email(oAuthMember.email())
            .password(null)
            .name(oAuthMember.name())
            .nickname(oAuthMember.nickname())
            .profileImage(oAuthMember.profileImage())
            .role(SecurityRole.USER)
            .provider(oAuthMember.provider())
            .build();

        return memberRepositoryPort.save(newMember);
    }

    private Member validateExistingProvider(Member existing, OAuthProvider provider) {
        if (!existing.provider().equals(provider)) {
            throw new AuthException(AuthErrorCode.UNMATCHED_OAUTH_PROVIDER, existing.provider().name());
        }
        return existing;
    }
}
