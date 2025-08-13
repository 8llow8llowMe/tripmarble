package com.followfollowme.tripmarble.domainlayer.region.application.port.in;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto.RepresentativeRegionInfoInternalResponse;

public interface RepresentativeRegionInternalUseCase {

    RepresentativeRegionInfoInternalResponse getRepresentativeRegionInfo(long representativeRegionId);
}
