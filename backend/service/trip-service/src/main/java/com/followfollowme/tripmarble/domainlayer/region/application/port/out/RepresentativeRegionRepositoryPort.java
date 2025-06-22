package com.followfollowme.tripmarble.domainlayer.region.application.port.out;

import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;

import java.util.List;

public interface RepresentativeRegionRepositoryPort {

    List<RepresentativeRegion> findAll();
}
