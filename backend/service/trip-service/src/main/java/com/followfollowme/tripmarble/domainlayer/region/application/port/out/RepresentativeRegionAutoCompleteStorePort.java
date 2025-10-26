package com.followfollowme.tripmarble.domainlayer.region.application.port.out;

import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;

import java.util.List;

public interface RepresentativeRegionAutoCompleteStorePort {

    List<RepresentativeRegion> find(String keyword);

    void save(String keyword, List<RepresentativeRegion> representativeRegions);

    void delete(String keyword);
}
