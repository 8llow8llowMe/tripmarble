package com.followfollowme.tripmarble.domainlayer.region.application.port.out;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.RegionItem;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.SigunguItem;

import java.util.List;

public interface RegionJdbcPort {

    void batchInsertRegions(List<RegionItem> regionItems);

    void batchInsertSigungus(List<SigunguItem> sigunguItems);
}
