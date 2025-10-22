package com.followfollowme.tripmarble.domainlayer.review.application.info;

import lombok.Builder;

@Builder
public record TripSpotReviewCountInfo(
    long memberId,
    int tripSpotReviewCount,
    int photoCount
) {

    public static TripSpotReviewCountInfo of(long mbmerId, int tripSpotReviewCount, int photoCount) {
        return TripSpotReviewCountInfo.builder()
            .memberId(mbmerId)
            .tripSpotReviewCount(tripSpotReviewCount)
            .photoCount(photoCount)
            .build();
    }
}
