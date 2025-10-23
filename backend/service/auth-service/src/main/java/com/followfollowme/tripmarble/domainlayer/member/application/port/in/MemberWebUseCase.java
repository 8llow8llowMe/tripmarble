package com.followfollowme.tripmarble.domainlayer.member.application.port.in;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberActivitySummaryResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberProfileUploadResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberSignupCommand;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberUpdateCommand;
import org.springframework.web.multipart.MultipartFile;

public interface MemberWebUseCase {

    void signupMember(MemberSignupCommand command);

    MemberMyInfoResponse getMyInfo(long memberId);

    MemberProfileUploadResponse uploadProfileImage(MultipartFile imageFile);

    void updateMyInfo(MemberUpdateCommand command);

    void withdrawMember(long memberId);

    MemberActivitySummaryResponse getMemberActivitySummary(long memberId);
}
