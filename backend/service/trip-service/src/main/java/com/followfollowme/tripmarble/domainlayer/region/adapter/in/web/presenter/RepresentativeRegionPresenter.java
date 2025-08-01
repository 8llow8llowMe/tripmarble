package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class RepresentativeRegionPresenter {

    public RepresentativeRegionSummaryResponse toSummaryResponse(RepresentativeRegion domain) {
        return RepresentativeRegionSummaryResponse.builder()
            .representativeRegionId(domain.id())
            .representativeRegionName(domain.name())
            .build();
    }

    public List<RepresentativeRegionSummaryResponse> toSummaryResponseList(List<RepresentativeRegion> domains) {
        return domains.stream()
            .map(this::toSummaryResponse)
            .toList();
    }

    public RepresentativeRegionDetailResponse toDetailResponse(RepresentativeRegion domain) {
        return RepresentativeRegionDetailResponse.builder()
            .representativeRegionId(domain.id())
            .representativeRegionName(domain.name())
            .build();
    }
}
