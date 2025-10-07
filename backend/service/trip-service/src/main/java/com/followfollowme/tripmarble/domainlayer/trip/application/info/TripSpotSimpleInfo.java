package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import lombok.Builder;

@Builder
public record TripSpotSimpleInfo(
    long tripSpotId,
    long contentId,
    String tripSpotName,
    String originalImageUrl,
    double longitude,
    double latitude
) {

    public static TripSpotSimpleInfo of(TripSpot tripSpot) {
        return TripSpotSimpleInfo.builder()
            .tripSpotId(tripSpot.id())
            .contentId(tripSpot.contentId())
            .tripSpotName(tripSpot.title())
            .originalImageUrl(tripSpot.firstImage())
            .longitude(tripSpot.mapX())
            .latitude(tripSpot.mapY())
            .build();
    }
}
