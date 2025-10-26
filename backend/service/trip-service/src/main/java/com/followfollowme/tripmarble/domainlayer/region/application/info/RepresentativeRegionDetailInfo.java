package com.followfollowme.tripmarble.domainlayer.region.application.info;

import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import lombok.Builder;

@Builder
public record RepresentativeRegionDetailInfo(
    long representativeRegionId,
    String representativeRegionName,
    String representativeRegionImageUrl,
    String description,
    double latitude,
    double longitude,
    String boundaryGeoJson
) {

    public static RepresentativeRegionDetailInfo of(RepresentativeRegion region) {
        return RepresentativeRegionDetailInfo.builder()
            .representativeRegionId(region.id())
            .representativeRegionName(region.name())
            .representativeRegionImageUrl(region.imageUrl())
            .description(region.description())
            .latitude(region.latitude())
            .longitude(region.longitude())
            .boundaryGeoJson(region.boundaryGeoJson())
            .build();
    }
}
