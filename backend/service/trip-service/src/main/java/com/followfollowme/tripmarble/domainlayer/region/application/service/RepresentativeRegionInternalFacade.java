package com.followfollowme.tripmarble.domainlayer.region.application.service;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.dto.RepresentativeRegionInfoResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.internal.presenter.RepresentativeRegionInternalPresenter;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionErrorCode;
import com.followfollowme.tripmarble.domainlayer.region.application.exception.RegionException;
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
    private final RepresentativeRegionInternalPresenter representativeRegionInternalPresenter;

    @Override
    @Transactional(readOnly = true)
    public RepresentativeRegionInfoResponse getRepresentativeRegionInfo(long representativeRegionId) {
        RepresentativeRegion representativeRegion = representativeRegionRepositoryPort.findById(representativeRegionId)
            .orElseThrow(() -> new RegionException(RegionErrorCode.REPRESENTATIVE_REGION_NOT_FOUND));
        return representativeRegionInternalPresenter.toInfoResponse(representativeRegion);
    }
}
