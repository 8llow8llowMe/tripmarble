package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripGameRepository extends JpaRepository<TripGameEntity, Long> {

}
