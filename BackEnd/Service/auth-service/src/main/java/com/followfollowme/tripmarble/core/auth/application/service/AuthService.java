package com.followfollowme.tripmarble.core.auth.application.service;

import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.core.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.core.auth.application.port.in.AuthUseCase;
import com.followfollowme.tripmarble.core.auth.application.port.out.TokenStorePort;
import com.followfollowme.tripmarble.core.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.core.member.domain.model.Member;
import com.followfollowme.tripmarble.security.auth.jwt.JwtAuthProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService implements AuthUseCase {

    private final MemberRepositoryPort memberRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthProvider jwtAuthProvider;
    private final TokenStorePort tokenStorePort;

    @Override
    public AuthLoginResponse loginAuth(AuthLoginCommand command) {
        Member member = memberRepositoryPort.findByEmail(command.email())
            .orElseThrow(() -> new RuntimeException("회원정보가 존재하지 않습니다."));

        if (!passwordEncoder.matches(command.password(), member.password())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String accessToken = jwtAuthProvider.issueAccessToken(member.id(), member.role());
        String refreshToken = jwtAuthProvider.issueRefreshToken();

        try {
            tokenStorePort.save(member.id(), refreshToken);
        } catch (RedisConnectionFailureException e) {
            log.warn("Redis 연결 실패 - RefreshToken 저장 안됨", e);
        }

        return AuthLoginResponse.builder()
            .accessToken(accessToken)
            .memberId(member.id())
            .build();
    }
}
