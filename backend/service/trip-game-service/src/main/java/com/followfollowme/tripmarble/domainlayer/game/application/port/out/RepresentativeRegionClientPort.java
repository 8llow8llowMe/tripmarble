package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoInternalResponse;

public interface RepresentativeRegionClientPort {

    RepresentativeRegionInfoInternalResponse getRepresentativeRegionInfo(long representativeRegionId);
}
