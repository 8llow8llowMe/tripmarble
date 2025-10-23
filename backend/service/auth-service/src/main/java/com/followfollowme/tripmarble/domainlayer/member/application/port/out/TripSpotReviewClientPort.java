package com.followfollowme.tripmarble.domainlayer.member.application.port.out;

import com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto.TripSpotReviewCountInternalResponse;

public interface TripSpotReviewClientPort {

    TripSpotReviewCountInternalResponse getMyTripSpotReviewAndPhotoCount(long memberId);
}
