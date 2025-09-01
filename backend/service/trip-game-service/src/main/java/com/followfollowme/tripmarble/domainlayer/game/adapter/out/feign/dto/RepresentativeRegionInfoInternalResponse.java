package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto;

public record RepresentativeRegionInfoInternalResponse(
    long representativeRegionId,
    String representativeRegionName,
    String imageUrl
) {

}
