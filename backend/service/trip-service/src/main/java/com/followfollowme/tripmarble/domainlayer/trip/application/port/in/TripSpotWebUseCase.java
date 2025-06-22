package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotSimpleResponse;
import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripSpotWithDetailViewResponse;

import java.util.List;

public interface TripSpotWebUseCase {

    List<TripSpotSimpleResponse> getTripSpotsByRepresentativeRegionId(long representativeRegionId);

    TripSpotWithDetailViewResponse getTripSpotWithDetail(long tripSpotId);
}
