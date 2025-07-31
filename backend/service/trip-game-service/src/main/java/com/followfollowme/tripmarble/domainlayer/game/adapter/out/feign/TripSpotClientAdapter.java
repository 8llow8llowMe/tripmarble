package com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.client.TripSpotClient;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotRandomResponse;
import com.followfollowme.tripmarble.domainlayer.game.application.port.out.TripSpotClientPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripSpotClientAdapter implements TripSpotClientPort {

    private final TripSpotClient tripSpotClient;

    @Override
    public List<TripSpotRandomResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds,
        int limit) {
        return tripSpotClient.getRandomTripSpots(representativeRegionId, contentTypeIds, limit);
    }
}
