package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto;

import lombok.Builder;

@Builder
public record TripContentTypeInternalResponse(
    long tripContentTypeId,
    int contentTypeId
) {

}
