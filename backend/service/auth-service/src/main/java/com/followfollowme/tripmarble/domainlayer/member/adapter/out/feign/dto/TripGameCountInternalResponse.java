package com.followfollowme.tripmarble.domainlayer.member.adapter.out.feign.dto;

import io.swagger.v3.oas.annotations.Hidden;

@Hidden
public record TripGameCountInternalResponse(
    long memberId,
    int tripGameCount
) {

}
