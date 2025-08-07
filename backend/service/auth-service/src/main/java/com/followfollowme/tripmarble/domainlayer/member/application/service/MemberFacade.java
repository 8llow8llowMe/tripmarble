package com.followfollowme.tripmarble.domainlayer.member.application.service;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberProfileUploadResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberUpdateCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.port.in.MemberWebUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberFacade implements MemberWebUseCase {

    private final MemberSignupProcessor memberSignupProcessor;
    private final MemberInfoProcessor memberInfoProcessor;
    private final ProfileImageProcessor profileImageProcessor;
    private final MemberUpdateProcessor memberUpdateProcessor;

    @Override
    @Transactional
    public void signupMember(MemberSignupCommand command) {
        memberSignupProcessor.signup(command);
    }

    @Override
    @Transactional(readOnly = true)
    public MemberMyInfoResponse getMyInfo(long memberId) {
        return memberInfoProcessor.loadMyInfo(memberId);
    }

    @Override
    public MemberProfileUploadResponse uploadProfileImage(MultipartFile imageFile) {
        return profileImageProcessor.upload(imageFile);
    }

    @Override
    @Transactional
    public void updateMyInfo(MemberUpdateCommand command) {
        memberUpdateProcessor.update(command);
    }
}
