package com.followfollowme.tripmarble.domainlayer.review.application.port.out;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.feign.dto.MemberProfileInternalResponse;

public interface MemberClientPort {

    MemberProfileInternalResponse getMemberProfile(long memberId);
}
