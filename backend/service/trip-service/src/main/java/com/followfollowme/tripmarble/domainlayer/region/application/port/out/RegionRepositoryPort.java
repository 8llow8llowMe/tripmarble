package com.followfollowme.tripmarble.domainlayer.region.application.port.out;

import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;
import java.util.List;
import java.util.Optional;

public interface RegionRepositoryPort {

    List<Region> findAll();

    Optional<Region> findById(long regionId);
}
