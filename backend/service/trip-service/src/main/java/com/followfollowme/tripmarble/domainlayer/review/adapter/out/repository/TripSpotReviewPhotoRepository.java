package com.followfollowme.tripmarble.domainlayer.review.adapter.out.repository;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.entity.TripSpotReviewPhotoEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripSpotReviewPhotoRepository extends JpaRepository<TripSpotReviewPhotoEntity, Long> {

    List<TripSpotReviewPhotoEntity> findByTripSpotReviewIdIn(List<Long> tripSpotReviewIds);

    List<TripSpotReviewPhotoEntity> findByTripSpotReviewId(long tripSpotReviewId);
}
