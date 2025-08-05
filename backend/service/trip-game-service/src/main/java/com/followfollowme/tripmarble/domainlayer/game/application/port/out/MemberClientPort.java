package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.MemberProfileResponse;
import java.util.List;

public interface MemberClientPort {

    List<MemberProfileResponse> getMemberProfiles(List<Long> memberIds);
}
