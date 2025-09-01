package com.followfollowme.tripmarble.domainlayer.game.application.port.out;

import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.game.adapter.out.feign.dto.TripSpotRandomInternalResponse;
import java.util.List;

public interface TripSpotClientPort {

    List<TripSpotRandomInternalResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds,
        int limit);

    List<TripSpotQueryInternalResponse> getTripSpotsByIds(List<Long> tripSpotIds);
}
