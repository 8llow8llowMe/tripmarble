package com.followfollowme.tripmarble.domainlayer.region.application.service;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto.RepresentativeRegionInfoResponse;
import com.followfollowme.tripmarble.domainlayer.region.application.mapper.RepresentativeRegionMapper;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RepresentativeRegionInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RepresentativeRegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.RepresentativeRegion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RepresentativeRegionInternalFacade implements RepresentativeRegionInternalUseCase {

    private final RepresentativeRegionRepositoryPort representativeRegionRepositoryPort;
    private final RepresentativeRegionMapper representativeRegionMapper;

    @Override
    @Transactional(readOnly = true)
    public RepresentativeRegionInfoResponse getRepresentativeRegionInfo(long representativeRegionId) {
        RepresentativeRegion representativeRegion = representativeRegionRepositoryPort.findById(representativeRegionId)
            .orElseThrow(() -> new IllegalArgumentException("해당 대표 여행지가 존재하지 않습니다."));
        return representativeRegionMapper.toInfoResponseFromDomain(representativeRegion);
    }
}
