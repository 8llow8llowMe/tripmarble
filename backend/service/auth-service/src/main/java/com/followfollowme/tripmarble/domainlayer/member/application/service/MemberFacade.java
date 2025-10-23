package com.followfollowme.tripmarble.domainlayer.member.application.service;

import com.followfollowme.tripmarble.domainlayer.auth.application.service.processor.JwtTokenProcessor;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberActivitySummaryResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberProfileUploadResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.presenter.MemberPresenter;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberUpdateCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.info.MemberActivitySummaryInfo;
import com.followfollowme.tripmarble.domainlayer.member.application.info.MemberMyInfo;
import com.followfollowme.tripmarble.domainlayer.member.application.port.in.MemberWebUseCase;
import com.followfollowme.tripmarble.domainlayer.member.application.service.processor.MemberInfoProcessor;
import com.followfollowme.tripmarble.domainlayer.member.application.service.processor.MemberSignupProcessor;
import com.followfollowme.tripmarble.domainlayer.member.application.service.processor.MemberUpdateProcessor;
import com.followfollowme.tripmarble.domainlayer.member.application.service.processor.MemberWithdrawProcessor;
import com.followfollowme.tripmarble.domainlayer.member.application.service.processor.ProfileImageProcessor;
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
    private final MemberWithdrawProcessor memberWithdrawProcessor;
    private final JwtTokenProcessor jwtTokenProcessor;
    private final MemberPresenter memberPresenter;

    @Override
    @Transactional
    public void signupMember(MemberSignupCommand command) {
        memberSignupProcessor.signup(command);
    }

    @Override
    @Transactional(readOnly = true)
    public MemberMyInfoResponse getMyInfo(long memberId) {
        MemberMyInfo memberMyInfo = memberInfoProcessor.loadMyInfo(memberId);
        return memberPresenter.toMyInfoResponse(memberMyInfo);
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

    @Override
    @Transactional
    public void withdrawMember(long memberId) {
        memberWithdrawProcessor.withdraw(memberId);
        jwtTokenProcessor.revoke(memberId);
    }

    @Override
    @Transactional(readOnly = true)
    public MemberActivitySummaryResponse getMemberActivitySummary(long memberId) {
        MemberActivitySummaryInfo memberActivitySummaryInfo = memberInfoProcessor.getMemberActivitySummary(memberId);
        return memberPresenter.toActivitySummaryResponse(memberActivitySummaryInfo);
    }
}
