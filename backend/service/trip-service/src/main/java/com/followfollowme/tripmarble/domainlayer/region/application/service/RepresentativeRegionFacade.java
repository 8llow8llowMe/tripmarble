package com.followfollowme.tripmarble.domainlayer.region.application.service;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RepresentativeRegionWebUseCase;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionRepositoryPort;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RepresentativeRegionFacade implements RepresentativeRegionWebUseCase {

    private final RepresentativeRegionRepositoryPort representativeRegionRepositoryPort;

    @Override
    public List<RepresentativeRegionResponse> getAllRepresentativeRegions() {
        return representativeRegionRepositoryPort.findAll().stream()
            .map(representativeRegion -> RepresentativeRegionResponse.builder()
                .id(representativeRegion.regionId())
                .name(representativeRegion.name())
                .imageUrl(representativeRegion.imageUrl())
                .build())
            .toList();
    }
}
