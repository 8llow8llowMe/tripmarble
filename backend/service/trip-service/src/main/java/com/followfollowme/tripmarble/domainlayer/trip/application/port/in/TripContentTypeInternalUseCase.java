package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripContentTypeInternalResponse;
import java.util.List;

public interface TripContentTypeInternalUseCase {

    List<TripContentTypeInternalResponse> getTripContentTypes(List<Long> tripContentTypeIds);
}
