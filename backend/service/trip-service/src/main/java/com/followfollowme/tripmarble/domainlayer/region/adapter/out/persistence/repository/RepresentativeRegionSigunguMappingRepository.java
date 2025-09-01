package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RepresentativeRegionSigunguMappingEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RepresentativeRegionSigunguMappingRepository
    extends JpaRepository<RepresentativeRegionSigunguMappingEntity, Long> {

    @Query(""" 
        select m.sigungu.id
        from RepresentativeRegionSigunguMappingEntity m
        where m.representativeRegion.id = :representativeRegionId
        """)
    List<Long> findSigunguIdsByRepresentativeRegionId(long representativeRegionId);
}
