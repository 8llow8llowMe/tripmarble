package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMoveLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripGameMoveLogRepository extends JpaRepository<TripGameMoveLogEntity, Long> {

}
