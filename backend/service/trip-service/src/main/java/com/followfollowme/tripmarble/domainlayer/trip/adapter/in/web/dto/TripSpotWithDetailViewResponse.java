package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record TripSpotWithDetailViewResponse(
    long tripSpotId,
    String contentTypeName, // TODO: contentTypeId 이용해서 관련 매핑
    String homepageUrl,
    String overview
) {

}
