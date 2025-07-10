package com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.theme.adapter.out.persistence.entity.TripThemeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripThemeRepository extends JpaRepository<TripThemeEntity, Long> {

}
