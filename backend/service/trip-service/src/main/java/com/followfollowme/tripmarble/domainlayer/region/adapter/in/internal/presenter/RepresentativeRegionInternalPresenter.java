package com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto.RepresentativeRegionInfoResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import org.springframework.stereotype.Component;

@Component
public class RepresentativeRegionInternalPresenter {

    public RepresentativeRegionInfoResponse toInfoResponse(RepresentativeRegion representativeRegion) {
        return RepresentativeRegionInfoResponse.builder()
            .representativeRegionId(representativeRegion.id())
            .representativeRegionName(representativeRegion.name())
            .build();
    }
}
