package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record TripSpotReviewCreateInternalRequest(
    long tripSpotId,
    long memberId,
    String content,
    double rating,
    List<String> photoUrls
) {
}
