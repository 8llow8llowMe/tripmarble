package com.followfollowme.tripmarble.domainlayer.region.application.port.out;

import java.util.List;

public interface RepresentativeRegionSigunguMappingRepositoryPort {

    List<Long> findSigunguIdsByRepresentativeRegionId(long representativeRegionId);
}
