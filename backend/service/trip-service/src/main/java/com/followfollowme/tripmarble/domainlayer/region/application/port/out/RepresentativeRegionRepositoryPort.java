package com.followfollowme.tripmarble.domainlayer.region.application.port.out;

import com.followfollowme.tripmarble.domainlayer.region.adapter.out.persistence.entity.RepresentativeRegionEntity;
import java.util.List;

public interface RepresentativeRegionRepositoryPort {

    List<RepresentativeRegionEntity> findAll();
}
