package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class RegionPresenter {

    public RegionResponse toResponse(Region domain) {
        return RegionResponse.builder()
            .regionId(domain.id())
            .regionCode(domain.regionCode())
            .regionName(domain.regionName())
            .build();
    }

    public List<RegionResponse> toResponseList(List<Region> regions) {
        return regions.stream()
            .map(this::toResponse)
            .toList();
    }
}
