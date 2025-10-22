package com.followfollowme.tripmarble.domainlayer.auth.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.auth.application.command.AuthLoginCommand;
import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthErrorCode;
import com.followfollowme.tripmarble.domainlayer.auth.application.exception.AuthException;
import com.followfollowme.tripmarble.domainlayer.auth.application.info.CredentialLoginInfo;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CredentialLoginProcessor {

    private final MemberRepositoryPort memberRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProcessor jwtTokenProcessor;

    public CredentialLoginInfo login(AuthLoginCommand command) {
        // 1. 이메일 기반 회원 조회
        Member member = memberRepositoryPort.findByEmail(command.email())
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 2. 회원 상태 검증 (탈퇴/정지)
        switch (member.status()) {
            case WITHDRAWN -> throw new MemberException(MemberErrorCode.MEMBER_ALREADY_WITHDRAWN);
            case SUSPENDED -> throw new MemberException(MemberErrorCode.MEMBER_SUSPENDED);
        }

        // 3. 소셜 로그인 전용 계정 접근 방어
        if (member.provider() != null) {
            throw new AuthException(AuthErrorCode.UNSUPPORTED_LOGIN_METHOD, member.provider().getDescription());
        }

        // 4. 비밀번호 일치 여부 검증
        if (!passwordEncoder.matches(command.password(), member.password())) {
            throw new MemberException(MemberErrorCode.NOT_MATCH_PASSWORD);
        }

        return CredentialLoginInfo.of(member.id(), member.role());
    }
}
