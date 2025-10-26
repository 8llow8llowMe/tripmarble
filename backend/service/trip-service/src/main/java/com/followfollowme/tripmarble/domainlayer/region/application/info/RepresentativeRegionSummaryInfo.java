package com.followfollowme.tripmarble.domainlayer.region.application.info;

import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import lombok.Builder;

@Builder
public record RepresentativeRegionSummaryInfo(
    long representativeRegionId,
    String representativeRegionName,
    String representativeRegionImageUrl
) {

    public static RepresentativeRegionSummaryInfo of(RepresentativeRegion representativeRegion) {
        return RepresentativeRegionSummaryInfo.builder()
            .representativeRegionId(representativeRegion.id())
            .representativeRegionName(representativeRegion.name())
            .representativeRegionImageUrl(representativeRegion.imageUrl())
            .build();
    }
}
