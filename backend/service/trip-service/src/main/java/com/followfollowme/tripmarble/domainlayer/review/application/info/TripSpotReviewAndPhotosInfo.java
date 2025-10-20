package com.followfollowme.tripmarble.domainlayer.review.application.info;

import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReviewPhoto;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import java.util.List;
import lombok.Builder;

@Builder
public record TripSpotReviewAndPhotosInfo(
    long tripSpotReviewId,
    long tripSpotId,
    long memberId,
    String content,
    double rating,
    ReviewSourceType sourceType,
    List<PhotoInfo> photos
) {

    public static TripSpotReviewAndPhotosInfo of(TripSpotReview review, List<TripSpotReviewPhoto> photos) {
        return TripSpotReviewAndPhotosInfo.builder()
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
