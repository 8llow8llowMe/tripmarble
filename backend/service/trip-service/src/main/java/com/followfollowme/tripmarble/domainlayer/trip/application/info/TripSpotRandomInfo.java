package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import lombok.Builder;

@Builder
public record TripSpotRandomInfo(
    long tripSpotId,
    int contentTypeId,
    String tripSpotName
) {

    public static TripSpotRandomInfo of(TripSpot tripSpot) {
        return TripSpotRandomInfo.builder()
            .tripSpotId(tripSpot.id())
            .contentTypeId(tripSpot.contentTypeId())
            .tripSpotName(tripSpot.title())
            .build();
    }
}
