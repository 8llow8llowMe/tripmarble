package com.followfollowme.tripmarble.domainlayer.review.application.info;

import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import lombok.Builder;

@Builder
public record TripSpotReviewCreateInfo(
    long tripSpotReviewId,
    long tripSpotId,
    long memberId,
    String content,
    double rating,
    ReviewSourceType sourceType
) {

    public static TripSpotReviewCreateInfo of(TripSpotReview review) {
        return TripSpotReviewCreateInfo.builder()
            .tripSpotReviewId(review.id())
            .tripSpotId(review.tripSpotId())
            .memberId(review.memberId())
            .content(review.content())
            .rating(review.rating())
            .sourceType(review.sourceType())
            .build();
    }
}
