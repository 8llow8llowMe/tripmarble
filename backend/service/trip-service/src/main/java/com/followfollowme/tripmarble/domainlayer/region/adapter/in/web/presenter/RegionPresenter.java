package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class RegionPresenter {

    public RegionResponse toResponse(Region region) {
        return RegionResponse.builder()
            .regionId(region.id())
            .regionCode(region.regionCode())
            .regionName(region.regionName())
            .build();
    }

    public List<RegionResponse> toResponseList(List<Region> regions) {
        return regions.stream()
            .map(this::toResponse)
            .toList();
    }
}
