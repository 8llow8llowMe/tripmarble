package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotDetailEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripSpotDetailRepository extends JpaRepository<TripSpotDetailEntity, Long> {

    Optional<TripSpotDetailEntity> findByContentId(int contentId);
}
