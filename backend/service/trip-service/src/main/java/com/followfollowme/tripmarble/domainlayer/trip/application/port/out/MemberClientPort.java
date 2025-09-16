package com.followfollowme.tripmarble.domainlayer.trip.application.port.out;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.feign.dto.MemberProfileInternalResponse;

public interface MemberClientPort {

    MemberProfileInternalResponse getMemberProfile(long memberId);
}
