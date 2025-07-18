package com.followfollowme.tripmarble.domainlayer.region.application.port.in;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto.RepresentativeRegionInfoResponse;

public interface RepresentativeRegionInternalUseCase {

    RepresentativeRegionInfoResponse getRepresentativeRegionInfo(long representativeRegionId);
}
