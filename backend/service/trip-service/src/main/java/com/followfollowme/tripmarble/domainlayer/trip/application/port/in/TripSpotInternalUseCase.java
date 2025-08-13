package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripSpotRandomInternalResponse;
import java.util.List;

public interface TripSpotInternalUseCase {

    List<TripSpotRandomInternalResponse> getRandomTripSpots(long representativeRegionId, List<Integer> contentTypeIds, int limit);

    List<TripSpotQueryInternalResponse> getTripSpotsByIds(List<Long> tripSpotIds);
}
