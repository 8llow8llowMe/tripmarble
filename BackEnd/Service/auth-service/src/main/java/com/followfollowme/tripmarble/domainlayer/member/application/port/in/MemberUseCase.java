package com.followfollowme.tripmarble.domainlayer.member.application.port.in;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.command.MemberSignupCommand;

public interface MemberUseCase {

    void signup(MemberSignupCommand command);

    MemberMyInfoResponse getMyInfo(Long memberId);
}
