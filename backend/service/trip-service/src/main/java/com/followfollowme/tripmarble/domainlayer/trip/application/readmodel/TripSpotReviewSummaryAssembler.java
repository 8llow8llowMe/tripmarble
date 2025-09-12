package com.followfollowme.tripmarble.domainlayer.trip.application.readmodel;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewPhotoProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewRatingDistributionProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewSummaryProjection;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class TripSpotReviewSummaryAssembler {

    public TripSpotReviewSummary toReadModel(
        TripSpotReviewSummaryProjection summary,
        List<TripSpotReviewRatingDistributionProjection> distributions,
        List<TripSpotReviewPhotoProjection> photos) {
        
        return TripSpotReviewSummary.builder()
            .totalCount(summary != null ? summary.totalCount() : 0L)
            .averageRating(summary != null ? summary.averageRating() : 0.0)
            .ratingDistributions(distributions.stream()
                .map(d -> TripSpotReviewSummary.TripSpotReviewRatingDistribution.builder()
                    .rating(d.rating())
                    .count(d.count())
                    .build())
                .toList())
            .samplePhotos(photos.stream()
                .map(p -> TripSpotReviewSummary.TripSpotReviewPhoto.builder()
                    .tripSpotReviewPhotoId(p.tripSpotReviewPhotoId())
                    .photoUrl(p.photoUrl())
                    .build())
                .toList())
            .build();
    }
}
