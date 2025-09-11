package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TripSpotReviewRepository extends JpaRepository<TripSpotReviewEntity, Long> {

    @Query("select avg(r.rating) from TripSpotReviewEntity r where r.tripSpot.id = :tripSpotId")
    Optional<Double> findAverageRatingByTripSpotId(long tripSpotId);
}
