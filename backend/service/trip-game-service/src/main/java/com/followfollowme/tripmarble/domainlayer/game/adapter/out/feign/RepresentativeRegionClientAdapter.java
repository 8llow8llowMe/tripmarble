package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client.RepresentativeRegionClient;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.RepresentativeRegionInfoResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.RepresentativeRegionClientPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RepresentativeRegionFeignAdapter implements RepresentativeRegionClientPort {

    private final RepresentativeRegionClient representativeRegionClient;

    @Override
    public RepresentativeRegionInfoResponse getRepresentativeRegionInfo(long representativeRegionId) {
        return representativeRegionClient.getRepresentativeRegionInfo(representativeRegionId);
    }
}
