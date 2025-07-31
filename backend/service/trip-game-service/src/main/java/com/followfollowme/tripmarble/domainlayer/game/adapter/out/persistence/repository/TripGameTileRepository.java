package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameTileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripGameTileRepository extends JpaRepository<TripGameTileEntity, Long> {

}
