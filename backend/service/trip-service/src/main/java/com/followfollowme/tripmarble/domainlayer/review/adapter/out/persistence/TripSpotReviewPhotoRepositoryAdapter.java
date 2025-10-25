package com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity.TripSpotReviewPhotoEntity;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.repository.TripSpotReviewPhotoRepository;
import com.followfollowme.tripmarble.domainlayer.review.application.mapper.TripSpotReviewPhotoMapper;
import com.followfollowme.tripmarble.domainlayer.review.application.port.out.TripSpotReviewPhotoRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.review.domain.model.TripSpotReviewPhoto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TripSpotReviewPhotoRepositoryAdapter implements TripSpotReviewPhotoRepositoryPort {

    private final TripSpotReviewPhotoRepository tripSpotReviewPhotoRepository;
    private final TripSpotReviewPhotoMapper tripSpotReviewPhotoMapper;

    @Override
    public List<TripSpotReviewPhoto> saveAll(List<TripSpotReviewPhoto> tripSpotReviewPhotos, TripSpotReview tripSpotReview) {
        List<TripSpotReviewPhotoEntity> entities = tripSpotReviewPhotoMapper.toEntityListFromDommainList(tripSpotReviewPhotos,
            tripSpotReview);
        List<TripSpotReviewPhotoEntity> savedEntities = tripSpotReviewPhotoRepository.saveAll(entities);
        return tripSpotReviewPhotoMapper.toDomainListFromEntityList(savedEntities);
    }

    @Override
    public List<TripSpotReviewPhoto> findByTripSpotReviewIdIn(List<Long> tripSpotReviewIds) {
        List<TripSpotReviewPhotoEntity> entities = tripSpotReviewPhotoRepository.findByTripSpotReviewIdIn(tripSpotReviewIds);
        return tripSpotReviewPhotoMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public List<TripSpotReviewPhoto> findByTripSpotReviewId(long tripSpotReviewId) {
        List<TripSpotReviewPhotoEntity> entities = tripSpotReviewPhotoRepository.findByTripSpotReviewId(tripSpotReviewId);
        return tripSpotReviewPhotoMapper.toDomainListFromEntityList(entities);
    }

    @Override
    public void deleteAllByTripSpotReviewId(long tripSpotReviewId) {
        tripSpotReviewPhotoRepository.deleteAllByTripSpotReviewId(tripSpotReviewId);
    }

    @Override
    public int countByMemberId(long memberId) {
        return tripSpotReviewPhotoRepository.countByMemberId(memberId);
    }
}
