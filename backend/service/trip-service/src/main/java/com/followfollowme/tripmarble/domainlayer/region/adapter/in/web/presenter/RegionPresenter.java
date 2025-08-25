package com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RegionPresenter {

    public RegionResponse toResponse(Region region) {
        return RegionResponse.builder()
            .regionId(String.valueOf(region.id()))
            .regionCode(String.valueOf(region.regionCode()))
            .regionName(region.regionName())
            .build();
    }

    public List<RegionResponse> toResponseList(List<Region> regions) {
        return regions.stream()
            .map(this::toResponse)
            .toList();
    }
}
