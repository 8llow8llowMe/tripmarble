package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.web.dto.TripContentTypeResponse;
import java.util.List;

public interface TripContentTypeWebUseCase {

    List<TripContentTypeResponse> getAllTripContentTypes();
}
