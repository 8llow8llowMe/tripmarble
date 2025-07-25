package com.followfollowme.tripmarble.domainlayer.auth.application.service;

import com.followfollowme.tripmarble.domainlayer.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.domainlayer.auth.application.port.out.JwtTokenStorePort;
import com.followfollowme.tripmarble.security.auth.jwt.JwtAuthProvider;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenProcessor {

    private final JwtAuthProvider jwtAuthProvider;
    private final JwtTokenStorePort jwtTokenStorePort;

    public AuthLoginResponse issueTokens(long memberId, SecurityRole role) {
        String accessToken = jwtAuthProvider.issueAccessToken(memberId, role);
        String refreshToken = jwtAuthProvider.issueRefreshToken();

        try {
            jwtTokenStorePort.save(memberId, refreshToken);
        } catch (RedisConnectionFailureException e) {
            log.warn("Redis 연결 실패, RefreshToken 저장 안됨: {}", e.getMessage());
        }
        return AuthLoginResponse.builder()
            .accessToken(accessToken)
            .memberId(memberId)
            .build();
    }

    public void revoke(long memberId) {
        jwtTokenStorePort.find(memberId).ifPresent(token -> jwtTokenStorePort.delete(memberId));
    }
}
