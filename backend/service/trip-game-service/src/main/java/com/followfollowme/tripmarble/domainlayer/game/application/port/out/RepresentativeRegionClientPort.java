package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoInternalResponse;
import java.util.List;

public interface RepresentativeRegionClientPort {

    RepresentativeRegionInfoInternalResponse getRepresentativeRegionInfo(long representativeRegionId);

    List<RepresentativeRegionInfoInternalResponse> getRepresentativeRegionsByIds(List<Long> representativeRegionIds);
}
