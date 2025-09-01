package com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto.RepresentativeRegionInfoInternalResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class RepresentativeRegionInternalPresenter {

    public RepresentativeRegionInfoInternalResponse toInfoResponse(RepresentativeRegion representativeRegion) {
        return RepresentativeRegionInfoInternalResponse.builder()
            .representativeRegionId(representativeRegion.id())
            .representativeRegionName(representativeRegion.name())
            .imageUrl(representativeRegion.imageUrl())
            .build();
    }

    public List<RepresentativeRegionInfoInternalResponse> toInfoResponseList(List<RepresentativeRegion> representativeRegions) {
        return representativeRegions.stream()
            .map(this::toInfoResponse)
            .toList();
    }
}
