package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotReviewPhotoEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripSpotReviewPhotoRepository extends JpaRepository<TripSpotReviewPhotoEntity, Long> {

    List<TripSpotReviewPhotoEntity> findByTripSpotReviewIdIn(List<Long> tripSpotReviewIds);
}
