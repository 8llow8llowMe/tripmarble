package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto;

import java.util.List;
import lombok.Builder;

@Builder
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
