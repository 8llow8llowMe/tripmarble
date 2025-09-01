package com.followfollowme.tripmarble.domainlayer.region.application.port.in;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.SigunguResponse;

import java.util.List;

public interface RegionWebUseCase {

    List<RegionResponse> getAllRegions();

    List<SigunguResponse> getSigungusByRegionId(long regionId);
}
