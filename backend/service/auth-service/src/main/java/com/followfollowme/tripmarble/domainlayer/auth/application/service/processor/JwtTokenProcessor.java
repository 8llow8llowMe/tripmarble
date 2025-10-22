package com.followfollowme.tripmarble.domainlayer.auth.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthErrorCode;
import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthException;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.JwtTokenIssueInfo;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.JwtTokenReissueInfo;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.JwtTokenStorePort;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.redis.exception.RedisInfraException;
import com.followfollowme.tripmarble.security.auth.jwt.JwtAuthProvider;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenProcessor {

    private final JwtAuthProvider jwtAuthProvider;
    private final JwtTokenStorePort jwtTokenStorePort;
    private final MemberRepositoryPort memberRepositoryPort;

    public JwtTokenIssueInfo issueTokens(long memberId, SecurityRole role) {
        String accessToken = jwtAuthProvider.issueAccessToken(memberId, role);
        String refreshToken = jwtAuthProvider.issueRefreshToken();

        try {
            jwtTokenStorePort.save(memberId, refreshToken);
        } catch (RedisInfraException e) {
            log.warn("Redis 연결 실패, RefreshToken 저장 안됨: {}", e.getMessage());
        }

        return JwtTokenIssueInfo.of(memberId, role, accessToken);
    }

    public void revoke(long memberId) {
        jwtTokenStorePort.find(memberId).ifPresent(token -> jwtTokenStorePort.delete(memberId));
    }

    public JwtTokenReissueInfo reissueTokens(long memberId) {
        try {
            jwtTokenStorePort.find(memberId)
                .orElseThrow(() -> new AuthException(AuthErrorCode.EXPIRED_REFRESH_TOKEN));
        } catch (RedisInfraException e) {
            throw new AuthException(AuthErrorCode.TOKEN_REISSUE_FAILURE);
        }

        Member member = memberRepositoryPort.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        String newAccessToken = jwtAuthProvider.issueAccessToken(member.id(), member.role());
        String newRefreshToken = jwtAuthProvider.issueRefreshToken();

        try {
            jwtTokenStorePort.save(member.id(), newRefreshToken);
        } catch (RedisInfraException e) {
            log.warn("Redis 연결 실패, RefreshToken 저장 안됨: {}", e.getMessage());
        }

        return JwtTokenReissueInfo.of(newAccessToken);
    }
}
