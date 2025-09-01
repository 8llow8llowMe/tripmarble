package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameTileEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TripGameTileRepository extends JpaRepository<TripGameTileEntity, Long> {

    @Query("select max(t.stepNo) from TripGameTileEntity t where t.tripGame.id = :tripGameId")
    int findMaxStepNoByTripGameId(long tripGameId);

    Optional<TripGameTileEntity> findByTripGameIdAndStepNo(long tripGameId, int stepNo);

    List<TripGameTileEntity> findAllByTripGameId(long tripGameId);
}
