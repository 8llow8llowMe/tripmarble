package com.followfollowme.tripmarble.domainlayer.member.application.service;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberProfileUploadResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.port.in.MemberInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.member.application.port.in.MemberWebUseCase;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.MemberRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.member.domain.model.Member;
import com.followfollowme.tripmarble.persistence.util.SnowflakeIdGenerator;
import com.followfollowme.tripmarble.security.common.enums.SecurityRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberFacade implements MemberWebUseCase, MemberInternalUseCase {

    private final MemberRepositoryPort memberRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final SnowflakeIdGenerator snowflakeIdGenerator;
    private final ProfileImageUploader profileImageUploader;

    @Override
    public void signup(MemberSignupCommand command) {
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
    public MemberMyInfoResponse getMyInfo(long memberId) {
        Member member = memberRepositoryPort.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        return MemberMyInfoResponse.from(member);
    }

    @Override
    public MemberProfileUploadResponse uploadProfileImage(long memberId, MultipartFile imageFile) {
        return profileImageUploader.upload(memberId, imageFile);
    }

}
