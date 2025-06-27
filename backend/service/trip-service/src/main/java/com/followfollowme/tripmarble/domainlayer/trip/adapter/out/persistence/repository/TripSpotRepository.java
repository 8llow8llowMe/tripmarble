package com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.entity.TripSpotEntity;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.out.persistence.repository.custom.TripSpotCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripSpotRepository extends JpaRepository<TripSpotEntity, Long>, TripSpotCustomRepository {

}
