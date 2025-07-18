package com.followfollowme.tripmarble.domainlayer.region.application.port.out;

import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import java.util.List;
import java.util.Optional;

public interface RepresentativeRegionRepositoryPort {

    List<RepresentativeRegion> findAll();

    Optional<RepresentativeRegion> findById(long representativeRegionId);
}
