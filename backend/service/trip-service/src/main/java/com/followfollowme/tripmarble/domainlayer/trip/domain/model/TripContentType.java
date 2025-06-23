package com.followfollowme.tripmarble.domainlayer.trip.domain.model;

import lombok.Builder;

@Builder
public record TripContentType(
    long id,
    String contentTypeId,
    String contentTypeName
) {

}
