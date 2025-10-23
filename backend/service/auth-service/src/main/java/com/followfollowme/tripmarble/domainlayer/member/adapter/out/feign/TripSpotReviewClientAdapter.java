package com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.client.TripSpotReviewClient;
import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripSpotReviewCountInternalResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.port.out.TripSpotReviewClientPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripSpotReviewClientAdapter implements TripSpotReviewClientPort {

    private final TripSpotReviewClient tripSpotReviewClient;

    @Override
    public TripSpotReviewCountInternalResponse getMyTripSpotReviewAndPhotoCount(long memberId) {
        return tripSpotReviewClient.getMyTripSpotReviewAndPhotoCount(memberId);
    }
}
