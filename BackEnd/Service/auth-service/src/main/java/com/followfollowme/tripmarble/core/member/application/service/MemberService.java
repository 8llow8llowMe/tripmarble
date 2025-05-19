package com.followfollowme.tripmarble.core.member.application.service;

import com.followfollowme.tripmarble.core.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.core.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.core.member.application.port.in.MemberUseCase;
import com.followfollowme.tripmarble.core.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.core.member.domain.model.Member;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements MemberUseCase {

    private final MemberRepositoryPort memberRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    @Override
    public void signupMember(MemberSignupCommand command) {
        if (memberRepositoryPort.existByEmail(command.email())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        Member member = Member.builder()
            .id(snowflakeIdGenerator.generateId())
            .email(command.email())
            .password(passwordEncoder.encode(command.password()))
            .name(command.name())
            .nickname(command.nickname())
            .profileImage(null)
            .role(SecurityRole.USER)
            .provider(null)
            .build();

        memberRepositoryPort.save(member);
    }

    @Override
    public MemberMyInfoResponse getMyInfoMember(Long memberId) {
        Member member = memberRepositoryPort.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        return MemberMyInfoResponse.from(member);
    }
}
