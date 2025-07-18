package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoResponse;

public interface RepresentativeRegionClientPort {

    RepresentativeRegionInfoResponse getRepresentativeRegionInfo(long representativeRegionId);
}
