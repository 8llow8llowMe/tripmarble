package com.followfollowme.tripmarble.core.member.application.port.in;

import com.followfollowme.tripmarble.core.member.application.command.MemberSignupCommand;

public interface MemberUseCase {

    void signupMember(MemberSignupCommand command);
}
