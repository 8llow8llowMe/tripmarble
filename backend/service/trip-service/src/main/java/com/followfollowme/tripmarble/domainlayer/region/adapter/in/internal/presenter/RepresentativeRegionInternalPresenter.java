package com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto.RepresentativeRegionInfoResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import org.springframework.stereotype.Component;

@Component
public class RepresentativeRegionInternalPresenter {

    public RepresentativeRegionInfoResponse toInfoResponse(RepresentativeRegion domain) {
        return RepresentativeRegionInfoResponse.builder()
            .representativeRegionId(domain.id())
            .representativeRegionName(domain.name())
            .build();
    }
}
