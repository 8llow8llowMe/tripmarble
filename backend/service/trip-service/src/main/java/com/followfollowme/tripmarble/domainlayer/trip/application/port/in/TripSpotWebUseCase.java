package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;
import com.followfollowme.tripmarble.persistence.dto.SliceResponse;

public interface TripSpotWebUseCase {

    SliceResponse<TripSpotSimpleResponse> getTripSpotsByRepresentativeRegionId(long representativeRegionId,
        long lastTripSpotId,
        int size);

    TripSpotWithDetailViewResponse getTripSpotWithDetail(long tripSpotId);
}
