package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RepresentativeRegionPresenter {

    public RepresentativeRegionSummaryResponse toSummaryResponse(RepresentativeRegion representativeRegion) {
        return RepresentativeRegionSummaryResponse.builder()
            .representativeRegionId(String.valueOf(representativeRegion.id()))
            .representativeRegionName(representativeRegion.name())
            .build();
    }

    public List<RepresentativeRegionSummaryResponse> toSummaryResponseList(List<RepresentativeRegion> representativeRegions) {
        return representativeRegions.stream()
            .map(this::toSummaryResponse)
            .toList();
    }

    public RepresentativeRegionDetailResponse toDetailResponse(RepresentativeRegion representativeRegion) {
        return RepresentativeRegionDetailResponse.builder()
            .representativeRegionId(String.valueOf(representativeRegion.id()))
            .representativeRegionName(representativeRegion.name())
            .representativeRegionImageUrl(representativeRegion.imageUrl())
            .description(representativeRegion.description())
            .build();
    }
}
