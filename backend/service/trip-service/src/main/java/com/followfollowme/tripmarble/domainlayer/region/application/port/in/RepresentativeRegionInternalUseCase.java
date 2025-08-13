package com.followfollowme.tripmarble.domainlayer.region.application.port.in;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto.RepresentativeRegionInfoInternalResponse;
import java.util.List;

public interface RepresentativeRegionInternalUseCase {

    RepresentativeRegionInfoInternalResponse getRepresentativeRegionInfo(long representativeRegionId);

    List<RepresentativeRegionInfoInternalResponse> getRepresentativeRegionsByIds(List<Long> representativeRegionIds);
}
