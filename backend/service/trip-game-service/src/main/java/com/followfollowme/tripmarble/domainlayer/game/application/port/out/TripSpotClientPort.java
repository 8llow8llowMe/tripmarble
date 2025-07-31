package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotRandomResponse;
import java.util.List;

public interface TripSpotClientPort {

    List<TripSpotRandomResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds,
        int limit);
}
