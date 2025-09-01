package com.followfollowme.tripmarble.domainlayer.trip.application.service;

import com.followfollowme.tripmarble.domainlayer.trip.adapter.in.internal.dto.TripContentTypeQueryInternalResponse;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.in.TripContentTypeInternalUseCase;
import com.followfollowme.tripmarble.domainlayer.trip.application.service.processor.TripContentTypeQueryInternalProcessor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripContentTypeInternalFacade implements TripContentTypeInternalUseCase {

    private final TripContentTypeQueryInternalProcessor tripContentTypeQueryInternalProcessor;

    @Override
    @Transactional(readOnly = true)
    public List<TripContentTypeQueryInternalResponse> getTripContentTypes(List<Long> tripContentTypeIds) {
        return tripContentTypeQueryInternalProcessor.getTripContentTypes(tripContentTypeIds);
    }
}
