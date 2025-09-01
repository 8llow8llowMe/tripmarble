package com.followfollowme.tripmarble.domainlayer.region.application.port.in;

import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.RegionItem;
import com.followfollowme.tripmarble.domainlayer.region.adapter.in.batch.dto.SigunguItem;

import java.util.List;

public interface RegionWebUseCase {

    void registerRegions(List<RegionItem> regionItems);

    void registerSigungus(List<SigunguItem> sigunguItems);
}
