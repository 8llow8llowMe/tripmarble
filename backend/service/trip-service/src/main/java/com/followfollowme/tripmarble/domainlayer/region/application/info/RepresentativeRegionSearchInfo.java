package com.followfollowme.tripmarble.domainlayer.region.application.info;

import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import lombok.Builder;

@Builder
public record RepresentativeRegionSearchInfo(
    long representativeRegionId,
    String representativeRegionName
) {

    public static RepresentativeRegionSearchInfo of(RepresentativeRegion representativeRegion) {
        return RepresentativeRegionSearchInfo.builder()
            .representativeRegionId(representativeRegion.id())
            .representativeRegionName(representativeRegion.name())
            .build();
    }
}
