package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomResponse;
import java.util.List;

public interface TripSpotInternalUseCase {

    List<TripSpotRandomResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds,
        int limit);
}
