package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewPhotoProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewRatingDistributionProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.projection.TripSpotReviewSummaryProjection;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripSpotReviewRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotReviewMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotReviewSummary;
import com.followfollowme.tripmarble.domainlayer.trip.application.readmodel.TripSpotReviewSummaryAssembler;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripSpotReviewRepositoryAdapter implements TripSpotReviewRepositoryPort {

    private final TripSpotReviewRepository tripSpotReviewRepository;
    private final TripSpotReviewMapper tripSpotReviewMapper;
    private final TripSpotReviewSummaryAssembler tripSpotReviewSummaryAssembler;

    @Override
    public TripSpotReview save(TripSpotReview tripSpotReview, TripSpot tripSpot) {
        TripSpotReviewEntity entity = tripSpotReviewMapper.toEntityFromDomain(tripSpotReview, tripSpot);
        TripSpotReviewEntity savedEntity = tripSpotReviewRepository.save(entity);
        return tripSpotReviewMapper.toDomainFromEntity(savedEntity);
    }

    @Override
    public Optional<TripSpotReview> findById(long tripSpotReviewId) {
        return tripSpotReviewRepository.findById(tripSpotReviewId)
            .map(tripSpotReviewMapper::toDomainFromEntity);
    }

    @Override
    public TripSpotReviewSummary findSummaryByTripSpotId(long tripSpotId, int photoLimit) {
        TripSpotReviewSummaryProjection summary = tripSpotReviewRepository.findSummaryByTripSpotId(tripSpotId).orElse(null);
        List<TripSpotReviewRatingDistributionProjection> distributions =
            tripSpotReviewRepository.findRatingDistributionByTripSpotId(tripSpotId);
        List<TripSpotReviewPhotoProjection> photos = tripSpotReviewRepository.findSamplePhotosByTripSpotId(tripSpotId, photoLimit);
        return tripSpotReviewSummaryAssembler.toReadModel(summary, distributions, photos);
    }

    @Override
    public Slice<TripSpotReview> findReviewsNoOffsetByTripSpotId(long tripSpotId, long lastReviewId, int size) {
        Slice<TripSpotReviewEntity> entitySlice = tripSpotReviewRepository.findReviewsNoOffsetByTripSpotId(tripSpotId, lastReviewId, size);
        return entitySlice.map(tripSpotReviewMapper::toDomainFromEntity);
    }
}
