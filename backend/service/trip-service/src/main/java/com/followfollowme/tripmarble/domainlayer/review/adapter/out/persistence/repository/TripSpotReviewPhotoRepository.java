package com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.persistence.entity.TripSpotReviewPhotoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TripSpotReviewPhotoRepository extends JpaRepository<TripSpotReviewPhotoEntity, Long> {

    List<TripSpotReviewPhotoEntity> findByTripSpotReviewIdIn(List<Long> tripSpotReviewIds);

    List<TripSpotReviewPhotoEntity> findByTripSpotReviewId(long tripSpotReviewId);

    void deleteAllByTripSpotReviewId(long tripSpotReviewId);

    @Query("select count(p) from TripSpotReviewPhotoEntity p where p.tripSpotReview.memberId = :memberId")
    int countByMemberId(long memberId);
}
