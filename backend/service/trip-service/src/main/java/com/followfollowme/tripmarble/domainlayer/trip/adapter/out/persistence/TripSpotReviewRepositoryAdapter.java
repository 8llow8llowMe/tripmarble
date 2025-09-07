package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripSpotReviewRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotReviewMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TripSpotReviewRepositoryAdapter implements TripSpotReviewRepositoryPort {

    private final TripSpotReviewRepository tripSpotReviewRepository;
    private final TripSpotReviewMapper tripSpotReviewMapper;

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
    public Optional<Double> findAverageRatingByTripSpotId(long tripSpotId) {
        return tripSpotReviewRepository.findAverageRatingByTripSpotId(tripSpotId);
    }
}
