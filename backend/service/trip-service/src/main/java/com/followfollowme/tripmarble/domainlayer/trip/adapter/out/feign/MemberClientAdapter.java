package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.feign;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.feign.client.MemberClient;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.feign.dto.MemberProfileInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.MemberClientPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberClientAdapter implements MemberClientPort {

    private final MemberClient memberClient;

    @Override
    public MemberProfileInternalResponse getMemberProfile(long memberId) {
        return memberClient.getMemberProfile(memberId);
    }
}
