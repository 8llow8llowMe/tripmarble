package com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.client.TripGameClient;
import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripGameCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.TripGameClientPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGameClientAdapter implements TripGameClientPort {

    private final TripGameClient tripGameClient;

    @Override
    public TripGameCountInternalResponse getTripGameCountByMember(long memberId) {
        return tripGameClient.getTripGameCountByMember(memberId);
    }
}
