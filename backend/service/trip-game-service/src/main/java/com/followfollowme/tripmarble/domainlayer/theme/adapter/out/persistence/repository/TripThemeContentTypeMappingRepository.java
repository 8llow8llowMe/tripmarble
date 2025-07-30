package com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity.TripThemeContentTypeMappingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripThemeContentTypeMappingRepository extends JpaRepository<TripThemeContentTypeMappingEntity, Long> {

    List<TripThemeContentTypeMappingEntity> findByTripThemeIdIn(List<Long> tripThemeIds);
}
