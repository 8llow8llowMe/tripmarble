package com.followfollowme.tripmarble.domainlayer.trip.domain.model;

import lombok.Builder;

@Builder
public record TripContentType(
    long id,
    int contentTypeId,
    String contentTypeName
) {

}
