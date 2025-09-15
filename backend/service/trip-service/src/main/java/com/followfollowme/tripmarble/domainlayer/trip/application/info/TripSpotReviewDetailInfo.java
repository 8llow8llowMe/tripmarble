package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReviewPhoto;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.enums.ReviewSourceType;
import java.util.List;
import lombok.Builder;

@Builder
public record TripSpotReviewDetailInfo(
    long tripSpotReviewId,
    long tripSpotId,
    long memberId,
    String content,
    double rating,
    ReviewSourceType sourceType,
    List<PhotoInfo> photos
) {

    public static TripSpotReviewDetailInfo of(TripSpotReview review, List<TripSpotReviewPhoto> photos) {
        return TripSpotReviewDetailInfo.builder()
            .tripSpotReviewId(review.id())
            .tripSpotId(review.tripSpotId())
            .memberId(review.memberId())
            .content(review.content())
            .rating(review.rating())
            .sourceType(review.sourceType())
            .photos(photos.stream()
                .map(p -> PhotoInfo.builder()
                    .photoId(p.id())
                    .photoUrl(p.photoUrl())
                    .orderNo(p.orderNo())
                    .build())
                .toList())
            .build();
    }


    @Builder
    public record PhotoInfo(
        long photoId,
        String photoUrl,
        int orderNo
    ) {

    }
}
