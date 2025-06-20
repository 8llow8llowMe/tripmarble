package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;

public interface TripSpotWebUseCase {

    TripSpotWithDetailViewResponse getTripSpotWithDetail(long tripSpotId);
}
