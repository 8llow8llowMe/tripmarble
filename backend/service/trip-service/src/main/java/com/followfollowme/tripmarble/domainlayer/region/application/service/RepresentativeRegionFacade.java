package com.followfollowme.tripmarble.domainlayer.region.application.service;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionDetailResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RepresentativeRegionSummaryResponse;
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
    public List<RepresentativeRegionSummaryResponse> getAllRepresentativeRegions() {
        List<RepresentativeRegion> representativeRegions = representativeRegionRepositoryPort.findAll();
        return representativeRegionMapper.toSummaryResponseListFromDomainList(representativeRegions);
    }

    @Override
    @Transactional(readOnly = true)
    public RepresentativeRegionDetailResponse getRepresentativeRegionDetail(long representativeId) {
        RepresentativeRegion representativeRegion = representativeRegionRepositoryPort.findById(representativeId)
            .orElseThrow(() -> new IllegalArgumentException("해당 대표 여행지가 존재하지 않습니다."));
        return representativeRegionMapper.toDetailResponseFromDomain(representativeRegion);
    }
}
