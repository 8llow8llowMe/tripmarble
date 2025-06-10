package com.followfollowme.tripmarble.domainlayer.region.application.service;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.RegionItem;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.SigunguItem;
import com.followfollowme.tripmarble.domainlayer.region.application.port.in.RegionWebUseCase;
import com.followfollowme.tripmarble.domainlayer.region.application.port.out.RegionJdbcPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegionFacade implements RegionWebUseCase {

    private final RegionJdbcPort regionJdbcPort;

    @Override
    public void registerRegions(List<RegionItem> regionItems) {
        regionJdbcPort.batchInsertRegions(regionItems);
    }

    @Override
    public void registerSigungus(List<SigunguItem> sigunguItems) {
        regionJdbcPort.batchInsertSigungus(sigunguItems);
    }
}
