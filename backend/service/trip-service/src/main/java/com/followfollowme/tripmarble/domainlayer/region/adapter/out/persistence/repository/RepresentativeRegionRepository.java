package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RepresentativeRegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepresentativeRegionRepository extends JpaRepository<RepresentativeRegionEntity, Long> {
    
}
