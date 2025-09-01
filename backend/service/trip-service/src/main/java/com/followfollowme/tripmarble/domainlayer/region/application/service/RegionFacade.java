package com.followfollowme.tripmarble.domainlayer.region.application.service;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.RegionResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.dto.SigunguResponse;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter.RegionPresenter;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.web.presenter.SigunguPresenter;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RegionWebUseCase;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RegionRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.SigunguRepositoryPort;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Region;
import com.followfollowme.tripmarble.domainlayer.region.domain.model.Sigungu;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RegionFacade implements RegionWebUseCase {

    private final RegionRepositoryPort regionRepositoryPort;
    private final SigunguRepositoryPort sigunguRepositoryPort;
    private final RegionPresenter regionPresenter;
    private final SigunguPresenter sigunguPresenter;

    @Override
    @Transactional(readOnly = true)
    public List<RegionResponse> getAllRegions() {
        List<Region> regions = regionRepositoryPort.findAll();
        return regionPresenter.toResponseList(regions);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SigunguResponse> getSigungusByRegionId(long regionId) {
        List<Sigungu> sigungus = sigunguRepositoryPort.findAllByRegionId(regionId);
        return sigunguPresenter.toResponseList(sigungus);
    }
}
