package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto;

import lombok.Builder;

@Builder
public record TripSpotResponse(
    long tripSpotId,
    String title,
    String tel,
    String zipCode,
    String addr1,
    String addr2
) {

}
