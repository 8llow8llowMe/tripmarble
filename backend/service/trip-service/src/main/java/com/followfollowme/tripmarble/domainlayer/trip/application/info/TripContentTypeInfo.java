package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripContentType;
import lombok.Builder;

@Builder
public record TripContentTypeInfo(
    long contentTypeId,
    String contentTypeName
) {

    public static TripContentTypeInfo of(TripContentType tripContentType) {
        return TripContentTypeInfo.builder()
            .contentTypeId(tripContentType.contentTypeId())
            .contentTypeName(tripContentType.contentTypeName())
            .build();
    }
}
