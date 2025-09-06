package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameMoveLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TripGameMoveLogRepository extends JpaRepository<TripGameMoveLogEntity, Long> {

    @Query("""            
        select l from TripGameMoveLogEntity l
        join fetch l.tripGameTile t
        join fetch l.tripGameMember m
        where t.tripGame.id = :tripGameId
        order by l.arrivedAt asc, l.id asc
        """)
    List<TripGameMoveLogEntity> findAllByTripGameId(long tripGameId);
}
