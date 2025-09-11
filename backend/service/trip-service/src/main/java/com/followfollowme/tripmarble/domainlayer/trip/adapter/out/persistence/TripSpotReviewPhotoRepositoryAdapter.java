package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotReviewPhotoEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.TripSpotReviewPhotoRepository;
import com.followfollowme.tripmarble.domainlayer.trip.application.mapper.TripSpotReviewPhotoMapper;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotReviewPhotoRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReview;
import com.followfollowme.tripmarble.domainlayer.trip.domain.model.TripSpotReviewPhoto;
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
        List<TripSpotReviewPhotoEntity> entities = tripSpotReviewPhotoMapper.toEntityListFromDommainList(tripSpotReviewPhotos, tripSpotReview);
        List<TripSpotReviewPhotoEntity> savedEntities = tripSpotReviewPhotoRepository.saveAll(entities);
        return tripSpotReviewPhotoMapper.toDomainListFromEntityList(savedEntities);
    }
}
