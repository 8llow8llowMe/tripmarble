package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReviewPhoto;
import lombok.Builder;

@Builder
public record TripSpotReviewPhotoCreateInfo(
    long tripSpotReviewPhotoId,
    long tripSpotReviewId,
    String photoUrl,
    int orderNo
) {

    public static TripSpotReviewPhotoCreateInfo of(TripSpotReviewPhoto photo) {
        return TripSpotReviewPhotoCreateInfo.builder()
            .tripSpotReviewPhotoId(photo.id())
            .tripSpotReviewId(photo.tripSpotReviewId())
            .photoUrl(photo.photoUrl())
            .orderNo(photo.orderNo())
            .build();
    }
}
