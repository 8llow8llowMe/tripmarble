package com.followfollowme.tripmarble.domainlayer.review.adapter.out;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.projection.TripSpotReviewPhotoProjection;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.projection.TripSpotReviewRatingDistributionProjection;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.projection.TripSpotReviewSummaryProjection;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.repository.TripSpotReviewRepository;
import com.followfollowme.tripmarble.domainlayer.review.application.mapper.TripSpotReviewMapper;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.application.readmodel.TripSpotReviewSummary;
import com.followfollowme.tripmarble.domainlayer.review.application.readmodel.TripSpotReviewSummaryAssembler;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.enums.ReviewSourceType;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpot;
import com.followfollowme.tripmarble.persistence.enums.OrderType;
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
    public TripSpotReviewSummary findSummaryByTripSpotId(long tripSpotId, ReviewSourceType sourceType, int photoLimit) {
        TripSpotReviewSummaryProjection summary = tripSpotReviewRepository.findSummaryByTripSpotId(tripSpotId, sourceType).orElse(null);
        List<TripSpotReviewRatingDistributionProjection> distributions =
            tripSpotReviewRepository.findRatingDistributionByTripSpotId(tripSpotId, sourceType);
        List<TripSpotReviewPhotoProjection> photos = tripSpotReviewRepository.findSamplePhotosByTripSpotId(tripSpotId, sourceType,
            photoLimit);
        return tripSpotReviewSummaryAssembler.toReadModel(summary, distributions, photos);
    }

    @Override
    public Slice<TripSpotReview> findReviewsNoOffsetByTripSpotId(
        long tripSpotId, ReviewSourceType sourceType, long lastTripSpotReviewId, int size, OrderType orderType) {
        Slice<TripSpotReviewEntity> entitySlice =
            tripSpotReviewRepository.findReviewsNoOffsetByTripSpotId(tripSpotId, sourceType, lastTripSpotReviewId, size, orderType);
        return entitySlice.map(tripSpotReviewMapper::toDomainFromEntity);
    }

    @Override
    public Slice<TripSpotReview> findReviewsNoOffsetByMemberId(long memberId, ReviewSourceType sourceType, long lastTripSpotReviewId,
        int size, OrderType orderType) {
        Slice<TripSpotReviewEntity> entitySlice =
            tripSpotReviewRepository.findReviewsNoOffsetByMemberId(memberId, sourceType, lastTripSpotReviewId, size, orderType);
        return entitySlice.map(tripSpotReviewMapper::toDomainFromEntity);
    }

    @Override
    public void deleteById(long tripSpotReviewId) {
        tripSpotReviewRepository.deleteById(tripSpotReviewId);
    }

    @Override
    public int countByMemberId(long memberId) {
        return tripSpotReviewRepository.countByMemberId(memberId);
    }
}
