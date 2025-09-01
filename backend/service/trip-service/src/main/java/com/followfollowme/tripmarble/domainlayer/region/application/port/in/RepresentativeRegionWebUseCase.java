package com.followfollowme.tripmarble.domainlayer.region.application.port.in;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSummaryResponse;
import java.util.List;

public interface RepresentativeRegionWebUseCase {

    List<RepresentativeRegionSummaryResponse> getAllRepresentativeRegions();

    RepresentativeRegionDetailResponse getRepresentativeRegionDetail(long representativeId);
}
