package com.followfollowme.tripmarble.domainlayer.member.application.port.in;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.internal.dto.MemberProfileInternalResponse;
import java.util.List;

public interface MemberInternalUseCase {

    List<MemberProfileInternalResponse> getMemberProfiles(List<Long> memberIds);

    MemberProfileInternalResponse getMemberProfiles(long memberId);
}
