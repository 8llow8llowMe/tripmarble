package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto;

public record TripSpotRandomResponse(
    long tripSpotId,
    int contentTypeId,
    String tripSpotName
) {

}
