package com.followfollowme.tripmarble.domainlayer.region.application.service;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSummaryResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionErrorCode;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionException;
import com.followfollowme.tripmarble.domainlayer.region.application.mapper.RepresentativeRegionMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RepresentativeRegionWebUseCase;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RepresentativeRegionFacade implements RepresentativeRegionWebUseCase {

    private final RepresentativeRegionRepositoryPort representativeRegionRepositoryPort;
    private final RepresentativeRegionMapper representativeRegionMapper;

    @Override
    @Transactional(readOnly = true)
    public List<RepresentativeRegionSummaryResponse> getAllRepresentativeRegions() {
        List<RepresentativeRegion> representativeRegions = representativeRegionRepositoryPort.findAll();
        return representativeRegionMapper.toSummaryResponseListFromDomainList(representativeRegions);
    }

    @Override
    @Transactional(readOnly = true)
    public RepresentativeRegionDetailResponse getRepresentativeRegionDetail(long representativeId) {
        RepresentativeRegion representativeRegion = representativeRegionRepositoryPort.findById(representativeId)
            .orElseThrow(() -> new RegionException(RegionErrorCode.REPRESENTATIVE_REGION_NOT_FOUND));
        return representativeRegionMapper.toDetailResponseFromDomain(representativeRegion);
    }
}
