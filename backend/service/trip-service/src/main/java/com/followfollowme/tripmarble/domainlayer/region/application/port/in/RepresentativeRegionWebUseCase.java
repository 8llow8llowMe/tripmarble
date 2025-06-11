package com.followfollowme.tripmarble.domainlayer.region.application.port.in;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionResponse;

import java.util.List;

public interface RepresentativeRegionWebUseCase {

    List<RepresentativeRegionResponse> getAllRepresentativeRegions();
}
