package com.followfollowme.tripmarble.domainlayer.review.application.info;

import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReviewPhoto;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record TripSpotReviewDetailInfo(
    long tripSpotReviewId,
    String tripSpotName,
    String nickname,
    String profileImageUrl,
    String content,
    double rating,
    ReviewSourceType sourceType,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    List<PhotoInfo> photos
) {

    public static TripSpotReviewDetailInfo of(
        TripSpot tripSpot, TripSpotReview review, List<TripSpotReviewPhoto> photos, MemberProfileInfo member) {
        return TripSpotReviewDetailInfo.builder()
            .tripSpotReviewId(review.id())
            .tripSpotName(tripSpot.title())
            .nickname(member.nickname())
            .profileImageUrl(member.profileImageUrl())
            .content(review.content())
            .rating(review.rating())
            .sourceType(review.sourceType())
            .createdAt(review.createdAt())
            .updatedAt(review.updatedAt())
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
