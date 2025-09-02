package com.followfollowme.tripmarble.domainlayer.game.application.info;

import lombok.Builder;

@Builder
public record RepresentativeRegionInfo(
    long representativeRegionId,
    String representativeRegionName,
    String imageUrl
) {

}
