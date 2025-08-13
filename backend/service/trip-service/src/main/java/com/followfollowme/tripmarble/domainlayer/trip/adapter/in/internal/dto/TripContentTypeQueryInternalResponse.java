package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto;

import lombok.Builder;

@Builder
public record TripContentTypeQueryInternalResponse(
    long tripContentTypeId,
    int contentTypeId
) {

}
