package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import lombok.Builder;

@Builder
public record TripSpotReviewPhotoUploadInfo(
    String tempPhotoUrl
) {

    public static TripSpotReviewPhotoUploadInfo of(String tempPhotoUrl) {
        return TripSpotReviewPhotoUploadInfo.builder()
            .tempPhotoUrl(tempPhotoUrl)
            .build();
    }
}
