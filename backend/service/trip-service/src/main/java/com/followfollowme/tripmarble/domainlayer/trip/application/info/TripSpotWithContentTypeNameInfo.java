package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotWithContentTypeName;
import lombok.Builder;

@Builder
public record TripSpotWithContentTypeNameInfo(
    long tripSpotId,
    String contentTypeName,
    String tripSpotName,
    double longitude,
    double latitude
) {

    public static TripSpotWithContentTypeNameInfo of(TripSpotWithContentTypeName tripSpotWithContentTypeName) {
        return TripSpotWithContentTypeNameInfo.builder()
            .tripSpotId(tripSpotWithContentTypeName.tripSpotId())
            .contentTypeName(tripSpotWithContentTypeName.contentTypeName())
            .tripSpotName(tripSpotWithContentTypeName.tripSpotName())
            .longitude(tripSpotWithContentTypeName.longitude())
            .latitude(tripSpotWithContentTypeName.latitude())
            .build();
    }
}
