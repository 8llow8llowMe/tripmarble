package com.followfollowme.tripmarble.domainlayer.trip.application.info;

import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotReviewSummary;
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
            .ratingDistributions(
                summary.ratingDistributions().stream()
                    .map(d -> RatingDistributionInfo.builder()
                        .rating(d.rating())
                        .count(d.count())
                        .build())
                    .toList())
            .samplePhotos(
                summary.samplePhotos().stream()
                    .map(p -> PhotoInfo.builder()
                        .photoId(p.tripSpotReviewPhotoId())
                        .photoUrl(p.photoUrl())
                        .build())
                    .toList())
            .build();
    }

    @Builder
    public record RatingDistributionInfo(
        double rating,
        long count
    ) {

    }

    @Builder
    public record PhotoInfo(
        long photoId,
        String photoUrl
    ) {

    }
}
