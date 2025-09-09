package com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto;

import java.util.List;

public record TripSpotReviewCreateInternalRequest(
    long memberId,
    String content,
    double rating,
    List<String> photoUrls
) {

}
