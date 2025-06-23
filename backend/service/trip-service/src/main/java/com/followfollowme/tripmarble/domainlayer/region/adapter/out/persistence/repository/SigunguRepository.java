package com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.repository;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.SigunguEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SigunguRepository extends JpaRepository<SigunguEntity, Long> {

    List<SigunguEntity> findAllByRegionId(long regionId);

    List<SigunguEntity> findAllByIdIn(List<Long> sigunguIds);
}
