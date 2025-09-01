package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.MemberProfileInternalResponse;
import java.util.List;

public interface MemberClientPort {

    List<MemberProfileInternalResponse> getMemberProfiles(List<Long> memberIds);
}
