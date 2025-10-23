package com.followfollowme.tripmarble.domainlayer.auth.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.out.external.vendor.enums.OAuthProvider;
import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthErrorCode;
import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthException;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.OAuthLoginInfo;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.OAuthMemberFetcher;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.enums.MemberStatus;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthLoginProcessor {

    private final OAuthMemberFetcher oAuthMemberFetcher;
    private final MemberRepositoryPort memberRepositoryPort;
    private final JwtTokenProcessor jwtTokenProcessor;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    public OAuthLoginInfo login(OAuthProvider provider, String authCode) {
        // 1. provider로부터 사용자 정보 조회
        Member oAuthMember = oAuthMemberFetcher.fetchMember(provider, authCode);

        // 2. 기존 회원 조회 또는 신규 생성
        Member member = findOrCreateMember(provider, oAuthMember);

        // 3. 로그인 정보 반환
        return OAuthLoginInfo.of(member.id(), member.role());
    }

    private Member findOrCreateMember(OAuthProvider provider, Member oAuthMember) {
        return memberRepositoryPort.findByEmail(oAuthMember.email())
            .map(existing -> {
                // 상태 먼저 확인
                switch (existing.status()) {
                    case WITHDRAWN -> throw new MemberException(MemberErrorCode.MEMBER_ALREADY_WITHDRAWN, oAuthMember.email());
                    case SUSPENDED -> throw new MemberException(MemberErrorCode.MEMBER_SUSPENDED, oAuthMember.email());
                }
                // 소셜 로그인 제공업체 검증
                return validateExistingProvider(existing, provider);
            })
            .orElseGet(() -> createNewOAuthMember(oAuthMember));
    }

    private Member createNewOAuthMember(Member oAuthMember) {
        Member newMember = Member.builder()
            .id(snowflakeIdGenerator.generateId())
            .email(oAuthMember.email())
            .password(null)
            .name(oAuthMember.name())
            .nickname(oAuthMember.nickname())
            .profileImageUrl(oAuthMember.profileImageUrl())
            .role(SecurityRole.USER)
            .provider(oAuthMember.provider())
            .status(MemberStatus.ACTIVE)
            .build();

        return memberRepositoryPort.save(newMember);
    }

    private Member validateExistingProvider(Member existing, OAuthProvider provider) {
        // 기존 provider가 null인 경우 (일반 사용자 계정) -> 소셜 계정으로 자동 전환
        if (existing.provider() == null) {
            log.info("회원 [{}] 일반 사용자에서 소셜 로그인으로 전환: {}", existing.email(), provider);
            Member updated = existing.withProvider(provider);
            return memberRepositoryPort.save(updated);
        }

        // 이미 다른 소셜(provider)이면 차단 (ex. 기존 kakao -> naver 로그인 시도)
        if (!existing.provider().equals(provider)) {
            throw new AuthException(AuthErrorCode.UNMATCHED_OAUTH_PROVIDER, existing.provider().name());
        }
        return existing;
    }
}
