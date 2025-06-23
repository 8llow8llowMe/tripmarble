package com.followfollowme.tripmarble.domainlayer.region.application.service;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.mapper.RepresentativeRegionMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RepresentativeRegionWebUseCase;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RepresentativeRegionFacade implements RepresentativeRegionWebUseCase {

    private final RepresentativeRegionRepositoryPort representativeRegionRepositoryPort;
    private final RepresentativeRegionMapper representativeRegionMapper;

    @Override
    @Transactional(readOnly = true)
    public List<RepresentativeRegionResponse> getAllRepresentativeRegions() {
        List<RepresentativeRegion> representativeRegions = representativeRegionRepositoryPort.findAll();
        return representativeRegionMapper.toResponseListFromDomainList(representativeRegions);
    }
}
