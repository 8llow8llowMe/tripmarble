package com.followfollowme.tripmarble.core.auth.application.service;

import com.followfollowme.tripmarble.core.auth.adapter.in.web.dto.AuthLoginResponse;
import com.followfollowme.tripmarble.core.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.core.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.core.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CredentialLoginProcessor {

    private final MemberRepositoryPort memberRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthLoginResponse login(AuthLoginCommand command) {
        Member member = memberRepositoryPort.findByEmail(command.email())
            .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."));

        if (!passwordEncoder.matches(command.password(), member.password())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return tokenService.issueTokens(member.id(), member.role());
    }
}
