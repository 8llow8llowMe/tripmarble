package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto;

import lombok.Builder;

@Builder
public record TripSpotReviewCreateInternalResponse(
    long tripSpotReviewId,
    long tripSpotId,
    long memberId,
    String content,
    double rating
) {
}
