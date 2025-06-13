package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record TripContentTypeResponse(
    String contentTypeId,
    String contentTypeName
) {

}
