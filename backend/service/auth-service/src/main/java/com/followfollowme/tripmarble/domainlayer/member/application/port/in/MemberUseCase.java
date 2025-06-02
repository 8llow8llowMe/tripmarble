package com.followfollowme.tripmarble.domainlayer.member.application.port.in;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberProfileUploadResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberSignupCommand;
import org.springframework.web.multipart.MultipartFile;

public interface MemberUseCase {

    void signup(MemberSignupCommand command);

    MemberMyInfoResponse getMyInfo(long memberId);

    MemberProfileUploadResponse uploadProfileImage(long memberId, MultipartFile imageFile);


}
