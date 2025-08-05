package com.followfollowme.tripmarble.domainlayer.member.application.port.in;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.dto.MemberProfileResponse;
import java.util.List;

public interface MemberInternalUseCase {

    List<MemberProfileResponse> getMemberProfiles(List<Long> memberIds);
}
