package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto;

public record TripSpotQueryInternalResponse(
    long tripSpotId,
    int contentTypeId,
    String tripSpotName,
    double longitude,
    double latitude
) {

}
