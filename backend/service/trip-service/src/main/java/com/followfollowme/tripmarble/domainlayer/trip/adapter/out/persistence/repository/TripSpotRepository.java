package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripSpotRepository extends JpaRepository<TripSpotEntity, Long> {
    
}
