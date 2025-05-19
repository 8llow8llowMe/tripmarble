package com.followfollowme.tripmarble.core.member.application.port.in;

import com.followfollowme.tripmarble.core.member.adapter.in.web.dto.MemberMyInfoResponse;
import com.followfollowme.tripmarble.core.member.application.command.MemberSignupCommand;

public interface MemberUseCase {

    void signup(MemberSignupCommand command);

    MemberMyInfoResponse getMyInfo(Long memberId);
}
