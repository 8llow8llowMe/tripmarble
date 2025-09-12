package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotReviewEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom.TripSpotReviewCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripSpotReviewRepository extends JpaRepository<TripSpotReviewEntity, Long>, TripSpotReviewCustomRepository {

}
