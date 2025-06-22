package com.followfollowme.tripmarble.domainlayer.region.application.port.out;

import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;

import java.util.List;

public interface SigunguRepositoryPort {

    List<Sigungu> findAllByRegionId(long regionId);

    List<Sigungu> findAllByIdIn(List<Long> sigunguIds);
}
