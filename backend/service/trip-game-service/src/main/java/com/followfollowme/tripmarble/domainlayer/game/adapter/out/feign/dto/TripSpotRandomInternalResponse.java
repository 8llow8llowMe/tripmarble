package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto;

public record TripSpotRandomInternalResponse(
    long tripSpotId,
    int contentTypeId,
    String tripSpotName
) {

}
