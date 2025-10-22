package com.followfollowme.tripmarble.domainlayer.review.adapter.out.repository;

import com.followfollowme.tripmarble.domainlayer.review.adapter.out.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.review.adapter.out.repository.custom.TripSpotReviewCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TripSpotReviewRepository extends JpaRepository<TripSpotReviewEntity, Long>, TripSpotReviewCustomRepository {

    @Query("select count(r) from TripSpotReviewEntity r where r.memberId = :memberId")
    int countByMemberId(long memberId);
}
