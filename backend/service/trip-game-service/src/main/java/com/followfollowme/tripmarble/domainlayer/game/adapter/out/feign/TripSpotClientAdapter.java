package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client.TripSpotClient;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotRandomInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripSpotClientPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripSpotClientAdapter implements TripSpotClientPort {

    private final TripSpotClient tripSpotClient;

    @Override
    public List<TripSpotRandomInternalResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds, int limit) {
        return tripSpotClient.getRandomTripSpots(representativeRegionId, contentTypeIds, limit);
    }

    @Override
    public List<TripSpotQueryInternalResponse> getTripSpotsByIds(List<Long> tripSpotIds) {
        return tripSpotClient.getTripSpotsByIds(tripSpotIds);
    }
}
