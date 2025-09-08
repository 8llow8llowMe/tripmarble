package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto;

import java.util.List;

public record TripSpotReviewCreateInternalResponse(
    long tripSpotReviewId,
    long tripSpotId,
    long memberId,
    String content,
    double rating,
    String reviewSourceTypeCode,
    String reviewSourceTypeDescription,
    List<String> photoUrls
) {

}
