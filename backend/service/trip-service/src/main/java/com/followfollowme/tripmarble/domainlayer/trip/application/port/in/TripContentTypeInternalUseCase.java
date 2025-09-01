package com.followfollowme.tripmarble.domainlayer.trip.application.port.in;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripContentTypeQueryInternalResponse;
import java.util.List;

public interface TripContentTypeInternalUseCase {

    List<TripContentTypeQueryInternalResponse> getTripContentTypes(List<Long> tripContentTypeIds);
}
