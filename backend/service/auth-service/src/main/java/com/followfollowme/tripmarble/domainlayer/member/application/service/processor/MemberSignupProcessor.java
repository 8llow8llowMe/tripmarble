package com.followfollowme.tripmarble.domainlayer.member.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberSignupProcessor {

    private final MemberRepositoryPort memberRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final SnowflakeIdGenerator snowflakeIdGenerator;

    public void signup(MemberSignupCommand command) {
        if (memberRepositoryPort.existByEmail(command.email())) {
            throw new MemberException(MemberErrorCode.EXIST_MEMBER_EMAIL, command.email());
        }

        Member member = Member.builder()
            .id(snowflakeIdGenerator.generateId())
            .email(command.email())
            .password(passwordEncoder.encode(command.password()))
            .name(command.name())
            .nickname(command.nickname())
            .profileImageUrl(null)
            .role(SecurityRole.USER)
            .provider(null)
            .build();

        memberRepositoryPort.save(member);
    }
}
