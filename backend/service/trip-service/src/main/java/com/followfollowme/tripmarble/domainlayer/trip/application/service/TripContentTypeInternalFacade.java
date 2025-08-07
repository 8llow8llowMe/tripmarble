package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripContentTypeInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripContentTypeFetchInternalProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripContentTypeInternalFacade implements TripContentTypeInternalUseCase {

    private final TripContentTypeFetchInternalProcessor tripContentTypeFetchInternalProcessor;

    @Override
    @Transactional(readOnly = true)
    public List<TripContentTypeInternalResponse> getTripContentTypes(List<Long> tripContentTypeIds) {
        return tripContentTypeFetchInternalProcessor.fetchTripContentTypes(tripContentTypeIds);
    }
}
