package com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.entity.TripGameThemeMappingEntity;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.persistence.repository.custom.TripGameThemeMappingCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripGameThemeMappingRepository
    extends JpaRepository<TripGameThemeMappingEntity, Long>, TripGameThemeMappingCustomRepository {

}
