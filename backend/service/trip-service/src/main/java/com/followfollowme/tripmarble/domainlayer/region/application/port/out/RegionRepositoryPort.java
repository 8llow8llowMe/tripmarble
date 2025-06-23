package com.followfollowme.tripmarble.domainlayer.region.application.port.out;

import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;

import java.util.List;

public interface RegionRepositoryPort {

    List<Region> findAll();
}
