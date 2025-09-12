package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotReviewSummary;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotReviewSummary.TripSpotReviewPhoto;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotReviewSummary.TripSpotReviewRatingDistribution;
import java.util.List;
import lombok.Builder;

@Builder
public record TripSpotReviewSummaryInfo(
    long totalCount,
    double averageRating,
    List<RatingDistributionInfo> ratingDistributions,
    List<PhotoInfo> samplePhotos
) {

    public static TripSpotReviewSummaryInfo of(TripSpotReviewSummary summary) {
        return TripSpotReviewSummaryInfo.builder()
            .totalCount(summary.totalCount())
            .averageRating(summary.averageRating())
            .ratingDistributions(summary.ratingDistributions().stream()
                .map(RatingDistributionInfo::of)
                .toList())
            .samplePhotos(summary.samplePhotos().stream()
                .map(PhotoInfo::of)
                .toList())
            .build();
    }

    @Builder
    public record RatingDistributionInfo(
        double rating,
        long count
    ) {

        public static RatingDistributionInfo of(TripSpotReviewRatingDistribution distribution) {
            return RatingDistributionInfo.builder()
                .rating(distribution.rating())
                .count(distribution.count())
                .build();
        }
    }

    @Builder
    public record PhotoInfo(
        long photoId,
        String photoUrl
    ) {

        public static PhotoInfo of(TripSpotReviewPhoto photo) {
            return PhotoInfo.builder()
                .photoId(photo.tripSpotReviewPhotoId())
                .photoUrl(photo.photoUrl())
                .build();
        }
    }
}
